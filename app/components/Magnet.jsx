"use client";

import { useEffect, useRef, useState } from "react";

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  style,
  ...props
}) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (disabled || reduceMotion || !finePointer) {
      return;
    }

    const handlePointerMove = (event) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } =
        magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - event.clientX);
      const distY = Math.abs(centerY - event.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        setPosition({
          x: (event.clientX - centerX) / magnetStrength,
          y: (event.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [disabled, magnetStrength, padding]);

  const resolvedPosition = disabled ? { x: 0, y: 0 } : position;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block", ...style }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${resolvedPosition.x}px, ${resolvedPosition.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
