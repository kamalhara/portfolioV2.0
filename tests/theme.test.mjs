import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { resolveTheme, themeInitScript } from "../app/lib/theme.js";

test("dark is the default and only an explicit light preference overrides it", () => {
  for (const value of [null, undefined, "", "system", "invalid", "dark"]) {
    assert.equal(resolveTheme(value), "dark");
  }
  assert.equal(resolveTheme("light"), "light");
});

test("the first-paint script applies the saved preference and safely defaults to dark", () => {
  for (const saved of [null, "light", "dark", "invalid", "storage-error"]) {
    let applied;
    runInNewContext(themeInitScript, {
      localStorage: {
        getItem() {
          if (saved === "storage-error") throw new Error("Storage blocked");
          return saved;
        },
      },
      document: {
        documentElement: {
          classList: {
            toggle(name, enabled) {
              assert.equal(name, "dark");
              applied = enabled;
            },
          },
        },
      },
    });
    assert.equal(applied, saved !== "light");
  }
});
