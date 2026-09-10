"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";

const filters = ["All", "Web App", "Mobile App", "Backend API"];

export default function ProjectArchive({ projects }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

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
      <div className="mt-10 grid gap-4 border-y border-ink py-5 md:grid-cols-[1fr_auto] md:items-center">
        <label className="flex min-h-12 items-center gap-3 border border-line bg-sheet px-4">
          <FiSearch aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by project or technology"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`min-h-11 border px-3 text-sm font-semibold transition-colors ${
                filter === item
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-sheet text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted" aria-live="polite">
        {filteredProjects.length} project
        {filteredProjects.length === 1 ? "" : "s"}
      </p>

      {filteredProjects.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <Link
              href={`/project/${project.slug}`}
              key={project.slug}
              className="group card-lift flex flex-col overflow-hidden border border-line bg-sheet no-underline"
            >
              {project.cover ? (
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                  <Image
                    src={project.cover}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 580px"
                    className="project-image object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center border-b border-line bg-ink font-mono text-sm text-white/70">
                  REST API / Node.js / MongoDB
                </div>
              )}
              <div className="flex flex-1 items-start justify-between gap-5 p-5">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-blue">
                    {project.type}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {project.title}
                  </h2>
                  <p className="mt-3 leading-7 text-muted">
                    {project.description}
                  </p>
                </div>
                <FiArrowUpRight
                  className="mt-1 shrink-0 text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5 border border-line bg-sheet px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">
            No projects match that search.
          </h2>
          <p className="mt-2 text-muted">Try another technology or category.</p>
        </div>
      )}
    </>
  );
}
