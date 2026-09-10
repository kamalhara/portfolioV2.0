import Image from "next/image";
import { experiences } from "../data/experience";

export default function Professional() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mb-28 pt-8">
      <div className="mb-8 flex items-center justify-between border-t border-paper-border pt-4 font-mono text-[11px] uppercase tracking-wider text-ink-muted"><h2 id="experience-title" className="font-normal">02 Experience</h2><span>work in production</span></div>
      {experiences.map((experience) => (
        <article key={`${experience.company}-${experience.role}`} className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5"><p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">Current role</p><h3 className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">{experience.role}</h3><div className="flex items-center gap-3 border-t border-paper-border pt-4"><Image src={experience.logo} alt="" width={44} height={44} className="border border-paper-border object-cover" /><span><strong className="block text-sm">{experience.company.trim()}</strong><small className="font-mono text-[10px] text-ink-muted">{experience.duration}</small></span></div></div>
          <div className="space-y-5 text-sm leading-relaxed text-ink-muted md:col-span-7"><p>{experience.description}</p><p>The role sits across product implementation, mobile performance, backend integration, and the reliability details users only notice when they fail.</p><ul aria-label="Technologies used" className="flex flex-wrap gap-x-4 gap-y-2 border-t border-paper-border pt-4 font-mono text-[11px]">{experience.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
        </article>
      ))}
    </section>
  );
}
