import Link from "next/link";
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
          <li key={project.slug}>
            <Link
              href={`/project/${project.slug}`}
              className="group block w-fit max-w-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span className="flex flex-wrap items-center gap-2.25 text-foreground group-hover:underline group-hover:decoration-muted-foreground group-hover:underline-offset-4">
                {project.title}
                <span className="inline-flex min-h-4.75 items-center rounded-full bg-[#3f251b] px-2 py-px text-[11px] leading-[1.2] tracking-normal font-semibold">
                  {project.type}
                </span>
              </span>
              <span className="block text-muted-foreground transition-colors group-hover:text-foreground">
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
