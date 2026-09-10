import Image from "next/image";
import { experiences } from "../data/experience";
import Heading from "../ui/Heading";
import Link from "next/link";

export default function Professional() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mb-20 pt-8 sm:mb-28"
    >
      <Heading label1={"02 Experience"} label2={"work in production"} />
      {experiences.map((experience) => (
        <article
          key={`${experience.company}-${experience.role}`}
          className="group/experience mb-12 mt-8 grid gap-8 border-b border-paper-border pb-12 transition-colors duration-300 sm:mb-16 sm:mt-10 md:grid-cols-12 md:border-b-0 md:pb-0"
        >
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-4">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={48}
                height={48}
                className="border border-paper-border bg-bg-cream-light object-cover transition-transform duration-300 ease-out group-hover/experience:-rotate-2 group-hover/experience:scale-105"
              />
              <div>
                <Link
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block text-xl font-medium tracking-tight text-ink-text transition-colors duration-300 hover:text-accent-orange"
                >
                  {experience.company}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent-orange transition-all duration-300 ease-out group-hover:w-full"></span>
                </Link>
                <div className="text-ink-muted">{experience.role}</div>
              </div>
            </div>
            <div className="text-sm font-mono text-ink-muted pt-4 border-t border-paper-border/50">
              {experience.duration}
            </div>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-ink-muted md:col-span-7">
            <p>{experience.description}</p>
            <ul
              aria-label="Technologies used"
              className="flex flex-wrap gap-x-3 gap-y-2 border-t border-paper-border pt-4 font-mono text-[11px]"
            >
              {experience.skills.map((skill, index) => (
                <li
                  key={skill}
                  className="border border-transparent px-3 py-1 transition-colors duration-200 hover:border-paper-border-dark hover:bg-bg-cream-light hover:text-ink-text"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
