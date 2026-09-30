import { DurableObject } from "cloudflare:workers";
import {
  checkUsage,
  GLOBAL_DAILY_LIMIT,
  VISITOR_LIMIT,
  VISITOR_WINDOW_MS,
  type UsageDecision,
} from "./usage-policy";
import type { Exchange } from "./providers";

type VisitorRow = { last_at: number; history: string };
type CountRow = { count: number };
type ReservationRow = { visitor_id: string; day: string };

function utcDay(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

function parseHistory(value: string | undefined): Exchange[] {
  try {
    const parsed = JSON.parse(value ?? "[]");
    return Array.isArray(parsed) ? parsed.slice(-2) : [];
  } catch {
    return [];
  }
}

export class UsageStore extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS visitors (
        id TEXT PRIMARY KEY,
        last_at INTEGER NOT NULL DEFAULT 0,
        history TEXT NOT NULL DEFAULT '[]'
      );
      CREATE TABLE IF NOT EXISTS responses (
        ticket TEXT PRIMARY KEY,
        visitor_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        day TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reservations (
        ticket TEXT PRIMARY KEY,
        visitor_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        day TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS embeddings (
        version TEXT PRIMARY KEY,
        vectors TEXT NOT NULL
      );
    `);
  }

  private count(query: string, ...params: Array<string | number>): number {
    return (this.ctx.storage.sql.exec(query, ...params).one() as CountRow)
      .count;
  }

  private counts(visitorId: string, now: number) {
    const day = utcDay(now);
    const cutoff = now - VISITOR_WINDOW_MS;
    const sql = this.ctx.storage.sql;
    const visitorCount =
      this.count(
        "SELECT COUNT(*) AS count FROM responses WHERE visitor_id = ? AND created_at > ?",
        visitorId,
        cutoff,
      ) +
      this.count(
        "SELECT COUNT(*) AS count FROM reservations WHERE visitor_id = ? AND created_at > ?",
        visitorId,
        cutoff,
      );
    const globalCount =
      this.count("SELECT COUNT(*) AS count FROM responses WHERE day = ?", day) +
      this.count(
        "SELECT COUNT(*) AS count FROM reservations WHERE day = ?",
        day,
      );
    const visitor = sql
      .exec("SELECT last_at, history FROM visitors WHERE id = ?", visitorId)
      .toArray()[0] as VisitorRow | undefined;
    return { visitorCount, globalCount, visitor, day };
  }

  async status(
    visitorId: string,
    now: number,
    unlimited = false,
  ): Promise<{
    remaining: number | null;
    globalAvailable: boolean;
  }> {
    if (unlimited) return { remaining: null, globalAvailable: true };
    this.ctx.storage.sql.exec(
      "DELETE FROM reservations WHERE expires_at <= ?",
      now,
    );
    const { visitorCount, globalCount } = this.counts(visitorId, now);
    return {
      remaining: Math.max(0, VISITOR_LIMIT - visitorCount),
      globalAvailable: globalCount < GLOBAL_DAILY_LIMIT,
    };
  }

  async reserve(
    visitorId: string,
    now: number,
    unlimited = false,
  ): Promise<UsageDecision & { ticket?: string; history?: Exchange[] }> {
    return this.ctx.storage.transactionSync(() => {
      const sql = this.ctx.storage.sql;
      sql.exec("DELETE FROM reservations WHERE expires_at <= ?", now);
      sql.exec(
        "DELETE FROM responses WHERE created_at <= ?",
        now - VISITOR_WINDOW_MS,
      );
      const { visitorCount, globalCount, visitor, day } = this.counts(
        visitorId,
        now,
      );
      const decision = checkUsage({
        visitorCount,
        globalCount,
        lastQuestionAt: visitor?.last_at ?? 0,
        now,
        unlimited,
      });
      if (!decision.allowed) return decision;

      const ticket = crypto.randomUUID();
      sql.exec(
        "INSERT INTO reservations (ticket, visitor_id, created_at, expires_at, day) VALUES (?, ?, ?, ?, ?)",
        ticket,
        visitorId,
        now,
        now + 120_000,
        day,
      );
      sql.exec(
        "INSERT INTO visitors (id, last_at) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET last_at = excluded.last_at",
        visitorId,
        now,
      );
      return { ...decision, ticket, history: parseHistory(visitor?.history) };
    });
  }

  async complete(
    ticket: string,
    question: string,
    answer: string,
    aiGenerated: boolean,
    now: number,
    unlimited = false,
  ): Promise<number | null> {
    return this.ctx.storage.transactionSync(() => {
      const sql = this.ctx.storage.sql;
      const reservation = sql
        .exec(
          "SELECT visitor_id, day FROM reservations WHERE ticket = ?",
          ticket,
        )
        .toArray()[0] as ReservationRow | undefined;
      if (!reservation) return unlimited ? null : 0;
      sql.exec("DELETE FROM reservations WHERE ticket = ?", ticket);
      if (aiGenerated) {
        sql.exec(
          "INSERT INTO responses (ticket, visitor_id, created_at, day) VALUES (?, ?, ?, ?)",
          ticket,
          reservation.visitor_id,
          now,
          utcDay(now),
        );
      }
      const visitor = sql
        .exec(
          "SELECT history FROM visitors WHERE id = ?",
          reservation.visitor_id,
        )
        .toArray()[0] as { history: string } | undefined;
      const history = [
        ...parseHistory(visitor?.history),
        { question, answer: answer.slice(0, 900) },
      ].slice(-2);
      sql.exec(
        "UPDATE visitors SET history = ? WHERE id = ?",
        JSON.stringify(history),
        reservation.visitor_id,
      );
      if (unlimited) return null;
      return Math.max(
        0,
        VISITOR_LIMIT - this.counts(reservation.visitor_id, now).visitorCount,
      );
    });
  }

  async resetHistory(visitorId: string): Promise<void> {
    this.ctx.storage.sql.exec(
      "UPDATE visitors SET history = '[]' WHERE id = ?",
      visitorId,
    );
  }

  async getIndex(version: string): Promise<number[][] | null> {
    const row = this.ctx.storage.sql
      .exec("SELECT vectors FROM embeddings WHERE version = ?", version)
      .toArray()[0] as { vectors: string } | undefined;
    return row ? (JSON.parse(row.vectors) as number[][]) : null;
  }

  async putIndex(version: string, vectors: number[][]): Promise<void> {
    this.ctx.storage.transactionSync(() => {
      this.ctx.storage.sql.exec("DELETE FROM embeddings");
      this.ctx.storage.sql.exec(
        "INSERT INTO embeddings (version, vectors) VALUES (?, ?)",
        version,
        JSON.stringify(vectors),
      );
    });
  }
}
