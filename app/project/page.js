import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ProjectArchive from "@/app/components/ProjectArchive";
import { projects } from "@/app/data/project";

export const metadata = {
  title: "Project archive",
  description: "Web, mobile, and backend projects built by software engineer Kamalveer Singh.",
  alternates: { canonical: "/project" },
};

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="standalone-main">
        <header className="archive-hero">
          <div className="chapter-heading"><h2>Project index</h2><p>2019 — 2026</p></div>
          <div><h1>Everything I&apos;ve shipped.</h1><p>Mobile products, web platforms, and backend systems—indexed by the problem each one was built to solve.</p></div>
        </header>
        <ProjectArchive projects={projects} />
      </main>
      <Footer />
    </>
  );
}
