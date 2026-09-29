import Link from "next/link";
import { projects } from "@/app/data/project";
import { portfolio, projectSummaries } from "@/app/data/portfolio";
import PortfolioDock from "@/app/components/Dock";

export const metadata = {
  title: "Projects",
  description: `Selected projects by ${portfolio.name}.`,
  alternates: { canonical: "/project" },
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-background text-[15.7px] leading-[1.64] tracking-[-0.025em] text-foreground [font-family:var(--font-geist)] max-[480px]:text-[15.5px]">
      <main id="main" className="mx-auto w-[min(800px,calc(100%-50px))] pt-[99px] pb-40 max-[700px]:pt-[54px]">
        <header className="mb-9.75">
          <h1 className="text-xl leading-[1.4] font-medium">Projects</h1>
          <p className="text-muted-foreground">
            A collection of things I&apos;ve built, from open-source tools to
            full-stack and mobile products.
          </p>
        </header>
        <ul className="grid max-w-130 gap-4.75">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/project/${project.slug}`} className="group block w-fit max-w-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">
                <span className="flex flex-wrap items-center gap-[9px] text-foreground group-hover:underline group-hover:decoration-muted-foreground group-hover:underline-offset-4">
                  {project.title}
                  <span className="inline-flex min-h-[19px] items-center rounded-full bg-[#3f251b] px-2 py-px text-[11px] leading-[1.2] tracking-normal">{project.type}</span>
                </span>
                <span
                  className="block max-w-127.5 text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  {projectSummaries[project.slug] ?? project.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-11.5 inline-block text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          ← back home
        </Link>
      </main>
      <PortfolioDock />
    </div>
  );
}
