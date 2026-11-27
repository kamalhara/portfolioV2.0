"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a[href], button:not(:disabled), [role="button"], [role="tab"], summary, label[for]';
const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getCompanionLabel(target) {
  if (!(target instanceof Element)) {
    return { suppressed: false, label: "" };
  }

  if (
    target.closest(TEXT_INPUT_SELECTOR) ||
    target.closest('button:disabled, [aria-disabled="true"]')
  ) {
    return { suppressed: true, label: "" };
  }

  const canvasWidget = target.closest("button.cursor-none");
  if (canvasWidget?.querySelector("canvas")) {
    return { suppressed: true, label: "" };
  }

  const customLabelEl = target.closest("[data-cursor]");
  const interactiveEl = target.closest(INTERACTIVE_SELECTOR);
  if (!interactiveEl && !customLabelEl) {
    return { suppressed: false, label: "" };
  }

  let label = customLabelEl?.getAttribute("data-cursor") ?? "";
  if (!label && interactiveEl) {
    const aria = (interactiveEl.getAttribute("aria-label") ?? "").toLowerCase();
    const href = interactiveEl.getAttribute("href") ?? "";
    const text = (interactiveEl.textContent ?? "").trim().toLowerCase();

    if (interactiveEl.matches("summary")) {
      label = interactiveEl.closest("details")?.open ? "Collapse" : "Expand";
    } else if (interactiveEl.getAttribute("role") === "tab") {
      label = "Inspect";
    } else if (aria.includes("signature")) {
      label = "Replay";
    } else if (text.includes("@") && text.includes(".")) {
      label = "Copy";
    } else if (aria.includes("assistant") || text.includes("ask ai")) {
      label = "Ask AI";
    } else if (href.startsWith("/project/")) {
      label = "View";
    } else if (interactiveEl.closest('[aria-label*="music"], .media-zoom')) {
      label = "Listen";
    } else if (interactiveEl.getAttribute("target") === "_blank") {
      label = "Open";
    }
  }

  return { suppressed: false, label };
}

export default function CursorCompanion() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({
    visible: false,
    suppressed: false,
    pressed: false,
    label: "",
    lastLabel: "",
  });

  const tagWrapRef = useRef(null);
  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    tagX: -100,
    tagY: -100,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    const rafId = window.requestAnimationFrame(sync);
    pointerQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(rafId);
      pointerQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    let frameId = 0;
    let lastTime = performance.now();

    const syncTarget = (target) => {
      const next = getCompanionLabel(target);
      setState((prev) => {
        const nextLastLabel = next.label || prev.lastLabel;
        if (
          prev.visible === true &&
          prev.suppressed === next.suppressed &&
          prev.label === next.label &&
          prev.lastLabel === nextLastLabel
        ) {
          return prev;
        }
        return {
          ...prev,
          visible: true,
          suppressed: next.suppressed,
          label: next.label,
          lastLabel: nextLastLabel,
        };
      });
    };

    const onPointerMove = (event) => {
      const p = posRef.current;
      p.mouseX = event.clientX;
      p.mouseY = event.clientY;
      if (p.tagX < -50) {
        p.tagX = event.clientX;
        p.tagY = event.clientY;
      }
      syncTarget(event.target);
    };

    const onPointerDown = () => {
      setState((prev) => ({ ...prev, pressed: true }));
    };

    const onPointerUp = () => {
      setState((prev) => ({ ...prev, pressed: false }));
    };

    const onDocumentLeave = () => {
      setState((prev) => ({ ...prev, visible: false, pressed: false }));
    };

    const onScroll = () => {
      const p = posRef.current;
      if (p.mouseX >= 0 && p.mouseY >= 0) {
        const el = document.elementFromPoint(p.mouseX, p.mouseY);
        if (el) syncTarget(el);
      }
    };

    const tick = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const p = posRef.current;

      const tagEase = 1 - Math.exp(-22 * dt);
      p.tagX = lerp(p.tagX, p.mouseX, tagEase);
      p.tagY = lerp(p.tagY, p.mouseY, tagEase);

      if (tagWrapRef.current) {
        tagWrapRef.current.style.transform = `translate3d(${p.tagX}px, ${p.tagY}px, 0)`;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onDocumentLeave);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onDocumentLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const showTag = state.visible && !state.suppressed && Boolean(state.label);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[10000] transition-opacity duration-150 ${
        showTag ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Offset micro context pill beside the untouched native OS cursor */}
      <div
        ref={tagWrapRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        {(state.label || state.lastLabel) && (
          <span
            className={`inline-flex translate-x-3.5 translate-y-4 items-center rounded-full border border-border-strong bg-foreground px-2 py-0.5 text-[10px] leading-none font-medium tracking-wide whitespace-nowrap text-background shadow-xs transition-transform duration-150 ease-out [font-family:var(--font-geist-mono)] ${
              showTag ? (state.pressed ? "scale-95" : "scale-100") : "scale-90"
            }`}
          >
            {state.label || state.lastLabel}
          </span>
        )}
      </div>
    </div>
  );
}
