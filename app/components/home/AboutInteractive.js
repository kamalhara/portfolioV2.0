"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { assistantOpenEvent } from "@/app/lib/assistantEvents";

function formatIndiaClock() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default function AboutInteractive({ highlights, languages }) {
  const reducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(highlights[0]?.id ?? null);
  const [langId, setLangId] = useState(languages[0]?.id ?? "pa");
  const [istTime, setIstTime] = useState(null);

  useEffect(() => {
    const sync = () => setIstTime(formatIndiaClock());
    const initId = window.requestAnimationFrame(sync);
    const intervalId = window.setInterval(sync, 30000);
    return () => {
      window.cancelAnimationFrame(initId);
      window.clearInterval(intervalId);
    };
  }, []);

  const activeHighlight = highlights.find((item) => item.id === selectedId);
  const activeLanguage =
    languages.find((item) => item.id === langId) ?? languages[0];

  function openAssistant(question, event) {
    window.dispatchEvent(
      new CustomEvent(assistantOpenEvent, {
        detail: {
          question,
          trigger: event.currentTarget,
        },
      }),
    );
  }

  return (
    <div className="mt-7 space-y-4">
      <div
        className="grid grid-cols-2 gap-2.5 max-[560px]:grid-cols-1"
        role="tablist"
        aria-label="More details about Kamal"
      >
        {highlights.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() =>
                setSelectedId((prev) => (prev === item.id ? null : item.id))
              }
              className={`ui-press group relative flex cursor-pointer flex-col items-start rounded-xl border p-3.5 text-left transition-colors ${
                isSelected
                  ? "border-border-strong bg-card"
                  : "border-border bg-card/55 hover:border-border-strong hover:bg-card"
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-[11px] text-muted-foreground [font-family:var(--font-geist-mono)]">
                  {item.kicker}
                </span>
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full transition-colors ${
                    isSelected ? "bg-brand" : "bg-border-strong"
                  }`}
                />
              </div>
              <span className="mt-1 text-[14px] font-medium tracking-[-0.02em] text-foreground">
                {item.title}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">
                {item.id === "availability" && istTime
                  ? `${item.summary} · ${istTime}`
                  : item.summary}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeHighlight && (
          <motion.div
            key={activeHighlight.id}
            role="tabpanel"
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{
              duration: reducedMotion ? 0 : 0.2,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="rounded-xl border border-border bg-card px-4 py-3.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-foreground">
                {activeHighlight.kicker} — {activeHighlight.title}
              </span>
              <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground [font-family:var(--font-geist-mono)]">
                {activeHighlight.meta}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {activeHighlight.detail}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={(event) =>
                  openAssistant(activeHighlight.prompt, event)
                }
                aria-haspopup="dialog"
                className="ui-press inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-foreground transition-colors hover:border-border-strong hover:bg-muted [font-family:var(--font-geist-mono)]"
              >
                <Sparkles size={11} aria-hidden="true" className="text-brand" />
                Ask AI about this
              </button>
              {activeHighlight.id === "focus" && (
                <a
                  href="#projects"
                  className="ui-nudge inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Jump to projects <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/55 px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] text-muted-foreground [font-family:var(--font-geist-mono)]">
            Say hello
          </span>
          {languages.map((lang) => {
            const active = lang.id === langId;
            return (
              <button
                key={lang.id}
                type="button"
                aria-pressed={active}
                onClick={() => setLangId(lang.id)}
                className={`ui-press relative cursor-pointer rounded-full px-2.5 py-1 text-[11px] leading-none transition-colors [font-family:var(--font-geist-mono)] ${
                  active
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="about-language-pill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                )}
                <span className="relative z-10">{lang.native}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage.id}
            initial={reducedMotion ? false : { opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="flex items-center gap-2 text-xs"
          >
            <span className="font-medium text-foreground">
              {activeLanguage.greeting}
            </span>
            <span className="text-muted-foreground max-[560px]:hidden">
              · {activeLanguage.note}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
