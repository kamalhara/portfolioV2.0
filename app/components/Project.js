import Link from "next/link";
import { mainProjects } from "../data/project";
import Heading from "../ui/Heading";

export default function Project() {
  return (
    <section id="work" aria-labelledby="work-title" className="mb-28 pt-8">
      <Heading
        label1="01 Selected work"
        label2={`0${mainProjects.length} featured`}
        border_y={false}
      />
      <ul className="mt-12">
        {mainProjects.map((project, index) => (
          <li
            key={project.slug}
            className="border-t-[1.5px] border-paper-border last:border-b-[1.5px]"
          >
            <Link
              href={`/project/${project.slug}`}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 py-9 no-underline outline-offset-8 transition-colors md:grid-cols-[3.5rem_1fr_1fr_6rem] md:gap-x-8 md:py-11"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[12px] text-ink-muted transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:text-accent-orange"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="col-start-2">
                <span className="block text-[clamp(1.9rem,4.6vw,2.5rem)] font-medium leading-[1.05] tracking-tight text-ink-text transition-transform duration-300 ease-out group-hover:translate-x-2">
                  {project.title}
                  <span
                    aria-hidden="true"
                    className="ml-3 inline-block font-serif text-[0.7em] italic text-ink-muted opacity-60 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent-orange group-hover:opacity-100"
                  >
                    →
                  </span>
                </span>
                <span className="mt-2 block max-w-[52ch] font-serif text-[15px] italic leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink-text md:text-[17px]">
                  {project.description}
                </span>
              </span>

              <span className="col-start-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-ink-muted opacity-70 transition-all duration-300 group-hover:text-ink-text group-hover:opacity-100 md:col-start-3 md:justify-self-start md:pt-2.5">
                <span
                  aria-hidden="true"
                  className={index === 0 ? "text-accent-orange" : ""}
                >
                  {index === 0 ? "●" : "○"}
                </span>
                {project.technologies}
              </span>

              <span className="col-start-2 hidden text-right font-mono text-[11px] text-ink-muted md:col-start-4 md:justify-self-end md:pt-2.5 group-hover:text-ink-text">
                2024
                {index === 0 && (
                  <span
                    aria-hidden="true"
                    className="mt-1 block text-[9px] uppercase tracking-widest text-ink-muted opacity-60 transition-colors duration-300 group-hover:text-accent-orange group-hover:opacity-100"
                  >
                    Featured
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-[52ch] font-serif text-[15px] italic leading-relaxed text-ink-muted">
        Each project opens as an engineering dossier — the problem, the
        decisions, the architecture, and what broke along the way.
      </p>
      <div>
        <Link
          href="/project"
          className="group mt-12 flex items-center justify-between gap-6 border-[1.5px] border-paper-border px-6 py-6 no-underline transition-all duration-300 ease-out hover:border-ink-text hover:bg-ink-text md:px-10 md:py-8"
        >
          <span className="text-[clamp(1.25rem,2.8vw,2.1rem)] font-medium leading-none tracking-tight text-ink-text transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-bg-cream">
            Explore all projects
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 font-serif text-[clamp(1.5rem,3vw,2.4rem)] italic leading-none text-accent-orange transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
