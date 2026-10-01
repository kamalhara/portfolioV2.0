"use client";

import { useEffect, useState } from "react";

export default function ProjectSectionNav({ sections }) {
  const [active, setActive] = useState(sections[0].toLowerCase());
  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.toLowerCase()))
      .filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.max(100, window.innerHeight * 0.24);
      let current = targets[0]?.id;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= threshold)
          current = target.id;
      }
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);
  return (
    <nav
      className="project-section-nav mt-7 flex flex-wrap gap-5 border-b border-border text-xs text-muted-foreground"
      aria-label="Project sections"
    >
      {sections.map((section) => {
        const id = section.toLowerCase();
        return (
          <a
            href={`#${id}`}
            key={id}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setActive(id)}
            className="project-section-link"
          >
            {section}
          </a>
        );
      })}
    </nav>
  );
}
