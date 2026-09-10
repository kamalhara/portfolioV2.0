"use client";

import dynamic from "next/dynamic";
import { FiArrowUpRight } from "react-icons/fi";

const GitHubCalendar = dynamic(() => import("react-github-calendar").then((module) => module.GitHubCalendar), { ssr: false });
const toolbox = [
  ["Languages", [["JavaScript", "primary"], ["TypeScript", "typed"]]],
  ["Product", [["React", "web"], ["Next.js", "full stack"], ["React Native", "mobile"], ["Expo", "native"]]],
  ["Systems", [["Node.js", "runtime"], ["Express", "apis"], ["Firebase", "realtime"], ["PostgreSQL", "sql"]]],
  ["Operations", [["Clerk", "identity"], ["Cloudinary", "media"], ["Trigger.dev", "jobs"], ["Sentry", "observability"]]],
];

export default function GithubGraph() {
  return (
    <section id="activity" aria-labelledby="activity-title" className="mb-24 border-t border-paper-border pt-8">
      <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted"><h2 id="activity-title" className="font-normal">04 Activity</h2><span>evidence, not claims</span></div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-6"><div className="flex items-start justify-between"><div><h3 className="text-2xl font-medium tracking-tight">GitHub activity</h3><p className="mt-0.5 font-serif text-sm italic text-ink-muted">A small record of showing up.</p></div><a href="https://github.com/kamalhara" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted hover:text-ink-text">GitHub <FiArrowUpRight /></a></div><div className="overflow-x-auto border border-paper-border bg-bg-cream-light/70 p-4 text-ink-muted"><GitHubCalendar username="kamalhara" colorScheme="light" theme={{ light: ["#ebe8e1", "#d9d5cb", "#c4c0b4", "#97948a", "#3a3935"] }} blockSize={10} blockMargin={3} blockRadius={1} fontSize={12} /></div></div>
        <div id="skills" className="space-y-6 lg:col-span-6"><div><h3 className="text-2xl font-medium tracking-tight">Toolbox</h3><p className="mt-0.5 font-serif text-sm italic text-ink-muted">What I reach for.</p></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{toolbox.map(([title, items], index) => <article key={title}><header className="mb-2.5 flex items-center justify-between border-b border-paper-border pb-1 font-mono text-[11px] text-ink-muted"><span>{String(index + 1).padStart(2, "0")} {title}</span><span>{String(items.length).padStart(2, "0")}</span></header><ul className="space-y-1.5 font-mono text-xs">{items.map(([name, use]) => <li key={name} className="flex items-center justify-between"><strong className="font-medium">{name}</strong><small className="text-[10px] text-ink-faint">{use} →</small></li>)}</ul></article>)}</div></div>
      </div>
    </section>
  );
}
