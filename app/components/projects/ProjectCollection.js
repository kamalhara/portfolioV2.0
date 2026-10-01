"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { getProjectCategory } from "./projectMedia";

const categories = ["All", "Web", "Mobile", "Open Source", "APIs"];

export default function ProjectCollection({ projects }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const matching = projects.filter(
    (project) =>
      (category === "All" || getProjectCategory(project) === category) &&
      `${project.title} ${project.description} ${project.technologies} ${project.frontEnd ?? ""} ${project.backEnd ?? ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex flex-wrap gap-1"
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`project-filter ${category === item ? "project-filter-active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:border-brand min-[700px]:w-52">
          <Search size={14} className="shrink-0 text-muted-foreground" />
          <input
            aria-label="Search projects"
            placeholder="Find a project or stack…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent py-2 text-xs outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear project search"
              onClick={() => setQuery("")}
              className="text-muted-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <p
        className="mb-4 text-[11px] text-muted-foreground [font-family:var(--font-geist-mono)]"
        role="status"
        aria-live="polite"
      >
        {matching.length} {matching.length === 1 ? "project" : "projects"}
        {category !== "All" ? ` / ${category}` : " / all work"}
      </p>
      <div className="grid grid-cols-2 items-start gap-4 max-[600px]:grid-cols-1">
        {matching.map((project) => (
          <ProjectCard
            project={project}
            featured={Boolean(project.featured)}
            key={project.slug}
          />
        ))}
      </div>
      {matching.length === 0 && (
        <div className="rounded-[15px] border border-dashed border-border py-14 text-center">
          <p className="text-sm">No projects found.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try another name or technology.
          </p>
          <button
            type="button"
            className="mt-4 text-xs underline underline-offset-4"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
