export const VISITOR_LIMIT = 10;
export const GLOBAL_DAILY_LIMIT = 200;
export const COOLDOWN_MS = 5_000;
export const USAGE_DAY_MS = 24 * 60 * 60 * 1_000;
// Change only for an explicitly requested fresh start, never on routine deploys.
export const USAGE_RESET_VERSION = "2026-10-02-daily-10";

export function nextDailyReset(now: number): number {
  return (Math.floor(now / USAGE_DAY_MS) + 1) * USAGE_DAY_MS;
}

export type LimitReason = "visitor_limit" | "global_limit" | "cooldown";
export type UsageDecision = {
  allowed: boolean;
  reason?: LimitReason;
  remaining: number;
  retryAfterSeconds?: number;
};

export function checkUsage(input: {
  visitorCount: number;
  globalCount: number;
  lastQuestionAt: number;
  now: number;
}): UsageDecision {
  const remaining = Math.max(0, VISITOR_LIMIT - input.visitorCount);
  if (remaining === 0) {
    return { allowed: false, reason: "visitor_limit", remaining: 0 };
  }
  if (input.globalCount >= GLOBAL_DAILY_LIMIT) {
    return { allowed: false, reason: "global_limit", remaining };
  }
  const wait = COOLDOWN_MS - (input.now - input.lastQuestionAt);
  if (wait > 0) {
    return {
      allowed: false,
      reason: "cooldown",
      remaining,
      retryAfterSeconds: Math.ceil(wait / 1_000),
    };
  }
  return { allowed: true, remaining };
}
