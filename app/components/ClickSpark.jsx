"use client";

import { useCallback, useEffect, useRef } from "react";

export default function ClickSpark({
  sparkColor = "currentColor",
  sparkSize = 8,
  sparkRadius = 18,
  sparkCount = 6,
  duration = 360,
  easing = "ease-out",
  extraScale = 1,
  className = "",
  children,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };
    const observer = new ResizeObserver(handleResize);

    observer.observe(parent);
    resizeCanvas();

    return () => {
      observer.disconnect();
      window.clearTimeout(resizeTimeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const ease = useCallback(
    (progress) => {
      if (easing === "linear") return progress;
      if (easing === "ease-in") return progress * progress;
      if (easing === "ease-in-out") {
        return progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      }
      return progress * (2 - progress);
    },
    [easing],
  );

  const runAnimation = useCallback(() => {
    const drawFrame = (timestamp) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      const resolvedColor =
        sparkColor === "currentColor"
          ? getComputedStyle(canvas).color
          : sparkColor;

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const eased = ease(elapsed / duration);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        context.strokeStyle = resolvedColor;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        return true;
      });

      animationRef.current = sparksRef.current.length
        ? requestAnimationFrame(drawFrame)
        : null;
    };

    animationRef.current = requestAnimationFrame(drawFrame);
  }, [duration, ease, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const now = performance.now();

    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, index) => ({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        angle: (2 * Math.PI * index) / sparkCount,
        startTime: now,
      })),
    );

    if (!animationRef.current) {
      runAnimation();
    }
  };

  return (
    <div
      className={`relative h-full w-full ${className}`}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 block h-full w-full select-none"
      />
      {children}
    </div>
  );
}
