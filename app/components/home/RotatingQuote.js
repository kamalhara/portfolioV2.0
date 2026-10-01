"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { animeQuotes } from "@/app/data/quotes";

function shuffleQuotes(current) {
  const order = animeQuotes
    .map((_, index) => index)
    .filter((index) => index !== current);
  for (let index = order.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [order[index], order[other]] = [order[other], order[index]];
  }
  return [current, ...order];
}

function QuoteText({ quote }) {
  return (
    <>
      <p className="text-lg leading-relaxed">&ldquo;{quote.content}&rdquo;</p>
      <p className="mt-1.75 text-sm leading-[1.6] text-muted-foreground">
        — {quote.character} ({quote.anime})
      </p>
    </>
  );
}

export default function RotatingQuote({ initialIndex = 0 }) {
  const [current, setCurrent] = useState({ index: initialIndex, turn: 0 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const interacting = hovered || focused;
  const [hidden, setHidden] = useState(false);
  const reducedMotion = useReducedMotion();
  const order = useRef([]);
  const position = useRef(0);
  const moveRef = useRef(null);

  function move(step) {
    if (!order.current.length) order.current = shuffleQuotes(current.index);
    let next = position.current + step;
    if (next >= order.current.length) {
      order.current = shuffleQuotes(current.index);
      next = 1;
    } else if (next < 0) {
      next = order.current.length - 1;
    }
    position.current = next;
    const index = order.current[next];
    setCurrent((value) => ({
      index,
      turn: value.turn + 1,
    }));
  }

  useEffect(() => {
    moveRef.current = move;
  });

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (paused || interacting || hidden || reducedMotion) return;
    const timer = window.setInterval(() => moveRef.current(1), 6000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, hidden, reducedMotion]);

  return (
    <div
      className="mx-auto mt-22.5 max-w-135 max-[700px]:mt-20 [font-family:var(--font-geist-mono)]"
      role="region"
      aria-label="Anime quotes"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div
        className="relative grid overflow-hidden"
        aria-live={paused || interacting || reducedMotion ? "polite" : "off"}
      >
        {/* Overlaid sizing copies reserve the tallest quote at any viewport width. */}
        <div className="invisible grid" aria-hidden="true">
          {animeQuotes.map((quote, index) => (
            <div className="[grid-area:1/1]" key={index}>
              <QuoteText quote={quote} />
            </div>
          ))}
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            className="absolute inset-x-0 top-0"
            key={current.turn}
            initial={reducedMotion ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: -28, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.45,
              ease: [0.2, 0, 0, 1],
            }}
          >
            <QuoteText quote={animeQuotes[current.index]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-muted-foreground">
        <button
          type="button"
          className="quote-control"
          aria-label="Previous quote"
          onClick={() => move(-1)}
        >
          <ChevronLeft size={13} />
        </button>
        <button
          type="button"
          className="quote-control"
          aria-label={
            reducedMotion
              ? "Automatic rotation disabled for reduced motion"
              : paused
                ? "Play quotes"
                : "Pause quotes"
          }
          aria-pressed={paused || Boolean(reducedMotion)}
          disabled={Boolean(reducedMotion)}
          onClick={() => setPaused((value) => !value)}
        >
          {paused || reducedMotion ? <Play size={11} /> : <Pause size={11} />}
        </button>
        <button
          type="button"
          className="quote-control"
          aria-label="Next quote"
          onClick={() => move(1)}
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
