const MAX_WORDS = 80;

export function compactAnswer(value: string): string {
  const clean = value.replace(/\s+/g, " ").trim();
  const words = clean.split(" ");
  if (words.length <= MAX_WORDS) return clean;

  const clipped = words.slice(0, MAX_WORDS).join(" ");
  const sentenceEnd = Math.max(
    clipped.lastIndexOf("."),
    clipped.lastIndexOf("!"),
    clipped.lastIndexOf("?"),
  );
  return sentenceEnd >= 80 ? clipped.slice(0, sentenceEnd + 1) : `${clipped}…`;
}
