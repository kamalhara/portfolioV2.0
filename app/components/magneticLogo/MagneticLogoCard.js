"use client";

import { useEffect, useRef } from "react";
import {
  logoViewBox,
  magneticLogoDots,
} from "@/app/components/magneticLogo/magneticLogo";

import {
  RIPPLE_DURATION,
  getRippleFrame,
} from "@/app/components/magneticLogo/rippleAnimation";

export default function MagneticLogoCard() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ inside: false, field: false, x: 0, y: 0 });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dots = [];
    let size = 0;
    let frame;
    let previousTime = performance.now();

    function resize() {
      const nextSize = canvas.getBoundingClientRect().width;
      if (!nextSize) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nextSize * pixelRatio);
      canvas.height = Math.round(nextSize * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      size = nextSize;

      const scale = size / logoViewBox;
      dots = magneticLogoDots.map(({ x, y }) => ({
        homeX: x * scale,
        homeY: y * scale,
        x: x * scale,
        y: y * scale,
        vx: 0,
        vy: 0,
      }));
    }

    function render(now) {
      const step = Math.min(Math.max(0, (now - previousTime) / 16.67), 2);
      previousTime = now;
      context.clearRect(0, 0, size, size);

      const pointer = pointerRef.current;
      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => now - ripple.start < RIPPLE_DURATION,
      );
      const ripples = ripplesRef.current.map((ripple) => ({
        ...ripple,
        ...getRippleFrame(ripple.start, now, size),
      }));
      const fieldRadius = size * 0.175;
      const dotRadius = Math.max(0.9, (size / logoViewBox) * 8.7);

      if (!reducedMotion.matches) {
        for (const ripple of ripples) {
          const { progress, radius } = ripple;
          const opacity = (1 - progress) ** 2 * 0.17;
          context.strokeStyle = `rgba(255, 77, 13, ${opacity})`;
          context.lineWidth = 1;
          context.beginPath();
          context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
          context.stroke();
          if (radius > 7) {
            context.strokeStyle = `rgba(255, 77, 13, ${opacity * 0.3})`;
            context.beginPath();
            context.arc(ripple.x, ripple.y, radius - 7, 0, Math.PI * 2);
            context.stroke();
          }
        }
      }

      context.fillStyle = "#ff4d0d";
      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];
        let targetX = dot.homeX;
        let targetY = dot.homeY;

        if (!reducedMotion.matches && pointer.field) {
          const dx = dot.homeX - pointer.x;
          const dy = dot.homeY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < fieldRadius) {
            const angle = distance > 0.1 ? Math.atan2(dy, dx) : index * 2.39996;
            const ring = Math.max(0, 1 - distance / fieldRadius);
            const displacement = ring * ring * (fieldRadius + 6);
            targetX += Math.cos(angle) * displacement;
            targetY += Math.sin(angle) * displacement;
          }
        }

        if (!reducedMotion.matches) {
          for (const ripple of ripples) {
            const { progress, radius } = ripple;
            const dx = dot.homeX - ripple.x;
            const dy = dot.homeY - ripple.y;
            const distance = Math.hypot(dx, dy);
            const band = Math.max(
              0,
              1 - Math.abs(distance - radius) / (size * 0.065),
            );
            const lift = band * band * size * 0.075 * (1 - progress);
            if (lift > 0) {
              const angle =
                distance > 0.1 ? Math.atan2(dy, dx) : index * 2.39996;
              targetX += Math.cos(angle) * lift;
              targetY += Math.sin(angle) * lift;
            }
          }
          dot.vx =
            (dot.vx + (targetX - dot.x) * 0.22 * step) * Math.pow(0.74, step);
          dot.vy =
            (dot.vy + (targetY - dot.y) * 0.22 * step) * Math.pow(0.74, step);
          dot.x += dot.vx * step;
          dot.y += dot.vy * step;
        } else {
          dot.x = dot.homeX;
          dot.y = dot.homeY;
        }

        context.beginPath();
        context.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        context.fill();
      }

      if (pointer.inside) {
        const arm = Math.max(5, size * 0.033);
        context.strokeStyle = "#ffe4d8";
        context.lineWidth = 1.4;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(pointer.x - arm, pointer.y);
        context.lineTo(pointer.x + arm, pointer.y);
        context.moveTo(pointer.x, pointer.y - arm);
        context.lineTo(pointer.x, pointer.y + arm);
        context.stroke();
      }

      frame = window.requestAnimationFrame(render);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = window.requestAnimationFrame(render);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function updatePointer(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const pointer = pointerRef.current;
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.inside = true;
    pointer.field = true;
  }

  function startRipple(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.detail === 0 ? rect.width / 2 : event.clientX - rect.left;
    const y = event.detail === 0 ? rect.height / 2 : event.clientY - rect.top;
    pointerRef.current.field = false;
    ripplesRef.current.push({ x, y, start: performance.now() });
  }

  return (
    <button
      type="button"
      aria-label="Interactive dotted logo. Move the pointer to repel the dots, or click to send out a ripple."
      className="relative aspect-square min-w-0 cursor-none touch-manipulation overflow-hidden rounded-[15px] border border-border dark:bg-[#171717] bg-[#F9F8F8]"
      onPointerEnter={updatePointer}
      onPointerMove={updatePointer}
      onPointerLeave={() => {
        pointerRef.current.inside = false;
        pointerRef.current.field = false;
      }}
      onClick={startRipple}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
    </button>
  );
}
