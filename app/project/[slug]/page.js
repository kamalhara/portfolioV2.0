import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { projects } from "@/app/data/project";
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
      <main id="main">
        <article>
          <header className="site-shell py-10 md:py-20">
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-xs text-muted"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-blue">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/project" className="hover:text-blue">
                    Projects
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">
                  {project.title}
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="section-label">{project.type}</p>
                <h1 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                  {project.title}
                </h1>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  <FiGithub aria-hidden="true" /> Source
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary"
                  >
                    Live site <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {project.cover && (
            <div className="relative aspect-[16/8] w-full overflow-hidden border-y border-ink bg-sheet">
              <Image
                src={project.cover}
                alt={`${project.title} interface preview`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          )}

          <div className="site-shell grid gap-12 py-14 md:grid-cols-12 md:py-24">
            <aside className="md:col-span-4">
              <dl className="border-t border-ink">
                {project.frontEnd && (
                  <div className="border-b border-line py-4">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                      Frontend
                    </dt>
                    <dd className="mt-2 leading-6">{project.frontEnd}</dd>
                  </div>
                )}
                {project.backEnd && (
                  <div className="border-b border-line py-4">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                      Backend
                    </dt>
                    <dd className="mt-2 leading-6">{project.backEnd}</dd>
                  </div>
                )}
                <div className="border-b border-line py-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    Stack
                  </dt>
                  <dd className="mt-2 leading-6">{project.technologies}</dd>
                </div>
              </dl>
            </aside>

            <div className="md:col-span-7 md:col-start-6">
              <section aria-labelledby="overview-title">
                <p className="section-label">Overview</p>
                <h2
                  id="overview-title"
                  className="mt-5 text-3xl font-semibold tracking-[-0.04em]"
                >
                  What it does
                </h2>
                <p className="body-copy mt-5">{project.overview}</p>
              </section>

              <section aria-labelledby="features-title" className="mt-14">
                <p className="section-label">Core features</p>
                <h2 id="features-title" className="sr-only">
                  Core features
                </h2>
                <ol className="mt-5 border-t border-ink">
                  {project.keyFeatures.map((feature, index) => (
                    <li
                      key={feature}
                      className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4 leading-7"
                    >
                      <span className="font-mono text-xs text-blue">
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
              aria-labelledby="screenshots-title"
              className="border-t border-ink bg-ink py-14 text-white md:py-24"
            >
              <div className="site-shell">
                <p className="font-mono text-xs uppercase tracking-wider text-white/60">
                  Interface
                </p>
                <h2 id="screenshots-title" className="section-title mt-5">
                  Screens from the product.
                </h2>
                <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                  {project.screenshot.map((src, index) => (
                    <div
                      key={src}
                      className="relative aspect-[9/17] overflow-hidden border border-white/25 bg-white/5"
                    >
                      <Image
                        src={`/${src}`}
                        alt={`${project.title} screen ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className="site-shell py-10">
            <Link href="/project" className="text-link">
              <FiArrowLeft aria-hidden="true" /> Back to all projects
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
