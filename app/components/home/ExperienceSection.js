import { experiences } from "@/app/data/experience";
import { portfolio } from "@/app/data/portfolio";

export default function ExperienceSection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="experience-heading"
      >
        Experience
      </h2>
      {experiences.map((experience) => (
        <details className="group" key={experience.company}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 transition-opacity duration-200 hover:opacity-75 [&::-webkit-details-marker]:hidden">
            <span>
              <span>{experience.role}</span>{" "}
              <span className="text-muted-foreground">·</span>{" "}
              {experience.company}
              <small className="block text-[13px] text-muted-foreground">
                {experience.duration}
              </small>
            </span>
            <span className="inline-flex items-center gap-3 whitespace-nowrap text-[13px] text-muted-foreground max-[480px]:text-[11px]">
              {portfolio.location}
              <span
                className="text-lg leading-none transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                ⌄
              </span>
            </span>
          </summary>
          <div className="content-enter max-w-147.5 pt-4 text-sm text-muted-foreground">
            <p>{experience.description}</p>
            <p className="mt-2.5 text-xs text-muted-foreground/75">
              {experience.skills.join(" · ")}
            </p>
            <a
              className="mt-3 inline-block text-foreground underline underline-offset-4"
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
  );
}
