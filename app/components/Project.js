import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { mainProjects } from "../data/project";

const tones = {
  blue: "bg-blue text-white",
  orange: "bg-orange text-white",
  green: "bg-green text-white",
  ink: "bg-ink text-white",
};

export default function Project() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="site-shell section-rule"
    >
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="section-label">01 / Selected work</p>
          <h2 id="projects-title" className="section-title mt-5">
            Products, not just pixels.
          </h2>
        </div>
        <p className="body-copy md:col-span-4">
          A selection of web platforms, mobile applications, and backend
          systems—each built around a real use case.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {mainProjects.map((project, index) => (
          <Link
            href={`/project/${project.slug}`}
            key={project.slug}
            className={`group card-lift overflow-hidden border border-line bg-sheet no-underline ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            {project.cover ? (
              <div
                className={`relative overflow-hidden border-b border-line ${
                  index === 0 ? "aspect-16/7" : "aspect-16/10"
                }`}
              >
                <Image
                  src={project.cover}
                  alt={`${project.title} interface preview`}
                  fill
                  priority={index === 0}
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 1180px"
                      : "(max-width: 768px) 100vw, 580px"
                  }
                  className="project-image object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex aspect-16/10 items-center justify-center border-b border-line bg-ink p-8 text-white">
                <div className="w-full max-w-sm font-mono text-sm leading-8 text-white/70">
                  <p>
                    <span className="text-orange">GET</span> /api/v1/tours
                  </p>
                  <p>
                    <span className="text-green">POST</span> /api/v1/users/login
                  </p>
                  <p>
                    <span className="text-blue">PATCH</span> /api/v1/reviews/:id
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[1fr_auto]">
              <div>
                <span
                  className={`inline-block px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${tones[project.tone] ?? tones.ink}`}
                >
                  {project.type}
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-7 text-muted">
                  {project.description}
                </p>
              </div>
              <FiArrowUpRight
                className="mt-1 text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Link href="/project" className="text-link">
          Browse the full project archive <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
