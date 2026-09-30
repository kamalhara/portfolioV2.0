export const VISITOR_LIMIT = 6;
export const GLOBAL_DAILY_LIMIT = 200;
export const COOLDOWN_MS = 5_000;
export const VISITOR_WINDOW_MS = 24 * 60 * 60 * 1_000;

export type LimitReason = "visitor_limit" | "global_limit" | "cooldown";
export type UsageDecision = {
  allowed: boolean;
  reason?: LimitReason;
  remaining: number | null;
  retryAfterSeconds?: number;
};

export function checkUsage(input: {
  visitorCount: number;
  globalCount: number;
  lastQuestionAt: number;
  now: number;
  unlimited?: boolean;
}): UsageDecision {
  if (input.unlimited) return { allowed: true, remaining: null };
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
