import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ProjectArchive from "@/app/components/ProjectArchive";
import { projects } from "@/app/data/project";

export const metadata = {
  title: "Project archive",
  description:
    "Web, mobile, and backend projects built by software engineer Kamalveer Singh.",
  alternates: { canonical: "/project" },
  openGraph: {
    title: "Project archive — Kamalveer Singh",
    description:
      "A collection of web, mobile, and backend projects by Kamalveer Singh.",
    url: "/project",
  },
};

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="site-shell py-14 md:py-24">
        <p className="section-label">Project archive</p>
        <h1 className="section-title mt-5">
          Eight builds. Different problems.
        </h1>
        <p className="body-copy mt-6 max-w-2xl">
          Browse the full collection by format or search for a technology. Each
          project page covers the stack, decisions, and core features.
        </p>
        <ProjectArchive projects={projects} />
      </main>
      <Footer />
    </>
  );
}
