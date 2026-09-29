import Image from "next/image";
import Link from "next/link";
import { projects, mainProjects } from "@/app/data/project";
import { experiences } from "@/app/data/experience";
import { skillCategories } from "@/app/data/skills";
import { portfolio, projectSummaries } from "@/app/data/portfolio";
import PortfolioWidgets, { EmailCopy } from "../ui/Widgets";
import PortfolioActivity from "./Activity";
import PortfolioDock from "./Dock";
import {
  badge,
  card,
  container,
  listLink,
  listTitle,
  moreLink,
  muted,
  section,
  sectionTitle,
  shell,
} from "./portfolioStyles";

const previewProjects = mainProjects.slice(0, 3);
const interfaceProjects = ["stateglyph", "productify", "spotus"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean);

export default function Home() {
  return (
    <div className={shell}>
      <a
        className="fixed top-3 left-3 z-100 -translate-y-[150%] bg-background px-3 py-2 text-(--rep-background) focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>
      <main id="main-content" className={container}>
        <header>
          <h1 className="text-[19.6px] leading-[1.4] font-medium tracking-[-0.035em]">
            {portfolio.name}
          </h1>
          <p className={muted}>{portfolio.role}</p>
          <div className="mt-7.5">
            <h2 className="text-[15.7px] leading-[1.6] font-medium">
              Currently
            </h2>
            <p className={`mt-1.75 ${muted}`}>{portfolio.currently}</p>
          </div>
          <EmailCopy />
        </header>

        <PortfolioWidgets />

        <section
          className={section}
          id="projects"
          aria-labelledby="projects-heading"
        >
          <h2 className={sectionTitle} id="projects-heading">
            Projects
          </h2>
          <ul className="grid gap-4.5">
            {previewProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/project/${project.slug}`} className={listLink}>
                  <span className={listTitle}>
                    {project.title}
                    <span className={badge}>{project.type}</span>
                  </span>
                  <span
                    className={`block transition-colors group-hover:text-(--rep-text) ${muted}`}
                  >
                    {projectSummaries[project.slug] ?? project.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/project" className={moreLink}>
            more projects
          </Link>
        </section>

        <section
          className={section}
          id="experience"
          aria-labelledby="experience-heading"
        >
          <h2 className={sectionTitle} id="experience-heading">
            Experience
          </h2>
          {experiences.map((experience) => (
            <details className="group" key={experience.company}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span>{experience.role}</span>{" "}
                  <span className={muted}>·</span> {experience.company}
                  <small className={`block text-[13px] ${muted}`}>
                    {experience.duration}
                  </small>
                </span>
                <span
                  className={`inline-flex items-center gap-3 whitespace-nowrap text-[13px] max-[480px]:text-[11px] ${muted}`}
                >
                  {portfolio.location}
                  <span
                    className="text-lg leading-none transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </span>
              </summary>
              <div className={`max-w-147.5 pt-4 text-sm ${muted}`}>
                <p>{experience.description}</p>
                <p className="mt-2.5 text-xs text-(--rep-soft)">
                  {experience.skills.join(" · ")}
                </p>
                <a
                  className="mt-3 inline-block text-(--rep-text) underline underline-offset-4"
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {experience.company} ↗
                </a>
              </div>
            </details>
          ))}
        </section>

        <section className={section} id="about" aria-labelledby="about-heading">
          <h2 className={sectionTitle} id="about-heading">
            About
          </h2>
          <p className="max-w-167.5">{portfolio.about}</p>
          <p className={`mt-3.25 max-w-167.5 ${muted}`}>
            My recent work spans mobile products, open-source components,
            authentication, real-time messaging, maps, and the services behind
            them.
          </p>
          <a
            href={portfolio.resume}
            className={moreLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            view résumé
          </a>
        </section>

        <section className={section} id="stack" aria-labelledby="stack-heading">
          <h2 className={sectionTitle} id="stack-heading">
            Tech Stack
          </h2>
          <div className="grid gap-4.25">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <h3 className={`mb-1.5 text-[13px] ${muted}`}>
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-1.75">
                  {category.skills.map(([name]) => (
                    <li
                      className={`rounded-full border border-(--rep-border) bg-(--rep-surface) px-2.75 py-0.75 text-[11px] leading-[1.6] whitespace-nowrap [font-family:var(--font-geist-mono)] ${muted}`}
                      key={name}
                    >
                      {name.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          className={section}
          id="interfaces"
          aria-labelledby="interfaces-heading"
        >
          <h2 className={sectionTitle} id="interfaces-heading">
            Selected interfaces
          </h2>
          <div className="grid grid-cols-3 gap-4 max-[700px]:gap-2.5 max-[480px]:grid-cols-1 max-[480px]:gap-3">
            {interfaceProjects.map((project) => (
              <Link
                className={`group block min-w-0 p-1.5 pb-2 transition-colors hover:border-[#484848] hover:bg-(--rep-surface-hover) ${card}`}
                href={`/project/${project.slug}`}
                key={project.slug}
              >
                <span className="relative block h-38.25 overflow-hidden rounded-[10px] bg-[#131313] max-[700px]:h-27.5 max-[480px]:h-42.5">
                  <Image
                    src={project.cover ?? `/${project.screenshot[0]}`}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 600px) 90vw, 260px"
                    className="object-cover object-top-left grayscale transition duration-300 group-hover:scale-[1.025] group-hover:grayscale-0"
                  />
                </span>
                <span className="block px-1.25 pt-2 text-[13px]">
                  {project.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          className={section}
          id="activity"
          aria-labelledby="activity-heading"
        >
          <h2 className={sectionTitle} id="activity-heading">
            Activity
          </h2>
          <PortfolioActivity />
        </section>

        <footer className="mt-25 text-center max-[700px]:mt-21.25">
          <div
            className="h-[min(41vw,390px)] pr-[0.15em] text-[min(43vw,445px)] leading-[.8] font-extrabold tracking-[-.15em] text-[#363636] select-none max-[700px]:h-[35vw] max-[700px]:text-[41vw]"
            aria-hidden="true"
          >
            KS
          </div>
          <p className="mt-22.5 text-sm leading-[1.7] tracking-[.03em] [font-family:var(--font-geist-mono)] max-[700px]:mt-20">
            “{portfolio.signoff}”
          </p>
          <span
            className={`mt-1.75 block text-xs leading-[1.6] [font-family:var(--font-geist-mono)] ${muted}`}
          >
            — Kamalveer Singh
          </span>
          <nav
            className="mt-15 flex flex-wrap justify-center gap-4 text-xs [font-family:var(--font-geist-mono)]"
            aria-label="Social links"
          >
            <a
              className="text-(--rep-muted) underline underline-offset-4 hover:text-(--rep-text)"
              href={portfolio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-(--rep-muted) underline underline-offset-4 hover:text-(--rep-text)"
              href={`mailto:${portfolio.email}`}
            >
              Email
            </a>
            <a
              className="text-(--rep-muted) underline underline-offset-4 hover:text-(--rep-text)"
              href={portfolio.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-(--rep-muted) underline underline-offset-4 hover:text-(--rep-text)"
              href={portfolio.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
          </nav>
        </footer>
      </main>
      <PortfolioDock />
    </div>
  );
}
