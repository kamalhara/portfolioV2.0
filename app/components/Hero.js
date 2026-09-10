import Link from "next/link";
import { FiArrowDownRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import GridBackground from "./GridBackground";

export default function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-ink"
    >
      <GridBackground />
      <div className="site-shell relative grid min-h-[calc(100svh-4.5rem)] grid-cols-1 content-between py-8 md:grid-cols-12 md:py-12">
        <div className="flex items-start justify-between md:col-span-12">
          <p className="section-label">Kamalveer Singh</p>
          <p className="hidden max-w-48 text-right font-mono text-xs leading-5 text-muted sm:block">
            Web systems
            <br />
            Mobile products
          </p>
        </div>

        <div className="relative z-10 py-12 md:col-span-10 md:py-16">
          <h1 id="hero-title" className="display-title">
            I build software people can rely on.
          </h1>
          <div className="mt-8 h-2 w-28 bg-orange" aria-hidden="true" />
        </div>

        <div className="relative z-10 grid gap-8 border-t border-ink pt-6 md:col-span-12 md:grid-cols-12">
          <p className="body-copy max-w-2xl md:col-span-7">
            I&apos;m a full-stack and mobile engineer working across React,
            Next.js, React Native, and Node.js. I care about clear interfaces,
            sound systems, and the details that make software feel finished.
          </p>

          <div className="flex flex-wrap items-start gap-3 md:col-span-5 md:justify-end">
            <Link href="#projects" className="button-primary">
              See selected work <FiArrowDownRight aria-hidden="true" />
            </Link>
            <a
              href="/kamalveer-singh-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Résumé <FiDownload aria-hidden="true" />
            </a>
            <a href="mailto:kamalhara7@gmail.com" className="button-secondary">
              Email <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
