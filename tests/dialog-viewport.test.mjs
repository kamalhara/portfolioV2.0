import assert from "node:assert/strict";
import test from "node:test";
import {
  lockDialogScroll,
  observeDialogViewport,
} from "../app/lib/dialogViewport.js";

function browserFixture(t, withVisualViewport = true) {
  const frames = new Map();
  const properties = new Map();
  const viewport = Object.assign(new EventTarget(), {
    height: 844,
    width: 390,
    offsetTop: 0,
    offsetLeft: 0,
  });
  const scrollCalls = [];
  let nextFrame = 0;
  const browser = Object.assign(new EventTarget(), {
    innerHeight: 844,
    innerWidth: 390,
    scrollY: 1280,
    scrollX: 0,
    visualViewport: withVisualViewport ? viewport : undefined,
    requestAnimationFrame(callback) {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
    scrollTo(options) {
      scrollCalls.push(options);
    },
  });
  const bodyStyle = {
    position: "",
    top: "",
    left: "",
    width: "",
    overflow: "auto",
  };
  const rootStyle = { overflow: "", overscrollBehavior: "contain" };
  globalThis.window = browser;
  globalThis.document = {
    body: { style: bodyStyle },
    documentElement: { style: rootStyle },
  };
  t.after(() => {
    delete globalThis.window;
    delete globalThis.document;
  });

  return {
    browser,
    viewport,
    properties,
    bodyStyle,
    rootStyle,
    scrollCalls,
    overlay: {
      style: {
        setProperty: (name, value) => properties.set(name, value),
        removeProperty: (name) => properties.delete(name),
      },
    },
    flushFrames() {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback());
    },
  };
}

test("dialog follows keyboard opening, viewport panning, and closing", (t) => {
  const fixture = browserFixture(t);
  const stop = observeDialogViewport(fixture.overlay);
  assert.equal(fixture.properties.get("--dialog-viewport-height"), "844px");

  fixture.viewport.height = 350;
  fixture.viewport.offsetTop = 120;
  fixture.viewport.dispatchEvent(new Event("resize"));
  fixture.viewport.dispatchEvent(new Event("scroll"));
  fixture.flushFrames();
  assert.equal(fixture.properties.get("--dialog-viewport-height"), "350px");
  assert.equal(fixture.properties.get("--dialog-viewport-top"), "120px");

  fixture.viewport.height = 844;
  fixture.viewport.offsetTop = 0;
  fixture.viewport.dispatchEvent(new Event("resize"));
  fixture.flushFrames();
  assert.equal(fixture.properties.get("--dialog-viewport-height"), "844px");
  assert.equal(fixture.properties.get("--dialog-viewport-top"), "0px");

  fixture.viewport.dispatchEvent(new Event("resize"));
  stop();
  fixture.flushFrames();
  fixture.viewport.dispatchEvent(new Event("scroll"));
  fixture.flushFrames();
  assert.equal(fixture.properties.size, 0);
});

test("dialog sizing works without the VisualViewport API", (t) => {
  const fixture = browserFixture(t, false);
  const stop = observeDialogViewport(fixture.overlay);
  fixture.browser.innerHeight = 300;
  fixture.browser.dispatchEvent(new Event("resize"));
  fixture.flushFrames();
  assert.equal(fixture.properties.get("--dialog-viewport-height"), "300px");
  assert.equal(fixture.properties.get("--dialog-viewport-top"), "0px");
  stop();
});

test("closing the dialog restores page styles and the original scroll position", (t) => {
  const fixture = browserFixture(t);
  const originalBody = { ...fixture.bodyStyle };
  const originalRoot = { ...fixture.rootStyle };
  const unlock = lockDialogScroll();
  assert.equal(fixture.bodyStyle.position, "fixed");
  assert.equal(fixture.bodyStyle.top, "-1280px");
  assert.equal(fixture.rootStyle.overflow, "hidden");

  // The browser may move its viewport while focusing the composer.
  fixture.browser.scrollY = 1500;
  unlock();
  assert.deepEqual(fixture.bodyStyle, originalBody);
  assert.deepEqual(fixture.rootStyle, originalRoot);
  assert.deepEqual(fixture.scrollCalls, [
    { top: 1280, left: 0, behavior: "instant" },
  ]);
});
