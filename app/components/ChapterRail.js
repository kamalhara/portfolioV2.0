"use client";

import { useEffect, useState } from "react";

const chapters = [
  ["00", "Intro", "start"],
  ["01", "Work", "work"],
  ["02", "Experience", "experience"],
  ["03", "About", "about"],
  ["04", "Activity", "activity"],
];

export default function ChapterRail() {
  const [active, setActive] = useState("start");

  useEffect(() => {
    const sections = chapters
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="chapter-rail" aria-label="Page chapters">
      <ol>
        {chapters.map(([number, label, id]) => (
          <li key={id} className={active === id ? "is-active" : ""}>
            <a href={`#${id}`}>
              <span>{number}</span> {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
