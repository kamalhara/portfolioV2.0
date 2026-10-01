import Link from "next/link";
import { projects } from "@/app/data/project";
import { portfolio } from "@/app/data/portfolio";
import PortfolioDock from "@/app/components/Dock";
import ProjectCollection from "@/app/components/projects/ProjectCollection";

export const metadata = {
  title: "Projects",
  description: `Selected projects by ${portfolio.name}.`,
  alternates: { canonical: "/project" },
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-background text-[15.7px] leading-[1.64] tracking-[-0.025em] text-foreground [font-family:var(--font-geist)] max-[480px]:text-[15.5px]">
      <main
        id="main"
        className="mx-auto w-[min(800px,calc(100%-50px))] pt-24.75 pb-40 max-[700px]:pt-13.5"
      >
        <header className="mb-9.75">
          <Link
            href="/"
            className="mb-7 inline-block text-xs text-muted-foreground"
          >
            ← back home
          </Link>
          <p className="mb-3 text-[10px] tracking-[.14em] text-muted-foreground uppercase [font-family:var(--font-geist-mono)]">
            The collection / {String(projects.length).padStart(2, "0")} projects
          </p>
          <h1 className="text-[clamp(32px,6vw,48px)] leading-[1.15] font-medium tracking-[-.055em]">
            Things I&apos;ve built.
          </h1>
          <p className="mt-3 max-w-130 text-sm text-muted-foreground">
            A collection of things I&apos;ve built, from open-source tools to
            full-stack and mobile products.
          </p>
        </header>
        <ProjectCollection projects={projects} />
        <Link
          href="/"
          className="ui-nudge mt-11.5 inline-block text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          ← back home
        </Link>
      </main>
      <PortfolioDock />
    </div>
  );
}
