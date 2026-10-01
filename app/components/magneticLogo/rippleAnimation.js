export const RIPPLE_DURATION = 820;

export function getRippleFrame(start, now, size) {
  // A frame timestamp can precede a click processed during that same frame.
  const progress = Math.min(1, Math.max(0, (now - start) / RIPPLE_DURATION));
  const radius = size * 0.58 * (1 - (1 - progress) ** 2);
  return { progress, radius };
}
