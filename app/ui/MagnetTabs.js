"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

function MagnetTab({ active, children, onSelect, slug }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 380, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 380, damping: 24, mass: 0.35 });

  const moveTab = (event) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.14);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const resetTab = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      onPointerMove={moveTab}
      onPointerLeave={resetTab}
      onBlur={resetTab}
      style={{ x: springX, y: springY }}
      className={`relative min-h-10 shrink-0 snap-start overflow-hidden border px-3 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:z-20 ${
        active
          ? "border-ink-text text-bg-cream"
          : "border-paper-border text-ink-muted hover:border-paper-border-dark hover:text-ink-text"
      }`}
    >
      {active && (
        <motion.span
          layoutId={`magnet-tab-${slug}`}
          aria-hidden="true"
          className="absolute inset-0 bg-ink-text"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export default function MagnetTabs({ activeTab, onSelect, options, slug }) {
  return (
    <div
      className="flex snap-x gap-2 overflow-x-auto py-1 md:flex-wrap md:justify-end md:overflow-visible"
      aria-label="Filter projects"
    >
      {options.map((option) => (
        <MagnetTab
          key={option}
          active={activeTab === option}
          onSelect={() => onSelect(option)}
          slug={slug}
        >
          {option}
        </MagnetTab>
      ))}
    </div>
  );
}
