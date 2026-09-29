import Link from "next/link";
import { projects } from "@/app/data/project";
import { portfolio, projectSummaries } from "@/app/data/portfolio";
import PortfolioDock from "@/app/components/Dock";
import {
  badge,
  container,
  listLink,
  listTitle,
  muted,
  shell,
} from "@/app/components/portfolioStyles";

export const metadata = {
  title: "Projects",
  description: `Selected projects by ${portfolio.name}.`,
  alternates: { canonical: "/project" },
};

export default function ProjectPage() {
  return (
    <div className={shell}>
      <main id="main" className={container}>
        <header className="mb-9.75">
          <h1 className="text-xl leading-[1.4] font-medium">Projects</h1>
          <p className={muted}>
            A collection of things I&apos;ve built, from open-source tools to
            full-stack and mobile products.
          </p>
        </header>
        <ul className="grid max-w-130 gap-4.75">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/project/${project.slug}`} className={listLink}>
                <span className={listTitle}>
                  {project.title}
                  <span className={badge}>{project.type}</span>
                </span>
                <span
                  className={`block max-w-127.5 transition-colors group-hover:text-(--rep-text) ${muted}`}
                >
                  {projectSummaries[project.slug] ?? project.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className={`mt-11.5 inline-block underline underline-offset-4 hover:text-(--rep-text) ${muted}`}
        >
          ← back home
        </Link>
      </main>
      <PortfolioDock />
    </div>
  );
}
