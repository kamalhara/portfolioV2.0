"use client";

import { motion, useReducedMotion } from "motion/react";

export default function RectangularTextReveal({
  as: Tag = "p",
  className = "",
  lines,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Tag className={`block ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span
          key={line}
          aria-hidden="true"
          className="relative block w-fit overflow-hidden"
        >
          <motion.span
            className="block"
            initial={shouldReduceMotion ? false : { opacity: 0, y: "35%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.32,
              delay: shouldReduceMotion ? 0 : 0.28 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
          {!shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-accent-orange"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{
                clipPath: [
                  "inset(0 100% 0 0)",
                  "inset(0 0% 0 0)",
                  "inset(0 0 0 100%)",
                ],
              }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 0.62,
                delay: index * 0.12,
                times: [0, 0.48, 1],
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          )}
        </span>
      ))}
    </Tag>
  );
}
