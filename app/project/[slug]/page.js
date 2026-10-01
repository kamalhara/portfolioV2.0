import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/project";
import PortfolioDock from "@/app/components/Dock";
import ProjectTypeBadge from "@/app/components/ProjectTypeBadge";
import { ArrowUpRight, CodeXml, Layers, Server } from "lucide-react";
import ProjectPreview from "@/app/components/projects/ProjectPreview";
import ProjectGallery from "@/app/components/projects/ProjectGallery";
import ProjectCard from "@/app/components/projects/ProjectCard";
import AskAboutProject from "@/app/components/projects/AskAboutProject";
import ProjectSectionNav from "@/app/components/projects/ProjectSectionNav";
import {
  getProjectCategory,
  getProjectImages,
} from "@/app/components/projects/projectMedia";
import { projectSummaries } from "@/app/data/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  const preview = getProjectImages(project)[0];
  const images = preview
    ? [{ url: preview, alt: `${project.title} interface preview` }]
    : [];
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: {
      title: `${project.title} — Kamalveer Singh`,
      description: project.description,
      url: `/project/${project.slug}`,
      images,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: `${project.title} — Kamalveer Singh`,
      description: project.description,
      images,
    },
  };
}

function StackPanel({ label, icon: Icon, content }) {
  return (
    <div className="rounded-[15px] border border-border bg-card p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
        <Icon size={15} className="text-muted-foreground" />
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {content.split(",").map((tech) => (
          <span
            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
            key={tech.trim()}
          >
            {tech.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const images = getProjectImages(project);
  const related = projects
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(getProjectCategory(b) === getProjectCategory(project)) -
        Number(getProjectCategory(a) === getProjectCategory(project)),
    )
    .slice(0, 2);
  const sections = [
    "Overview",
    "Stack",
    "Features",
    ...(images.length ? ["Screens"] : []),
  ];

  return (
    <div className="min-h-screen bg-background text-[15.7px] leading-[1.64] tracking-[-0.025em] text-foreground [font-family:var(--font-geist)] max-[480px]:text-[15.5px]">
      <main
        id="main"
        className="mx-auto w-[min(800px,calc(100%-50px))] pt-24.75 pb-40 max-[700px]:pt-13.5"
      >
        <article className="project-detail">
          <header>
            <Link
              href="/project"
              className="mb-8 inline-block text-xs text-muted-foreground"
            >
              ← all projects
            </Link>
            <div className="mb-4">
              <ProjectTypeBadge type={project.type} />
            </div>
            <h1 className="max-w-175 text-[clamp(32px,6vw,54px)] leading-[1.15] font-medium tracking-[-.055em]">
              {project.title}
            </h1>
            <p className="mt-4 max-w-150 text-base leading-[1.65] text-muted-foreground">
              {projectSummaries[slug] ?? project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 text-xs">
              {project.live && (
                <a
                  className="project-action project-action-primary"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.type === "Open Source"
                    ? "Documentation"
                    : "Visit project"}
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.code && (
                <a
                  className="project-action"
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeXml size={14} /> Source code
                  <ArrowUpRight size={13} />
                </a>
              )}
              <AskAboutProject title={project.title} />
            </div>
          </header>

          <figure className="mt-9 overflow-hidden rounded-[15px] border border-border bg-card p-2">
            <ProjectPreview project={project} large preload />
          </figure>
          <ProjectSectionNav sections={sections} />

          <section id="overview" className="project-detail-section">
            <p className="project-section-kicker">01 / The idea</p>
            <h2 className="mb-4 text-xl font-medium tracking-[-.035em]">
              Overview
            </h2>
            <p className="text-sm leading-[1.8] text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">
              {project.overview}
            </p>
          </section>
          <section id="stack" className="project-detail-section">
            <p className="project-section-kicker">02 / Under the hood</p>
            <h2 className="mb-5 text-xl font-medium tracking-[-.035em]">
              Built with
            </h2>
            <div
              className={`grid gap-3 ${project.frontEnd && project.backEnd ? "min-[600px]:grid-cols-2" : ""}`}
            >
              {project.frontEnd && (
                <StackPanel
                  label="Frontend"
                  icon={Layers}
                  content={project.frontEnd}
                />
              )}
              {project.backEnd && (
                <StackPanel
                  label={
                    project.type === "Open Source"
                      ? "Tooling & documentation"
                      : "Backend"
                  }
                  icon={Server}
                  content={project.backEnd}
                />
              )}
            </div>
            <p className="mt-4 text-xs leading-[1.8] text-muted-foreground">
              Technologies: {project.technologies}
            </p>
          </section>
          <section id="features" className="project-detail-section">
            <p className="project-section-kicker">03 / In the details</p>
            <h2 className="mb-5 text-xl font-medium tracking-[-.035em]">
              Core features
            </h2>
            <ol className="grid gap-3 min-[600px]:grid-cols-2">
              {project.keyFeatures.map((feature, index) => (
                <li
                  className="flex gap-3 rounded-[15px] border border-border bg-card p-4"
                  key={feature}
                  style={{ "--reveal-delay": `${(index % 2) * 60}ms` }}
                >
                  <span className="pt-0.5 text-[10px] text-brand [font-family:var(--font-geist-mono)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-[1.7] text-muted-foreground">
                    {feature}
                  </p>
                </li>
              ))}
            </ol>
          </section>
          {images.length > 0 && (
            <section id="screens" className="project-detail-section">
              <p className="project-section-kicker">04 / A closer look</p>
              <h2 className="mb-5 text-xl font-medium tracking-[-.035em]">
                Screens
              </h2>
              <ProjectGallery project={project} />
            </section>
          )}
        </article>

        <section
          className="mt-16 border-t border-border pt-8"
          aria-labelledby="related-heading"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 id="related-heading" className="text-base font-medium">
              More to explore
            </h2>
            <Link href="/project" className="text-xs text-muted-foreground">
              All projects ↗
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
            {related.map((item) => (
              <ProjectCard project={item} key={item.slug} />
            ))}
          </div>
        </section>
      </main>
      <PortfolioDock />
    </div>
  );
}
