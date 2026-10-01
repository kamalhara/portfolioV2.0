// Mobile keyboards resize and pan the visual viewport independently of CSS dvh.
export function observeDialogViewport(overlay) {
  const viewport = window.visualViewport;
  let frame = null;
  const update = () => {
    overlay.style.setProperty(
      "--dialog-viewport-height",
      `${viewport?.height ?? window.innerHeight}px`,
    );
    overlay.style.setProperty(
      "--dialog-viewport-width",
      `${viewport?.width ?? window.innerWidth}px`,
    );
    overlay.style.setProperty(
      "--dialog-viewport-top",
      `${viewport?.offsetTop ?? 0}px`,
    );
    overlay.style.setProperty(
      "--dialog-viewport-left",
      `${viewport?.offsetLeft ?? 0}px`,
    );
    frame = null;
  };
  const scheduleUpdate = () => {
    if (frame === null) frame = window.requestAnimationFrame(update);
  };

  update();
  viewport?.addEventListener("resize", scheduleUpdate);
  viewport?.addEventListener("scroll", scheduleUpdate);
  window.addEventListener("resize", scheduleUpdate);

  return () => {
    if (frame !== null) window.cancelAnimationFrame(frame);
    viewport?.removeEventListener("resize", scheduleUpdate);
    viewport?.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    for (const name of ["height", "width", "top", "left"]) {
      overlay.style.removeProperty(`--dialog-viewport-${name}`);
    }
  };
}

export function lockDialogScroll() {
  const { body, documentElement } = document;
  const top = window.scrollY;
  const left = window.scrollX;
  const previousBody = {};
  const previousRoot = {
    overflow: documentElement.style.overflow,
    overscrollBehavior: documentElement.style.overscrollBehavior,
  };

  for (const key of ["position", "top", "left", "width", "overflow"]) {
    previousBody[key] = body.style[key];
  }
  Object.assign(body.style, {
    position: "fixed",
    top: `${-top}px`,
    left: `${-left}px`,
    width: "100%",
    overflow: "hidden",
  });
  documentElement.style.overflow = "hidden";
  documentElement.style.overscrollBehavior = "none";

  return () => {
    Object.assign(body.style, previousBody);
    Object.assign(documentElement.style, previousRoot);
    window.scrollTo({ top, left, behavior: "instant" });
  };
}
