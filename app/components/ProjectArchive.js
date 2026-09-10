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
      <div className="archive-controls">
        <label>
          <FiSearch aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search project or technology" />
        </label>
        <div aria-label="Filter projects">
          {filters.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>

      <p className="archive-count" aria-live="polite">{String(filteredProjects.length).padStart(2, "0")} projects</p>
      {filteredProjects.length ? (
        <ol className="archive-list">
          {filteredProjects.map((project, index) => (
            <li key={project.slug}>
              <Link href={`/project/${project.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{project.title}</strong><em>{project.description}</em></span>
                <span>{project.type}</span>
                <span>↗</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="archive-empty"><h2>No matching project.</h2><p>Try a different technology or category.</p></div>
      )}
    </>
  );
}
