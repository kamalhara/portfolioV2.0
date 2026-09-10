"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useState } from "react";
import { mainProjects } from "../data/project";
import Heading from "../ui/Heading";

export default function Project() {
  const [activeProject, setActiveProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.45 });
  const y = useSpring(pointerY, { stiffness: 420, damping: 34, mass: 0.45 });

  const getPreview = (project) =>
    project.cover ??
    (project.screenshot?.[0] ? `/${project.screenshot[0]}` : null);

  const movePreview = (event) => {
    if (event.pointerType !== "mouse") return;

    const previewWidth = 340;
    const previewHeight = 220;
    const gap = 28;
    const nextX =
      event.clientX + gap + previewWidth > window.innerWidth
        ? event.clientX - previewWidth - gap
        : event.clientX + gap;
    const nextY = Math.min(
      Math.max(event.clientY - previewHeight / 2, 76),
      window.innerHeight - previewHeight - 20,
    );

    pointerX.set(nextX);
    pointerY.set(nextY);
  };

  return (
    <section id="work" aria-labelledby="work-title" className="mb-28 pt-8">
      <Heading
        label1="01 Selected work"
        label2={`0${mainProjects.length} featured`}
        border_y={false}
      />
      <ul className="mt-8 sm:mt-12" onPointerMove={movePreview}>
        {mainProjects.map((project, index) => {
          const preview = getPreview(project);

          return (
            <motion.li
              key={project.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.07, 0.2),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative border-t-[1.5px] border-paper-border last:border-b-[1.5px]"
            >
              <Link
                href={`/project/${project.slug}`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && preview) {
                    movePreview(event);
                    setActiveProject({ ...project, preview });
                  }
                }}
                onPointerLeave={() => setActiveProject(null)}
                onFocus={() => setActiveProject(null)}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-7 no-underline outline-offset-8 transition-colors sm:gap-x-5 sm:py-9 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(10rem,1fr)_4rem] md:gap-x-8 md:py-11"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[12px] text-ink-muted transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:text-accent-orange"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="col-start-2 min-w-0">
                  <span className="block text-[clamp(1.65rem,7.5vw,2.5rem)] font-medium leading-[1.05] tracking-tight text-ink-text transition-transform duration-300 ease-out group-hover:translate-x-2">
                    {project.title}
                    <span
                      aria-hidden="true"
                      className="ml-3 inline-block font-serif text-[0.7em] italic text-ink-muted opacity-60 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent-orange group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-2 block max-w-[52ch] font-serif text-[15px] italic leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink-text md:text-[17px]">
                    {project.description}
                  </span>
                </span>

                {preview && (
                  <span className="relative col-span-2 mt-5 block aspect-[16/9] overflow-hidden border border-paper-border bg-bg-cream-light md:hidden">
                    <Image
                      src={preview}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 92vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  </span>
                )}

                <span className="col-start-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] leading-relaxed text-ink-muted opacity-70 transition-all duration-300 group-hover:text-ink-text group-hover:opacity-100 md:col-start-3 md:justify-self-start md:pt-2.5">
                  <span
                    aria-hidden="true"
                    className={index === 0 ? "text-accent-orange" : ""}
                  >
                    {index === 0 ? "●" : "○"}
                  </span>
                  {project.technologies}
                </span>

                <span className="col-start-2 hidden text-right font-mono text-[11px] text-ink-muted md:col-start-4 md:justify-self-end md:pt-2.5 md:group-hover:text-ink-text">
                  2024
                  {index === 0 && (
                    <span
                      aria-hidden="true"
                      className="mt-1 block text-[9px] uppercase tracking-widest text-ink-muted opacity-60 transition-colors duration-300 group-hover:text-accent-orange group-hover:opacity-100"
                    >
                      Featured
                    </span>
                  )}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {activeProject && (
          <motion.figure
            key={activeProject.slug}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            style={{ x, y }}
            className="pointer-events-none fixed top-0 left-0 z-[70] hidden w-[340px] overflow-hidden border border-ink-text/20 bg-bg-cream-light shadow-[0_22px_60px_rgba(17,17,17,0.22)] md:block"
          >
            <div className="relative aspect-[17/10] overflow-hidden">
              <Image
                src={activeProject.preview}
                alt=""
                fill
                sizes="340px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="flex items-center justify-between border-t border-paper-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              <span>{activeProject.title}</span>
              <span className="text-accent-orange">View project ↗</span>
            </figcaption>
          </motion.figure>
        )}
      </AnimatePresence>
      <p className="mt-8 max-w-[52ch] font-serif text-[15px] italic leading-relaxed text-ink-muted">
        Each project opens as an engineering dossier — the problem, the
        decisions, the architecture, and what broke along the way.
      </p>
      <div>
        <Link
          href="/project"
          className="group mt-12 flex items-center justify-between gap-6 border-[1.5px] border-paper-border px-6 py-6 no-underline transition-all duration-300 ease-out hover:border-ink-text hover:bg-ink-text md:px-10 md:py-8"
        >
          <span className="text-[clamp(1.25rem,2.8vw,2.1rem)] font-medium leading-none tracking-tight text-ink-text transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-bg-cream">
            Explore all projects
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 font-serif text-[clamp(1.5rem,3vw,2.4rem)] italic leading-none text-accent-orange transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
