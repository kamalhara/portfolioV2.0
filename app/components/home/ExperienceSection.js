import Image from "next/image";
import { experiences } from "@/app/data/experience";
import { RiArrowRightUpLongLine } from "react-icons/ri";

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
          <summary className="flex cursor-pointer list-none items-start gap-4 transition-opacity duration-200 hover:opacity-75 max-[480px]:gap-3 [&::-webkit-details-marker]:hidden">
            <Image
              src={experience.logo}
              alt={`${experience.company} company logo`}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-xl border border-border object-cover"
            />
            <span className="min-w-0 flex-1">
              <span>{experience.role}</span>{" "}
              <span className="text-muted-foreground">·</span>{" "}
              {experience.company}
              <small className="block text-[13px] text-muted-foreground">
                {experience.duration}
              </small>
            </span>
            <span className="inline-flex items-center gap-3 whitespace-nowrap text-[13px] text-muted-foreground max-[480px]:text-[11px]">
              Remote
              <span
                className="text-lg leading-none transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                ⌄
              </span>
            </span>
          </summary>
          <div className="content-enter ml-15 max-w-147.5 pt-5 text-sm leading-[1.8] text-muted-foreground max-[480px]:ml-0">
            <p>{experience.description}</p>
            {experience.details && <p className="mt-3">{experience.details}</p>}
            {experience.highlights?.length > 0 && (
              <ul className="mt-4 grid gap-2 border-t border-border pt-4">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
            <ul
              aria-label="Technologies used at Talmee"
              className="mt-5 flex flex-wrap gap-2"
            >
              {experience.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-border bg-card px-2.5 py-0.5 text-[11px] [font-family:var(--font-geist-mono)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <a
              className="mt-3 inline-block text-foreground underline underline-offset-4 "
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {experience.company}
            </a>
          </div>
        </details>
      ))}
    </section>
  );
}
