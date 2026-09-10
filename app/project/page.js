import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ProjectArchive from "@/app/components/ProjectArchive";
import { projects } from "@/app/data/project";

export const metadata = { title: "Project archive", description: "Web, mobile, and backend projects built by software engineer Kamalveer Singh.", alternates: { canonical: "/project" } };

export default function ProjectPage() {
  return (
    <><Navbar /><main id="main" className="mx-auto max-w-[1040px] px-6 pt-12 pb-24 sm:px-10 lg:px-12"><header><div className="flex items-center justify-between border-b border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted"><h2 className="font-normal">Project index</h2><p>2019 — 2026</p></div><div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2 md:items-end"><h1 className="max-w-[8ch] text-6xl leading-[.88] font-medium tracking-[-.07em] md:text-8xl">Everything I&apos;ve shipped.</h1><p className="font-serif text-xl leading-relaxed italic text-ink-muted">Mobile products, web platforms, and backend systems—indexed by the problem each one was built to solve.</p></div></header><ProjectArchive projects={projects} /></main><Footer /></>
  );
}
