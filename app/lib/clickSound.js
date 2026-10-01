// Soft, muffled single-click inspired by the Apple Magic Mouse.
export function createClickSamples(sampleRate) {
  const duration = 0.02;
  const samples = new Float32Array(Math.ceil(sampleRate * duration));
  let lowPass = 0;
  let body = 0;
  const trebleFilter = 1 - Math.exp((-2 * Math.PI * 900) / sampleRate);
  const bodyFilter = 1 - Math.exp((-2 * Math.PI * 700) / sampleRate);
  const pulse = (elapsed) =>
    elapsed <= 0 ? 0 : Math.min(1, elapsed / 0.0003) * Math.exp(-elapsed * 600);
  for (let index = 0; index < samples.length; index++) {
    const time = index / sampleRate;
    const progress = index / (samples.length - 1);
    const envelope = pulse(time) * (1 - progress * progress);
    lowPass += trebleFilter * (Math.random() * 2 - 1 - lowPass);
    body += bodyFilter * (lowPass - body);
    samples[index] = Math.max(-1, Math.min(1, lowPass - body)) * 0.5 * envelope;
  }
  return samples;
}
