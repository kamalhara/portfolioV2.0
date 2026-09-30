export function parseQuestion(raw: string): string {
  if (raw.length > 4_096) throw new Error("Request too large");
  const body = JSON.parse(raw) as { question?: unknown };
  if (typeof body.question !== "string") throw new Error("Invalid question");
  const question = body.question.trim();
  if (!question || question.length > 300) throw new Error("Invalid question");
  return question;
}
