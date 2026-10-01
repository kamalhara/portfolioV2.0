import assert from "node:assert/strict";
import test from "node:test";
import {
  getRippleFrame,
  RIPPLE_DURATION,
} from "../app/components/magneticLogo/rippleAnimation.js";

test("a click newer than the animation frame cannot produce a negative canvas radius", () => {
  assert.deepEqual(getRippleFrame(1016.67, 1000, 188), {
    progress: 0,
    radius: 0,
  });
});

test("ripple frames stay bounded before, during, and after their lifetime", () => {
  for (const size of [0, 96, 188, 500]) {
    let previousRadius = 0;
    for (const elapsed of [-20, 0, 1, 410, 820, 900]) {
      const { progress, radius } = getRippleFrame(1000, 1000 + elapsed, size);
      assert.ok(progress >= 0 && progress <= 1);
      assert.ok(Number.isFinite(radius));
      assert.ok(radius >= previousRadius && radius <= size * 0.58);
      previousRadius = radius;
    }
    assert.equal(
      getRippleFrame(1000, 1000 + RIPPLE_DURATION, size).radius,
      size * 0.58,
    );
  }
});
