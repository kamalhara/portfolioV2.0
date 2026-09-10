"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const filters = ["All", "Mobile Product", "Mobile App", "Web App", "Backend API"];

export default function ProjectArchive({ projects }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesType = filter === "All" || project.type === filter;
      const haystack = `${project.title} ${project.description} ${project.technologies}`.toLowerCase();
      return matchesType && (!normalized || haystack.includes(normalized));
    });
  }, [filter, projects, query]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 border-y border-paper-border py-4 md:grid-cols-[minmax(250px,.8fr)_1.2fr] md:items-center">
        <label className="flex items-center gap-3 border-b border-paper-border-dark py-2"><FiSearch aria-hidden="true" /><span className="sr-only">Search projects</span><input className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint" value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search project or technology" /></label>
        <div className="flex flex-wrap gap-2 md:justify-end" aria-label="Filter projects">{filters.map((item) => <button className={`min-h-9 border px-3 font-mono text-[10px] uppercase transition-colors ${filter === item ? "border-ink-text bg-ink-text text-bg-cream" : "border-paper-border text-ink-muted hover:border-paper-border-dark hover:text-ink-text"}`} key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      </div>
      <p className="mt-5 mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint" aria-live="polite">{String(filteredProjects.length).padStart(2, "0")} projects</p>
      {filteredProjects.length ? (
        <ol className="divide-y divide-paper-border border-y border-paper-border">
          {filteredProjects.map((project, index) => (
            <li key={project.slug}><Link href={`/project/${project.slug}`} className="group grid min-h-28 grid-cols-[2.5rem_1fr_1.5rem] items-center gap-3 px-2 transition-colors hover:bg-[#f0eee8] md:grid-cols-[3rem_1fr_8rem_2rem]"><span className="font-mono text-[11px] text-ink-faint">{String(index + 1).padStart(2, "0")}</span><span className="flex flex-col gap-1"><strong className="text-2xl font-semibold tracking-tight">{project.title}</strong><em className="font-serif text-base leading-snug italic text-ink-muted">{project.description}</em></span><span className="hidden font-mono text-[10px] uppercase text-ink-faint md:block">{project.type}</span><span className="text-lg text-accent-orange transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></Link></li>
          ))}
        </ol>
      ) : <div className="border-y border-paper-border py-16 text-center"><h2 className="text-2xl font-medium">No matching project.</h2><p className="mt-2 text-sm text-ink-muted">Try another technology or category.</p></div>}
    </>
  );
}
