"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 14;
const GAP = 3;
const STEP = CELL_SIZE + GAP;
const RADIUS = 2;

const Grid = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef(0);
  const heightsRef = useRef(new Float32Array(0));
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      colsRef.current = Math.ceil(w / STEP) + 2;
      rowsRef.current = Math.ceil(h / STEP) + 2;
      heightsRef.current = new Float32Array(colsRef.current * rowsRef.current);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      timeRef.current += 0.012;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = colsRef.current;
      const rows = rowsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const heights = heightsRef.current;

      ctx.clearRect(0, 0, w, h);

      const gridW = cols * STEP;
      const gridH = rows * STEP;
      const ox = (w - gridW) / 2 + GAP;
      const oy = (h - gridH) / 2 + GAP;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cx = ox + c * STEP;
          const cy = oy + r * STEP;

          const dx = cx + CELL_SIZE / 2 - mx;
          const dy = cy + CELL_SIZE / 2 - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const mouseRadius = 120;
          const mouseInfluence = Math.max(0, 1 - dist / mouseRadius);

          const target = mouseInfluence * mouseInfluence;
          heights[idx] += (target - heights[idx]) * 0.15;

          const level = heights[idx];

          let hue, sat, light;
          if (level < 0.05) {
            hue = 213;
            sat = 22;
            light = 10;
          } else if (level < 0.2) {
            hue = 140;
            sat = 45;
            light = 18;
          } else if (level < 0.45) {
            hue = 140;
            sat = 50;
            light = 28;
          } else if (level < 0.7) {
            hue = 138;
            sat = 55;
            light = 38;
          } else {
            hue = 135;
            sat = 60;
            light = 48;
          }

          ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
          if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(cx, cy, CELL_SIZE, CELL_SIZE, RADIUS);
            ctx.fill();
          } else {
            ctx.fillRect(cx, cy, CELL_SIZE, CELL_SIZE);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#0C1117" }}
    />
  );
};

export default Grid;
