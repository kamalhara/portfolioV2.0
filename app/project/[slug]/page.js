import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { projects } from "@/app/data/project";
import IPhoneFrame from "@/app/ui/IPhoneFrame";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";

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
    <>
      <Navbar />
      <main
        id="main"
        className="mx-auto max-w-260 px-6 pt-12 pb-24 sm:px-10 lg:px-12"
      >
        <article>
          <header>
            <div className="flex items-center justify-between border-b border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <span className="flex items-center gap-2 ">
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:text-ink-text transition-colors duration-200 group"
                >
                  <FiArrowLeft />
                  Home
                </Link>
              </span>
              <p>{project.type}</p>
            </div>
            <nav
              aria-label="Breadcrumb"
              className="mt-4 flex gap-2 font-mono text-[10px] uppercase text-ink-faint"
            >
              <Link href="/">Index</Link>
              <span>/</span>
              <Link href="/project">Work</Link>
              <span>/</span>
              <span>{project.title}</span>
            </nav>
            <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  Selected project
                </p>
                <h1 className="mb-5 text-6xl leading-[.82] font-medium tracking-[-.075em] sm:text-7xl md:text-9xl">
                  {project.title}
                </h1>
                <em className="block max-w-2xl font-serif text-lg leading-relaxed italic text-ink-muted">
                  {project.description}
                </em>
              </div>
              <div className="flex gap-2">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-ink-text bg-ink-text px-4 text-xs font-semibold text-bg-cream"
                >
                  <FiGithub /> Source
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 border border-paper-border-dark px-4 text-xs font-semibold"
                  >
                    Live site <FiArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </header>
          {project.cover && (
            <div className="relative aspect-16/8 overflow-hidden border border-paper-border bg-bg-cream-light">
              <Image
                src={project.cover}
                alt={`${project.title} interface preview`}
                fill
                priority
                sizes="(max-width: 1050px) 100vw, 960px"
                className="object-cover object-top"
              />
            </div>
          )}
          <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-[.72fr_1.3fr] md:gap-20">
            <aside>
              <dl className="border-t border-paper-border">
                {project.frontEnd && (
                  <div className="border-b border-paper-border py-4">
                    <dt className="font-mono text-[10px] uppercase text-ink-faint">
                      Interface
                    </dt>
                    <dd className="mt-2 text-xs leading-relaxed">
                      {project.frontEnd}
                    </dd>
                  </div>
                )}
                {project.backEnd && (
                  <div className="border-b border-paper-border py-4">
                    <dt className="font-mono text-[10px] uppercase text-ink-faint">
                      System
                    </dt>
                    <dd className="mt-2 text-xs leading-relaxed">
                      {project.backEnd}
                    </dd>
                  </div>
                )}
                <div className="border-b border-paper-border py-4">
                  <dt className="font-mono text-[10px] uppercase text-ink-faint">
                    Stack
                  </dt>
                  <dd className="mt-2 text-xs leading-relaxed">
                    {project.technologies}
                  </dd>
                </div>
              </dl>
            </aside>
            <div>
              <section>
                <p className="mb-4 font-mono text-[11px] uppercase text-ink-faint">
                  01 / Context
                </p>
                <h2 className="mb-5 text-3xl font-medium tracking-tight">
                  What it does
                </h2>
                <p className="text-sm leading-7 text-ink-muted">
                  {project.overview}
                </p>
              </section>
              <section className="mt-16">
                <p className="mb-4 font-mono text-[11px] uppercase text-ink-faint">
                  02 / Product surface
                </p>
                <h2 className="mb-5 text-3xl font-medium tracking-tight">
                  Core features
                </h2>
                <ol className="border-t border-paper-border">
                  {project.keyFeatures.map((feature, index) => (
                    <li
                      key={feature}
                      className="grid grid-cols-[2.75rem_1fr] border-b border-paper-border py-4 text-sm leading-relaxed"
                    >
                      <span className="font-mono text-[10px] text-accent-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
          {project.screenshot && (
            <section
              aria-labelledby="screens-title"
              className="border-t border-paper-border py-16"
            >
              <div className="flex items-center justify-between border-b border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                <h2 id="screens-title" className="font-normal">
                  Interface
                </h2>
                <p>
                  {String(project.screenshot.length).padStart(2, "0")} screens
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                {project.screenshot.map((src, index) => {
                  const img = (
                    <Image
                      src={`/${src}`}
                      alt={`${project.title} screen ${index + 1}`}
                      width={400}
                      height={800}
                      className="h-auto w-full"
                    />
                  );
                  return (
                    <div key={src}>
                      {project.slug === "spotus" ? (
                        <IPhoneFrame>{img}</IPhoneFrame>
                      ) : (
                        <figure className="overflow-hidden border border-paper-border bg-bg-cream-light">
                          {img}
                        </figure>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          <Link
            href="/project"
            className="inline-flex items-center gap-2 border-b border-ink-text pb-1 text-xs font-semibold"
          >
            <FiArrowLeft /> Back to project index
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
