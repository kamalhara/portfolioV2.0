"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { assistantOpenEvent } from "@/app/lib/assistantEvents";

export default function AboutInteractive({ highlights }) {
  const reducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(highlights[0]?.id ?? null);
  const [stageByCard, setStageByCard] = useState({});

  const activeHighlight = highlights.find((item) => item.id === selectedId);
  const activeStages = activeHighlight?.stages ?? [];
  const activeStageId =
    stageByCard[activeHighlight?.id] ?? activeStages[0]?.id ?? null;
  const activeStage = activeStages.find((stage) => stage.id === activeStageId);

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
    <div className="mt-7 space-y-2.5">
      <div
        className="grid grid-cols-2 gap-2.5 max-[560px]:grid-cols-1"
        role="tablist"
        aria-label="How Kamal thinks and builds"
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
              className={`ui-press flex cursor-pointer flex-col items-start rounded-xl border px-3.5 py-3 text-left transition-colors ${
                isSelected
                  ? "border-foreground/30 bg-[#F9F8F8] dark:bg-[#171717]"
                  : "border-border bg-[#F9F8F8]/65 hover:border-border-strong hover:bg-[#F9F8F8] dark:bg-[#171717]/65 dark:hover:bg-[#171717]"
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  className={`text-[13.5px] font-medium tracking-[-0.02em] transition-colors ${
                    isSelected ? "text-foreground" : "text-foreground/80"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className="relative flex size-2 shrink-0 items-center justify-center"
                >
                  <span className="size-1.5 rounded-full border border-border-strong" />
                  {isSelected && (
                    <motion.span
                      layoutId="about-active-block"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 32 }
                      }
                      className="absolute size-1.5 rounded-full bg-foreground"
                    />
                  )}
                </span>
              </div>
              <span className="mt-0.5 text-xs text-muted-foreground">
                {item.summary}
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
            initial={reducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
            transition={{
              duration: reducedMotion ? 0 : 0.18,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="rounded-xl border border-border bg-[#F9F8F8] px-4 py-3.5 dark:bg-[#171717]"
          >
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {activeHighlight.detail}
            </p>

            {activeStages.length > 0 && (
              <div className="mt-3 border-t border-border/70 pt-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {activeStages.map((stage) => {
                      const isStageActive = stage.id === activeStageId;
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          aria-pressed={isStageActive}
                          onClick={() =>
                            setStageByCard((prev) => ({
                              ...prev,
                              [activeHighlight.id]: stage.id,
                            }))
                          }
                          className={`ui-press relative cursor-pointer rounded-full px-2.5 py-1 text-[11px] leading-none transition-colors [font-family:var(--font-geist-mono)] ${
                            isStageActive
                              ? "text-background"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {isStageActive && (
                            <motion.span
                              layoutId={`about-stage-${activeHighlight.id}`}
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 32,
                              }}
                              className="absolute inset-0 rounded-full bg-foreground"
                            />
                          )}
                          <span className="relative z-10">{stage.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={(event) =>
                      openAssistant(activeHighlight.prompt, event)
                    }
                    aria-haspopup="dialog"
                    className="ui-nudge cursor-pointer text-[11px] text-muted-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground [font-family:var(--font-geist-mono)]"
                  >
                    Ask AI →
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeStage && (
                    <motion.p
                      key={activeStage.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }
                      }
                      transition={{ duration: reducedMotion ? 0 : 0.14 }}
                      className="mt-2.5 text-xs leading-relaxed text-foreground/85"
                    >
                      {activeStage.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
