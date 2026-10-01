import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectTypeBadge from "@/app/components/ProjectTypeBadge";
import { projectSummaries } from "@/app/data/portfolio";
import ProjectPreview from "./ProjectPreview";

export default function ProjectCard({ project, featured = false }) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className={`project-card ${featured ? "project-card-featured" : ""}`}
    >
      <div className="project-card-media">
        <ProjectPreview project={project} large={featured} preload={featured} />
      </div>
      <div className="p-5 max-[480px]:p-4">
        {featured && (
          <p className="mb-3 text-[10px] tracking-[.14em] text-muted-foreground uppercase [font-family:var(--font-geist-mono)]">
            Featured project
          </p>
        )}
        <div className="flex items-start justify-between gap-3">
          <h2
            className={`${featured ? "text-2xl" : "text-base"} leading-[1.35] font-medium tracking-[-.035em]`}
          >
            {project.title}
          </h2>
          <ArrowUpRight
            size={17}
            className="mt-1 shrink-0 text-muted-foreground"
          />
        </div>
        <div className="mt-2">
          <ProjectTypeBadge type={project.type} />
        </div>
        <p className="mt-3 text-sm leading-[1.65] text-muted-foreground">
          {projectSummaries[project.slug] ?? project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies
            .split(" · ")
            .slice(0, 4)
            .map((tech) => (
              <span
                className="rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground [font-family:var(--font-geist-mono)]"
                key={tech}
              >
                {tech}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
}
