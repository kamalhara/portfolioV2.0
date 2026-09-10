"use client";

import dynamic from "next/dynamic";
import { cloneElement } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Heading from "../ui/Heading";
import { skillCategories } from "../data/skills";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false },
);

export default function Activities() {
  return (
    <section
      id="activity"
      aria-labelledby="activity-title"
      className="mb-20 pt-8 sm:mb-28"
    >
      <Heading label1="04 Activity" label2="Evidence, not claims" />

      <div className="mt-12 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            Selected stack
          </p>
          <h2 className="mt-4 text-[clamp(2rem,8vw,2.5rem)] font-medium tracking-tight text-ink-text">
            Toolbox
          </h2>
          <p className="mt-4 max-w-[34ch] font-serif text-[15px] italic leading-relaxed text-ink-muted">
            From product interfaces to the systems behind them.
          </p>
        </div>

        <ol className="border-t-[1.5px] border-paper-border lg:col-span-8">
          {skillCategories.map((category, index) => {
            const isAgenticAi = category.title === "Agentic AI";

            return (
              <li
                key={category.title}
                className="group/category grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 border-b-[1.5px] border-paper-border py-6 sm:grid-cols-[2.5rem_8rem_minmax(0,1fr)] sm:gap-x-6"
              >
                <span
                  aria-hidden="true"
                  className={`font-mono text-[11px] transition-all duration-300 ease-out group-hover/category:-translate-x-1 group-hover/category:text-accent-orange ${isAgenticAi ? "text-accent-orange" : "text-ink-faint"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium tracking-tight text-ink-text transition-all duration-300 ease-out group-hover/category:translate-x-1 group-hover/category:text-accent-orange">
                  {category.title}
                </h3>
                <ul className="col-start-2 mt-4 grid min-w-0 gap-x-6 gap-y-2 font-mono text-xs sm:col-start-3 sm:mt-0 sm:grid-cols-2">
                  {category.skills.map(([name, focus]) => (
                    <li
                      key={name}
                      className="group/skill flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-l-[1.5px] border-paper-border/80 border-l-transparent px-2 py-2.5 transition-all duration-300 ease-out hover:border-b-paper-border-dark hover:border-l-accent-orange hover:bg-ink-muted/10 hover:pl-3 sm:flex-nowrap"
                    >
                      <strong className="text-[13px] font-medium text-ink-text transition-colors duration-300 group-hover/skill:text-accent-orange">
                        {name}
                      </strong>
                      <span className="text-right text-[12px] text-ink-faint transition-colors duration-300 group-hover/skill:text-ink-muted">
                        {focus}{" "}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-all duration-300 ease-out group-hover/skill:translate-x-1 group-hover/skill:text-accent-orange"
                        >
                          →
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            Open source / {new Date().getFullYear()}
          </p>
          <h2
            id="activity-title"
            className="mt-4 max-w-[12ch] text-[clamp(2rem,8vw,2.5rem)] font-medium leading-snug tracking-tight text-ink-text"
          >
            Work that leaves a trace.
          </h2>
          <p className="mt-4 max-w-[34ch] font-serif text-[15px] italic leading-relaxed text-ink-muted">
            A public record of the work between releases.
          </p>
          <a
            href="https://github.com/kamalhara"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors duration-300 hover:text-accent-orange"
          >
            <FiGithub
              aria-hidden="true"
              className="text-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            />
            <span className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent-orange after:transition-[width] after:duration-300 group-hover:after:w-full">
              kamalhara
            </span>
            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div className="flex items-center justify-between border-b-[1.5px] border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            <span>GitHub contributions</span>
          </div>
          <div className="overscroll-x-contain overflow-x-auto border-b-[1.5px] border-paper-border py-8 text-ink-muted transition-colors duration-300 hover:border-accent-orange/50">
            <GitHubCalendar
              username="kamalhara"
              colorScheme="light"
              theme={{
                light: [
                  "rgba(17, 17, 17, 0.07)",
                  "rgba(17, 17, 17, 0.2)",
                  "rgba(17, 17, 17, 0.4)",
                  "rgba(17, 17, 17, 0.65)",
                  "rgba(17, 17, 17, 0.9)",
                ],
              }}
              blockSize={10}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              year={new Date().getFullYear()}
              renderBlock={(block) => {
                return cloneElement(block, {
                  className:
                    "cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:!fill-accent-orange hover:stroke-bg-cream hover:stroke-[2px]",
                  style: {
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
