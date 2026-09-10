"use client";

import { useEffect, useRef } from "react";

const STEP = 28;

export default function GridBackground() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let pointer = { x: -1000, y: -1000 };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      for (let x = 0; x <= width; x += STEP) {
        for (let y = 0; y <= height; y += STEP) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const active = distance < 110;
          context.fillStyle = active ? "#2447d7" : "#c8c5bc";
          context.globalAlpha = active ? 0.65 : 0.42;
          context.fillRect(x, y, active ? 4 : 2, active ? 4 : 2);
        }
      }

      context.globalAlpha = 1;
      frameRef.current = 0;
    };

    const scheduleDraw = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      scheduleDraw();
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      scheduleDraw();
    };

    const leave = () => {
      pointer = { x: -1000, y: -1000 };
      scheduleDraw();
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
