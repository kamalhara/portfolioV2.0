import Image from "next/image";
import { experiences } from "../data/experience";

export default function Professional() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-y border-ink bg-ink text-white"
    >
      <div className="site-shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
              02 / Experience
            </p>
            <h2 id="experience-title" className="section-title mt-5">
              Building in the real world.
            </h2>
          </div>

          <div className="md:col-span-7">
            {experiences.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className="border-t border-white/40 py-6 first:border-t-0 first:pt-0"
              >
                <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
                  <Image
                    src={experience.logo}
                    alt=""
                    width={72}
                    height={72}
                    className="h-18 w-18 border border-white/30 object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                          {experience.role}
                        </h3>
                        <p className="mt-1 text-orange">
                          {experience.company.trim()}
                        </p>
                      </div>
                      <p className="font-mono text-xs text-white/60">
                        {experience.duration}
                      </p>
                    </div>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
                      {experience.description}
                    </p>
                    <ul
                      className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-white/60"
                      aria-label="Technologies used"
                    >
                      {experience.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
