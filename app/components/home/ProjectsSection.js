import Image from "next/image";
import Link from "next/link";
import ProjectTypeBadge from "@/app/components/ProjectTypeBadge";
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
      <ul className="relative grid gap-4.5">
        {previewProjects.map((project) => {
          const screenshot = project.screenshot?.[2] ?? project.screenshot?.[0];
          const previewImage =
            project.cover ?? (screenshot && `/${screenshot}`);

          return (
            <li
              key={project.slug}
              className="group -ml-3 w-120 max-w-[calc(100%+1.5rem)] rounded-2xl px-3 py-2 transition-colors duration-200 hover:bg-[#1C1C1A] focus-within:bg-[#1C1C1A]"
            >
              <Link
                href={`/project/${project.slug}`}
                className="block w-fit max-w-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
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
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 left-120 z-10 hidden scale-[0.97] overflow-hidden rounded-xl border border-border bg-card opacity-0 shadow-xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 motion-reduce:scale-100 min-[800px]:block"
                >
                  <div className="h-full w-full relative">
                    <Image
                      src={previewImage}
                      alt=""
                      fill
                      sizes="(max-width: 850px) 270px, 320px"
                      className="object-contain"
                    />
                  </div>
                  {project.code && (
                    <div className="absolute  px-2">
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                      >
                        {project.code}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
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
