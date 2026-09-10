import Link from "next/link";
import { mainProjects } from "../data/project";

export default function Project() {
  return (
    <section id="work" aria-labelledby="work-title" className="mb-28 pt-8">
      <div className="mb-4 flex items-center justify-between border-b border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted"><h2 id="work-title" className="font-normal">01 Selected work</h2><span>{String(mainProjects.length).padStart(2, "0")} featured</span></div>
      <ol className="divide-y divide-paper-border border-b border-paper-border">
        {mainProjects.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/project/${project.slug}`} className="group block px-2 py-7 transition-colors duration-150 hover:bg-[#f0eee8]">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                <div className="flex items-baseline gap-4"><span className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, "0")}</span><div><span className="text-2xl font-semibold tracking-tight underline-offset-8 group-hover:underline sm:text-3xl">{project.title}</span><span className="ml-1 inline-block font-mono text-xl text-ink-muted transition-transform group-hover:translate-x-1">→</span><p className="mt-1 max-w-xl font-serif text-base leading-snug italic text-ink-muted sm:text-lg">{project.description}</p></div></div>
                <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-ink-muted md:mt-0 md:max-w-[42%] md:text-right"><span className="inline-flex items-start gap-1.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-orange" />{project.technologies}</span></div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-5 mb-8 font-serif text-sm italic text-ink-muted">Each project opens as an engineering dossier—the problem, the decisions, the architecture, and what held up in practice.</p>
      <Link href="/project" className="group block border border-paper-border p-6 transition-colors hover:bg-[#efece5] sm:p-7"><span className="flex items-center justify-between"><strong className="text-xl tracking-tight sm:text-2xl">Explore all projects</strong><span className="font-mono text-xl text-ink-muted transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-orange">↗</span></span></Link>
    </section>
  );
}
