import { skillCategories } from "@/app/data/skills";

export default function StackSection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="stack"
      aria-labelledby="stack-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="stack-heading"
      >
        Tech Stack
      </h2>
      <div className="grid gap-4.25">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="mb-1.5 text-[13px] text-muted-foreground">
              {category.title}
            </h3>
            <ul className="flex flex-wrap gap-1.75">
              {category.skills.map((skill) => (
                <li
                  className="rounded-full border border-border bg-card hover:text-gray-200 px-2.75 py-0.75 text-xs leading-[1.6] whitespace-nowrap text-muted-foreground [font-family:var(--font-geist-mono)] flex items-center justify-center gap-1.25 transition-[transform,color] duration-200 motion-safe:hover:-translate-y-0.5"
                  key={skill.name}
                >
                  {skill.icon}
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
