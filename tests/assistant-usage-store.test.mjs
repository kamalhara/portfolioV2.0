import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

// Run the real store against SQLite; only the Cloudflare host constructor is stubbed.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "cloudflare:workers") {
      return {
        url: `data:text/javascript,${encodeURIComponent("export class DurableObject { constructor(ctx, env) { this.ctx = ctx; this.env = env; } }")}`,
        shortCircuit: true,
      };
    }
    if (
      specifier.startsWith("./") &&
      !specifier.endsWith(".ts") &&
      context.parentURL?.includes("/worker/src/")
    ) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});

const { UsageStore } = await import("../worker/src/UsageStore.ts");
const { default: worker } = await import("../worker/src/index.ts");

function createStore(t) {
  const database = new DatabaseSync(":memory:");
  t.after(() => database.close());
  const context = {
    storage: {
      sql: {
        exec(query, ...parameters) {
          // Schema creation is the only multi-statement operation.
          if (query.includes("CREATE TABLE")) {
            database.exec(query);
            return;
          }
          const rows = database.prepare(query).all(...parameters);
          return { one: () => rows[0], toArray: () => rows };
        },
      },
      transactionSync(callback) {
        database.exec("BEGIN");
        try {
          const value = callback();
          database.exec("COMMIT");
          return value;
        } catch (error) {
          database.exec("ROLLBACK");
          throw error;
        }
      },
    },
  };
  return new UsageStore(context, {});
}

test("fresh-start migration clears previous limits once and preserves conversation history", async (t) => {
  const store = createStore(t);
  const now = Date.parse("2026-10-02T12:00:00Z");
  const old = await store.reserve("visitor", now);
  await store.complete(old.ticket, "Old question", "Old answer", true, now);
  store.ctx.storage.sql.exec(
    "UPDATE usage_settings SET value = 'previous-policy' WHERE key = 'reset_version'",
  );
  const migrated = new UsageStore(store.ctx, {});
  assert.equal((await migrated.status("visitor", now)).remaining, 10);
  const fresh = await migrated.reserve("visitor", now);
  assert.equal(fresh.allowed, true);
  assert.deepEqual(fresh.history, [
    { question: "Old question", answer: "Old answer" },
  ]);
  await migrated.complete(
    fresh.ticket,
    "New question",
    "New answer",
    true,
    now,
  );
  const restarted = new UsageStore(store.ctx, {});
  assert.equal((await restarted.status("visitor", now)).remaining, 9);
  assert.equal((await restarted.reserve("visitor", now)).allowed, true);
});

test("ten replies exhaust today's allowance and midnight resets the same visitor", async (t) => {
  const store = createStore(t);
  const start = Date.parse("2026-10-02T23:58:00Z");
  for (let index = 0; index < 10; index++) {
    const now = start + index * 6000;
    const reservation = await store.reserve("visitor", now);
    assert.equal(reservation.allowed, true);
    assert.equal(
      await store.complete(reservation.ticket, "Question", "Answer", true, now),
      9 - index,
    );
  }
  assert.equal(
    (await store.reserve("visitor", start + 60000)).reason,
    "visitor_limit",
  );
  await store.resetHistory("visitor");
  assert.equal((await store.status("visitor", start + 60000)).remaining, 0);
  const midnight = Date.parse("2026-10-03T00:00:00Z");
  assert.deepEqual(await store.status("visitor", midnight), {
    remaining: 10,
    globalAvailable: true,
    resetsAt: Date.parse("2026-10-04T00:00:00Z"),
  });
  assert.equal((await store.reserve("visitor", midnight)).allowed, true);
});

test("verified fallbacks count toward visitor replies and earlier-day reservations do not spend the new allowance", async (t) => {
  const store = createStore(t);
  const now = Date.parse("2026-10-02T23:59:50Z");
  const reservation = await store.reserve("visitor", now);
  assert.equal(
    await store.complete(
      reservation.ticket,
      "Question",
      "Fallback",
      false,
      now,
    ),
    9,
  );
  await store.reserve("visitor", now + 6000);
  assert.equal(
    (await store.status("visitor", Date.parse("2026-10-03T00:00:00Z")))
      .remaining,
    10,
  );
});

test("HTTP chat counts generated, fixed, and fallback answers, without cooldown, and resets daily", async (t) => {
  const store = createStore(t);
  const originalNow = Date.now;
  let now = Date.parse("2026-10-02T12:00:00Z");
  Date.now = () => now;
  t.after(() => {
    Date.now = originalNow;
  });
  const env = {
    USAGE: { getByName: () => store },
    ALLOWED_ORIGINS: "http://localhost:3000",
    PORTFOLIO_CHAT_COOKIE_SECRET:
      "a-public-test-secret-of-at-least-32-characters",
    ASSISTANT_DEV_MODE: "true",
    AI: {
      run: async () => ({
        response: "Kamal's strengths are frontend, backend, and UI/UX design.",
      }),
    },
  };
  const status = await worker.fetch(
    new Request("http://localhost/status"),
    env,
  );
  const cookie = status.headers.get("Set-Cookie").split(";")[0];
  const initial = await status.json();
  assert.equal(initial.remaining, 10);
  assert.equal(initial.developmentMode, undefined);
  for (let index = 0; index < 11; index++) {
    const kind = index % 3;
    env.AI.run = async () => {
      if (kind === 2) throw new Error("Provider timed out");
      return {
        response: "Kamal's strengths are frontend, backend, and UI/UX design.",
      };
    };
    const response = await worker.fetch(
      new Request("http://localhost/chat", {
        method: "POST",
        headers: { Cookie: cookie, "Content-Type": "application/json" },
        body: JSON.stringify({
          question:
            kind === 1
              ? "What salary does he want?"
              : "What are his strongest skills?",
        }),
      }),
      env,
    );
    assert.equal(response.status, index < 10 ? 200 : 429);
    const result = await response.json();
    assert.equal(result.remaining, Math.max(0, 9 - index));
    assert.equal(result.limitReached, index >= 9);
    if (index < 10)
      assert.equal(result.source, kind === 0 ? "cloudflare" : "portfolio");
  }
  assert.equal(
    store.ctx.storage.sql
      .exec("SELECT count(*) AS count FROM responses WHERE ai_generated = 1")
      .one().count,
    4,
  );
  now = Date.parse("2026-10-03T00:00:00Z");
  const reset = await worker.fetch(
    new Request("http://localhost/status", { headers: { Cookie: cookie } }),
    env,
  );
  assert.equal((await reset.json()).remaining, 10);
});

test("HTTP fallback shows a disclaimer for confirmed quota exhaustion only", async (t) => {
  const store = createStore(t);
  const env = {
    USAGE: { getByName: () => store },
    ALLOWED_ORIGINS: "http://localhost:3000",
    PORTFOLIO_CHAT_COOKIE_SECRET:
      "a-public-test-secret-of-at-least-32-characters",
    AI: {
      run: async () => {
        throw Object.assign(new Error("Account limited"), { code: 3036 });
      },
    },
  };
  for (const quota of [true, false]) {
    if (!quota)
      env.AI.run = async () => {
        throw Object.assign(new Error("Temporary capacity"), { status: 429 });
      };
    const response = await worker.fetch(
      new Request("http://localhost/chat", {
        method: "POST",
        body: JSON.stringify({ question: "What are his strongest skills?" }),
      }),
      env,
    );
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.equal(result.source, "portfolio");
    assert.equal(result.remaining, 9);
    if (quota)
      assert.match(result.notice, /free AI allowance.*verified portfolio/);
    else assert.equal(result.notice, undefined);
  }
});
