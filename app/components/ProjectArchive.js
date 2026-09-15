"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const filters = [
  "All",
  "Mobile Product",
  "Mobile App",
  "Web App",
  "Backend API",
];

export default function ProjectArchive({ projects }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesType = filter === "All" || project.type === filter;
      const haystack =
        `${project.title} ${project.description} ${project.technologies}`.toLowerCase();
      return matchesType && (!normalized || haystack.includes(normalized));
    });
  }, [filter, projects, query]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 border-y border-paper-border py-4 md:grid-cols-[minmax(250px,.8fr)_1.2fr] md:items-center md:gap-6">
        <label className="flex items-center gap-3 border-b border-paper-border-dark py-2 transition-colors focus-within:border-accent-orange">
          <FiSearch aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input
            className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-ink-faint sm:text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search project or technology"
          />
        </label>
        <div
          className="flex snap-x gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-end md:overflow-visible md:pb-0"
          aria-label="Filter projects"
        >
          {filters.map((item) => (
            <button
              className={`min-h-10 shrink-0 snap-start border px-3 font-mono text-[10px] uppercase transition-all duration-200 hover:-translate-y-0.5 ${filter === item ? "border-ink-text bg-ink-text text-bg-cream" : "border-paper-border text-ink-muted hover:border-paper-border-dark hover:text-ink-text"}`}
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p
        className="mt-5 mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint"
        aria-live="polite"
      >
        {String(filteredProjects.length).padStart(2, "0")} projects
      </p>
      {filteredProjects.length ? (
        <ol className="divide-y divide-paper-border border-y border-paper-border">
          {filteredProjects.map((project, index) => (
            <motion.li
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.025 }}
              key={project.slug}
            >
              <Link
                href={`/project/${project.slug}`}
                className="group grid min-h-28 grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-center gap-3 px-1 py-5 transition-colors duration-300 hover:bg-bg-cream-light sm:grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] sm:px-2 md:grid-cols-[3rem_minmax(0,1fr)_8rem_2rem]"
              >
                <span className="font-mono text-[11px] text-ink-faint transition-colors group-hover:text-accent-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <strong className="text-[clamp(1.35rem,6vw,1.5rem)] font-semibold tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    {project.title}
                  </strong>
                  <em className="font-serif text-[15px] leading-snug italic text-ink-muted transition-colors duration-300 group-hover:text-ink-text sm:text-base">
                    {project.description}
                  </em>
                  <span className="mt-2 font-mono text-[10px] uppercase text-ink-faint md:hidden">
                    {project.type}
                  </span>
                </span>
                <span className="hidden font-mono text-[10px] uppercase text-ink-faint md:block">
                  {project.type}
                </span>
                <span className="text-lg text-accent-orange transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      ) : (
        <div className="border-y border-paper-border py-16 text-center">
          <h2 className="text-2xl font-medium">No matching project.</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Try another technology or category.
          </p>
        </div>
      )}
    </>
  );
}
