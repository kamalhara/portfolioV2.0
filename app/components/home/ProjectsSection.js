import Link from "next/link";
import ProjectTypeBadge from "@/app/components/ProjectTypeBadge";
import { mainProjects } from "@/app/data/project";
import { projectSummaries } from "@/app/data/portfolio";

const previewProjects = mainProjects.slice(0, 3);

export default function ProjectsSection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="projects-heading"
      >
        Projects
      </h2>
      <ul className="grid gap-4.5">
        {previewProjects.map((project) => (
          <li
            key={project.slug}
            className="-ml-3 w-120 max-w-[calc(100%+1.5rem)] rounded-2xl px-3 py-2 hover:bg-[#1C1C1A]"
          >
            <Link
              href={`/project/${project.slug}`}
              className="group block w-fit max-w-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand "
            >
              <span className="flex flex-wrap items-center gap-2.25 text-foreground transition-colors group-focus-visible:text-muted-foreground">
                {project.title}
                <ProjectTypeBadge
                  type={project.type}
                  className="font-semibold"
                />
              </span>
              <span className="block text-muted-foreground">
                {projectSummaries[project.slug] ?? project.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/project"
        className="mt-7 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        more projects
      </Link>
    </section>
  );
}
