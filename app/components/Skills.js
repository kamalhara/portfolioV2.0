import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="site-shell section-rule"
    >
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="section-label">03 / Capabilities</p>
          <h2 id="skills-title" className="section-title mt-5">
            The tools change. The craft stays.
          </h2>
          <p className="body-copy mt-6 max-w-md">
            My strongest work sits where interface decisions meet product logic:
            thoughtful frontends backed by dependable APIs.
          </p>
        </div>

        <div className="border-t border-ink md:col-span-7">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="grid gap-4 border-b border-line py-5 sm:grid-cols-[3rem_10rem_1fr] sm:items-start"
              >
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Icon className="text-blue" aria-hidden="true" />
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm leading-6 text-muted">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
