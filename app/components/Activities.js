"use client";

import dynamic from "next/dynamic";
import { cloneElement } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import {
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiReactquery,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import Heading from "../ui/Heading";
import { skillCategories } from "../data/skills";
import LogoLoop from "./LogoLoop";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiReactquery />,
    title: "React Query",
    href: "https://reactquery.dev",
  },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress />, title: "Express", href: "https://expressjs.com" },
  { node: <SiExpo />, title: "Expo", href: "https://expo.dev" },
  { node: <SiReact />, title: "React Native", href: "https://reactnative.dev" },
  {
    node: <SiFirebase />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
];

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

      <div className="mt-8 border-y-[1.5px] border-paper-border py-5 sm:mt-10 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-4 px-1 font-mono text-[11px] uppercase tracking-wider text-ink-muted sm:mb-5">
          <span className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent-orange"
            />
            Core technologies
          </span>
          <span className="hidden text-ink-faint sm:inline">
            Hover to pause
          </span>
        </div>
        <LogoLoop
          logos={techLogos}
          speed={58}
          direction="left"
          logoHeight={24}
          gap={14}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--color-bg-cream)"
          ariaLabel="Core technologies"
          className="-mx-1 py-1"
          renderItem={(item) => (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${item.title} website`}
              className="group/logo inline-flex min-h-12 items-center gap-3 border border-paper-border bg-bg-cream-light px-4 text-ink-muted no-underline transition-[color,border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-orange/60 hover:bg-bg-cream hover:text-accent-orange focus-visible:border-accent-orange sm:px-5"
            >
              <span
                aria-hidden="true"
                className="text-[length:var(--logoloop-logoHeight)] transition-transform duration-300 ease-out group-hover/logo:scale-110"
              >
                {item.node}
              </span>
              <span className="whitespace-nowrap font-mono text-[12px] font-medium tracking-tight text-ink-text transition-colors duration-300 group-hover/logo:text-accent-orange">
                {item.title}
              </span>
            </a>
          )}
        />
      </div>

      <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
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
