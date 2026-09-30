import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/project";
import PortfolioDock from "@/app/components/Dock";
import ProjectTypeBadge from "@/app/components/ProjectTypeBadge";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  const images = project.cover
    ? [{ url: project.cover, alt: `${project.title} interface preview` }]
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

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background text-[15.7px] leading-[1.64] tracking-[-0.025em] text-foreground [font-family:var(--font-geist)] max-[480px]:text-[15.5px]">
      <main id="main" className="mx-auto w-[min(800px,calc(100%-50px))] pt-24.75 pb-40 max-[700px]:pt-13.5">
        <article>
          <header>
            <Link
              href="/project"
              className="mb-7 inline-block text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              ← all projects
            </Link>
            <div className="mb-2">
              <ProjectTypeBadge type={project.type} />
            </div>
            <h1 className="text-[clamp(32px,6vw,60px)] leading-[1.15] font-medium tracking-[-.06em]">
              {project.title}
            </h1>
            <p className="mt-2.5 max-w-175 text-muted-foreground">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a
                className="underline underline-offset-4"
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source ↗
              </a>
              {project.live && (
                <a
                  className="underline underline-offset-4"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site ↗
                </a>
              )}
            </div>
          </header>

          {project.cover && (
            <figure className="relative mt-10.75 h-95 overflow-hidden rounded-[15px] border border-border bg-card max-[700px]:h-75 max-[480px]:h-57.5">
              <Image
                src={project.cover}
                alt={`${project.title} interface preview`}
                fill
                preload
                sizes="(max-width: 800px) 100vw, 800px"
                className={
                  project.coverFit === "contain"
                    ? "object-contain"
                    : "object-cover object-top"
                }
              />
            </figure>
          )}

          <section className="mt-13.5">
            <h2 className="mb-3 text-base font-medium">What it does</h2>
            <p className="text-muted-foreground">{project.overview}</p>
          </section>
          <section className="mt-13.5">
            <h2 className="mb-3 text-base font-medium">Built with</h2>
            <p className="text-muted-foreground">{project.technologies}</p>
          </section>
          <section className="mt-13.5">
            <h2 className="mb-3 text-base font-medium">Core features</h2>
            <ul>
              {project.keyFeatures.map((feature) => (
                <li
                  className="border-b border-border py-2.5 text-muted-foreground"
                  key={feature}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </section>
          {project.screenshot?.length > 0 && (
            <section className="mt-13.5">
              <h2 className="mb-3 text-base font-medium">Screens</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
                {project.screenshot.map((src, index) => (
                  <Image
                    className="h-auto w-full rounded-xl border border-border"
                    key={src}
                    src={`/${src}`}
                    alt={`${project.title} screen ${index + 1}`}
                    width={400}
                    height={800}
                    sizes="(max-width: 480px) 45vw, 200px"
                  />
                ))}
              </div>
            </section>
          )}
          <Link
            href="/project"
            className="mt-13.5 inline-block text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            ← back to projects
          </Link>
        </article>
      </main>
      <PortfolioDock />
    </div>
  );
}
