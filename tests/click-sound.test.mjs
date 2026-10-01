import assert from "node:assert/strict";
import test from "node:test";
import { createClickSamples } from "../app/lib/clickSound.js";

test("click audio stays brief, quiet, and fades to silence across common sample rates", () => {
  for (const rate of [22050, 44100, 48000, 96000]) {
    const samples = createClickSamples(rate);
    assert.ok(samples.length / rate <= 0.036);
    assert.equal(Math.abs(samples[0]), 0);
    assert.ok(Math.abs(samples.at(-1)) === 0);
    let energy = 0;
    for (const sample of samples) {
      assert.ok(Number.isFinite(sample));
      assert.ok(Math.abs(sample) <= 0.034);
      energy += sample * sample;
    }
    assert.ok(energy > 0);
    assert.ok(Math.sqrt(energy / samples.length) < 0.015);
  }
});
