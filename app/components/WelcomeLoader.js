"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const storageKey = "kamalveer-portfolio-welcome-session-v1";

export default function WelcomeLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const previousOverflowRef = useRef(null);

  const restoreBodyScroll = () => {
    if (previousOverflowRef.current === null) return;

    document.body.style.overflow = previousOverflowRef.current;
    previousOverflowRef.current = null;
  };

  useEffect(() => {
    let hasVisited = false;

    try {
      hasVisited = window.sessionStorage.getItem(storageKey) === "seen";
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }

    if (hasVisited) {
      const hideTimer = window.setTimeout(() => setIsVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const seenTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(storageKey, "seen");
      } catch {
        // The intro still works when storage is unavailable.
      }
    }, 50);

    const timer = window.setTimeout(
      () => setIsVisible(false),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 350
        : 2700,
    );

    return () => {
      window.clearTimeout(seenTimer);
      window.clearTimeout(timer);
      restoreBodyScroll();
    };
  }, []);

  const finishWelcome = () => {
    restoreBodyScroll();

    try {
      window.sessionStorage.setItem(storageKey, "seen");
    } catch {
      // The intro still dismisses when storage is unavailable.
    }
    document.documentElement.dataset.welcomeSeen = "true";
  };

  return (
    <AnimatePresence onExitComplete={finishWelcome}>
      {isVisible && (
        <motion.div
          key="welcome"
          className="welcome-loader fixed inset-0 z-[200] flex min-h-[100dvh] flex-col overflow-hidden bg-ink-text px-5 py-5 text-bg-cream sm:px-8 sm:py-7"
          initial={false}
          exit={!shouldReduceMotion ? { y: "-100%" } : { opacity: 0 }}
          transition={{
            duration: !shouldReduceMotion ? 0.85 : 0,
            ease: [0.76, 0, 0.24, 1],
          }}
          role="status"
          aria-label="Welcome to Kamalveer's portfolio"
        >
          <div className="flex items-center justify-between border-b border-bg-cream/20 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg-cream/60">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Portfolio / {new Date().getFullYear()}
            </motion.span>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="min-h-10 border border-bg-cream/25 px-3 text-bg-cream/70 transition-colors hover:border-accent-orange hover:text-bg-cream"
            >
              Skip intro
            </button>
          </div>

          <div className="grid flex-1 place-items-center">
            <div className="text-center">
              <motion.p
                className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent-orange sm:text-[11px]"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                Welcome
              </motion.p>
              <div className="mt-4 flex items-center justify-center overflow-hidden">
                <motion.span
                  className="text-[clamp(5rem,24vw,13rem)] leading-[0.78] font-semibold tracking-[-0.1em]"
                  initial={shouldReduceMotion ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  K
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  className="mx-3 font-serif text-[clamp(3rem,12vw,7rem)] leading-none italic text-accent-orange sm:mx-6"
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.52 }}
                >
                  /
                </motion.span>
                <motion.span
                  className="text-[clamp(5rem,24vw,13rem)] leading-[0.78] font-semibold tracking-[-0.1em]"
                  initial={shouldReduceMotion ? false : { y: "-105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  S
                </motion.span>
              </div>
              <motion.p
                className="mt-8 font-serif text-[clamp(1.1rem,3vw,1.45rem)] italic text-bg-cream/65"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Software built where interfaces meet systems.
              </motion.p>
            </div>
          </div>

          <div className="border-t border-bg-cream/20 pt-4">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-bg-cream/50">
              <span>Entering index</span>
              <span>00 — 01</span>
            </div>
            <div className="mt-3 h-px overflow-hidden bg-bg-cream/20">
              <motion.div
                className="h-full origin-left bg-accent-orange"
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 2.15,
                  delay: 0.18,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
