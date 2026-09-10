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
  const images = project.cover ? [{ url: project.cover, alt: `${project.title} interface preview` }] : [];
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: { title: `${project.title} — Kamalveer Singh`, description: project.description, url: `/project/${project.slug}`, images },
    twitter: { card: images.length ? "summary_large_image" : "summary", title: `${project.title} — Kamalveer Singh`, description: project.description, images },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main id="main" className="standalone-main case-page">
        <article>
          <header className="case-hero">
            <div className="chapter-heading"><h2>Engineering dossier</h2><p>{project.type}</p></div>
            <nav aria-label="Breadcrumb" className="case-breadcrumb"><Link href="/">Index</Link><span>/</span><Link href="/project">Work</Link><span>/</span><span>{project.title}</span></nav>
            <div className="case-title-row">
              <div><p className="micro-label">Selected project</p><h1>{project.title}</h1><em>{project.description}</em></div>
              <div className="case-actions">
                <a href={project.code} target="_blank" rel="noopener noreferrer"><FiGithub aria-hidden="true" /> Source</a>
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live site <FiArrowUpRight aria-hidden="true" /></a>}
              </div>
            </div>
          </header>

          {project.cover ? (
            <div className="case-cover"><Image src={project.cover} alt={`${project.title} interface preview`} fill priority sizes="(max-width: 1050px) 100vw, 960px" className="object-cover object-top" /></div>
          ) : project.slug === "spotus" ? (
            <div className="spotus-case-visual">
              <Image src="/spotus-mark.svg" alt="Spotus mark" width={150} height={138} />
              <div><span>Nearby discovery</span><i>→</i><span>Live rooms</span><i>→</i><span>Request-based DMs</span></div>
              <p>Location becomes context—not identity.</p>
            </div>
          ) : null}

          <div className="case-body">
            <aside>
              <dl>
                {project.frontEnd && <div><dt>Interface</dt><dd>{project.frontEnd}</dd></div>}
                {project.backEnd && <div><dt>System</dt><dd>{project.backEnd}</dd></div>}
                <div><dt>Stack</dt><dd>{project.technologies}</dd></div>
              </dl>
            </aside>
            <div className="case-story">
              <section><p className="micro-label">01 / Context</p><h2>What it does</h2><p>{project.overview}</p></section>
              <section><p className="micro-label">02 / Product surface</p><h2>Core features</h2><ol>{project.keyFeatures.map((feature, index) => <li key={feature}><span>{String(index + 1).padStart(2, "0")}</span>{feature}</li>)}</ol></section>
            </div>
          </div>

          {project.screenshot && (
            <section className="case-screens" aria-labelledby="screens-title">
              <div className="chapter-heading"><h2 id="screens-title">Interface</h2><p>{String(project.screenshot.length).padStart(2, "0")} screens</p></div>
              <div>{project.screenshot.map((src, index) => <figure key={src}><Image src={`/${src}`} alt={`${project.title} screen ${index + 1}`} fill sizes="(max-width: 700px) 50vw, 220px" className="object-cover object-top" /></figure>)}</div>
            </section>
          )}
          <Link href="/project" className="case-back"><FiArrowLeft aria-hidden="true" /> Back to project index</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
