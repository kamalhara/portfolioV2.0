import Image from "next/image";
import { experiences } from "../data/experience";
import Heading from "../ui/Heading";
import Link from "next/link";

export default function Professional() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mb-28 pt-8"
    >
      <Heading label1={"02 Experience"} label2={"work in production"} />
      {experiences.map((experience) => (
        <article
          key={`${experience.company}-${experience.role}`}
          className="grid gap-8 md:grid-cols-12 mb-16 mt-10"
        >
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-4">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={48}
                height={48}
                className=" border border-paper-border object-cover bg-white"
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
                <li key={skill} className=" px-3 py-1 ">
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
