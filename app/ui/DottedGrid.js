"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const spacing = 30;
const pointerRadius = 150;

export default function DottedGrid({ className = "" }) {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let isVisible = true;
    let pointer = { active: false, x: -1000, y: -1000 };
    let palette = { accent: "#df5a2c", dot: "#c7c4ba" };

    const readPalette = () => {
      const styles = window.getComputedStyle(document.documentElement);
      palette = {
        accent:
          styles.getPropertyValue("--color-accent-orange").trim() || "#df5a2c",
        dot:
          styles.getPropertyValue("--color-paper-border-dark").trim() ||
          "#c7c4ba",
      };
    };

    const draw = (time = 0) => {
      animationFrame = 0;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const influence = pointer.active
            ? Math.max(0, 1 - distance / pointerRadius)
            : 0;
          const quietPulse = shouldReduceMotion
            ? 0
            : Math.sin(time / 900 + x * 0.018 + y * 0.014) * 0.12;
          const radius = 1.05 + influence * 2.25 + quietPulse;

          context.beginPath();
          context.arc(x, y, Math.max(0.8, radius), 0, Math.PI * 2);
          context.fillStyle = influence > 0.08 ? palette.accent : palette.dot;
          context.globalAlpha = 0.38 + influence * 0.52;
          context.fill();
        }
      }

      context.globalAlpha = 1;
      if (!shouldReduceMotion && isVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      scheduleDraw();
    };

    const move = (event) => {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      pointer = {
        active: x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height,
        x,
        y,
      };
      if (shouldReduceMotion) scheduleDraw();
    };

    const leave = () => {
      pointer = { active: false, x: -1000, y: -1000 };
      if (shouldReduceMotion) scheduleDraw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) scheduleDraw();
    });
    const themeObserver = new MutationObserver(() => {
      readPalette();
      scheduleDraw();
    });

    readPalette();
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    resize();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
