import Link from "next/link";
import ProjectTypeBadge from "@/app/components/ProjectTypeBadge";
import ProjectHoverPreview from "@/app/components/home/ProjectHoverPreview";
import { mainProjects } from "@/app/data/project";
import { projectSummaries } from "@/app/data/portfolio";

const previewProjects = mainProjects.slice(0, 3);

export default function ProjectsSection() {
  return (
    <section
      className="relative z-10 mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="projects-heading"
      >
        Projects
      </h2>
      <ul className="relative grid gap-1.5">
        {previewProjects.map((project) => {
          const screenshot = project.screenshot?.[2] ?? project.screenshot?.[0];
          const previewImage =
            project.cover ?? (screenshot && `/${screenshot}`);

          return (
            <li
              key={project.slug}
              className="group -ml-3 w-120 max-w-[calc(100%+1.5rem)] rounded-2xl px-3 py-2 transition-colors duration-300 hover:bg-[#1C1C1A] focus-within:bg-[#1C1C1A]"
            >
              <Link
                href={`/project/${project.slug}`}
                className="ui-nudge block w-fit max-w-full"
              >
                <span className="flex flex-wrap items-center gap-2.25 text-foreground transition-colors">
                  {project.title}
                  <ProjectTypeBadge
                    type={project.type}
                    className="font-semibold"
                  />
                </span>
                <span className="block text-muted-foreground transition-colors group-hover:text-[#a19e99] group-focus-within:text-[#a19e99]">
                  {projectSummaries[project.slug] ?? project.description}
                </span>
              </Link>
              {previewImage && (
                <ProjectHoverPreview project={project} src={previewImage} />
              )}
            </li>
          );
        })}
      </ul>
      <Link
        href="/project"
        className="ui-nudge mt-7 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        more projects
      </Link>
    </section>
  );
}
