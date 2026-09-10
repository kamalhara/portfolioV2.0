import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ProjectArchive from "@/app/components/ProjectArchive";
import ScrollReveal from "@/app/components/ScrollReveal";
import { projects } from "@/app/data/project";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Project archive",
  description:
    "Web, mobile, and backend projects built by software engineer Kamalveer Singh.",
  alternates: { canonical: "/project" },
};

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="mx-auto max-w-260 px-4 pt-8 pb-20 sm:px-8 sm:pt-12 sm:pb-24 lg:px-12"
      >
        <ScrollReveal>
          <header>
            <div className="flex items-center justify-between border-b border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <span className="flex items-center gap-2">
                <Link
                  href="/"
                  className="group flex items-center gap-2 transition-colors duration-200 hover:text-ink-text"
                >
                  <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
                  Home
                </Link>
              </span>
              <h2 className="font-normal">Project index</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 py-12 sm:py-16 md:grid-cols-2 md:items-end">
              <h1 className="max-w-[8ch] text-[clamp(3.25rem,14vw,6rem)] leading-[.88] font-medium tracking-[-.07em]">
                Everything I&apos;ve shipped.
              </h1>
              <p className="font-serif text-lg leading-relaxed italic text-ink-muted sm:text-xl">
                Mobile products, web platforms, and backend systems—indexed by
                the problem each one was built to solve.
              </p>
            </div>
          </header>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <ProjectArchive projects={projects} />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
