"use client";

import { useEffect, useState } from "react";

const chapters = [["00", "Intro", "start"], ["01", "Work", "work"], ["02", "Experience", "experience"], ["03", "About", "about"], ["04", "Activity", "activity"]];

export default function ChapterRail() {
  const [active, setActive] = useState("start");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-30% 0px -55%", threshold: [0, .2, .5] });
    chapters.forEach(([, , id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 select-none xl:block" aria-label="Page chapters">
      <ol className="space-y-2 font-mono text-[11px] uppercase tracking-wider">
        {chapters.map(([number, label, id]) => (
          <li key={id}><a href={`#${id}`} className={`flex items-center gap-2 py-0.5 transition-all hover:translate-x-0.5 hover:text-ink-text ${active === id ? "font-medium text-ink-text" : "text-ink-faint"}`}><span className={`h-px transition-all ${active === id ? "w-3 bg-accent-orange" : "w-2 bg-ink-faint/40"}`} /><span className={active === id ? "text-accent-orange" : ""}>{number}</span> {label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
