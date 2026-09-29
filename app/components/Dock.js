"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowUp, FiGrid, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

export default function PortfolioDock() {
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      const frame = window.requestAnimationFrame(() => setLight(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("dark", !next);
    window.localStorage.setItem("portfolio-theme", next ? "light" : "dark");
  }

  const dockButton = "inline-flex h-[31px] w-[35px] cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4";

  return (
    <div className="fixed bottom-4.5 left-1/2 z-50 -translate-x-1/2">
      {open && (
        <nav className="mx-auto mb-2 grid w-47.5 gap-px rounded-[14px] border border-border bg-card p-1.75 shadow-[0_14px_30px_#0005] [&_a]:rounded-lg [&_a]:px-2.25 [&_a]:py-1.25 [&_a]:text-[13px] [&_a]:text-muted-foreground [&_a:hover]:bg-muted [&_a:hover]:text-foreground" aria-label="Quick navigation">
          <Link href="/#projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link href="/#experience" onClick={() => setOpen(false)}>Experience</Link>
          <Link href="/#stack" onClick={() => setOpen(false)}>Tech stack</Link>
          <Link href="/#activity" onClick={() => setOpen(false)}>Activity</Link>
          <Link href="/project" onClick={() => setOpen(false)}>All projects</Link>
        </nav>
      )}
      <nav className="flex items-center gap-1.25 rounded-full border border-border bg-background/95 px-2 py-1.5 shadow-[0_14px_30px_#0004] backdrop-blur-[14px]" aria-label="Portfolio controls">
        <Link className={dockButton} href="/#projects" aria-label="Go to projects">
          <FiGrid aria-hidden="true" />
        </Link>
        <span className="mx-1 h-4.5 w-px bg-border" aria-hidden="true" />
        <button className={dockButton} type="button" onClick={toggleTheme} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
          {light ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
        </button>
        <button className={dockButton} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <FiArrowUp aria-hidden="true" />
        </button>
        <button className={dockButton} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>
    </div>
  );
}
