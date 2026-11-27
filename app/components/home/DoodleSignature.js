"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const STROKES = [
  {
    id: "k-stem",
    d: "M 19 13 C 16 24 14 35 12 46",
    delay: 0.05,
    duration: 0.28,
    width: 2.3,
    brand: false,
  },
  {
    id: "k-arms",
    d: "M 35 12 C 28 21 20 27 14 30 C 21 31 27 38 33 44",
    delay: 0.28,
    duration: 0.36,
    width: 2.1,
    brand: false,
  },
  {
    id: "amal-cursive",
    d: "M 33 44 C 36 42 40 33 45 33 C 49 33 49 42 43 44 C 38 45 36 40 41 35 C 45 32 48 37 49 43 C 51 38 54 32 57 32 C 60 32 59 42 59 43 C 61 36 65 31 68 31 C 71 31 70 42 70 43 C 72 36 76 31 79 31 C 82 31 82 40 84 43 C 87 43 91 32 96 32 C 100 32 99 42 93 43 C 89 44 87 38 92 34 C 96 31 99 36 100 42 C 104 39 112 20 115 12 C 117 8 112 10 110 19 C 108 29 109 41 114 43 C 120 44 128 38 136 36",
    delay: 0.56,
    duration: 0.95,
    width: 2.0,
    brand: false,
  },
  {
    id: "underline-swash",
    d: "M 14 54 C 48 49 96 47 140 50 C 124 52 102 54 88 57",
    delay: 1.4,
    duration: 0.45,
    width: 1.9,
    brand: true,
  },
];

export default function DoodleSignature() {
  const reducedMotion = useReducedMotion();
  const [replayCount, setReplayCount] = useState(0);

  return (
    <div className="mt-5 flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => setReplayCount((count) => count + 1)}
        title="Replay signature doodle"
        aria-label="Kamal's hand-drawn signature. Click to replay drawing animation."
        className="ui-press group inline-flex cursor-pointer items-center gap-2 rounded-lg px-1 py-0.5 text-foreground/90 transition-opacity hover:opacity-85"
      >
        <svg
          key={replayCount}
          viewBox="0 0 152 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-12 w-auto overflow-visible"
        >
          {STROKES.map((stroke) => (
            <motion.path
              key={stroke.id}
              d={stroke.d}
              stroke={stroke.brand ? "var(--color-brand)" : "currentColor"}
              strokeWidth={stroke.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                reducedMotion
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={
                replayCount > 0 ? { pathLength: 1, opacity: 1 } : undefined
              }
              whileInView={
                replayCount === 0 ? { pathLength: 1, opacity: 1 } : undefined
              }
              viewport={{ once: true, amount: 0.5 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      pathLength: {
                        delay: stroke.delay,
                        duration: stroke.duration,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        delay: stroke.delay,
                        duration: 0.08,
                      },
                    }
              }
            />
          ))}
        </svg>
        <span className="text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [font-family:var(--font-geist-mono)]">
          replay
        </span>
      </button>
    </div>
  );
}
