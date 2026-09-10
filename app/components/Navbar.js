"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["About", "/#about"],
];

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-border bg-bg-cream/90 backdrop-blur-md">
      <nav aria-label="Primary navigation" className="mx-auto grid h-14 max-w-[1240px] grid-cols-[1fr_auto] items-center px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-xs tracking-tight transition-opacity hover:opacity-70">
          <span className="grid h-7 w-7 place-items-center rounded-sm bg-ink-text text-[10px] font-bold text-bg-cream">KS</span>
          <span><strong className="block font-semibold">Kamalveer ↗</strong><small className="hidden text-[10px] uppercase tracking-wider text-ink-muted sm:block">developer / builder</small></span>
        </Link>
        <p className="hidden items-center font-mono text-[10px] tracking-[.16em] text-ink-faint sm:flex">
          <span className="mr-2 h-1.5 w-1.5 animate-[quiet-pulse_2.2s_ease-in-out_infinite] rounded-full bg-accent-orange" />GMT+5:30&nbsp; {time || "--:--:--"}
        </p>
        <ul className="flex justify-self-end gap-4 font-mono text-[11px] text-ink-muted sm:gap-6">
          {links.map(([label, href], index) => <li key={href} className={index === 1 ? "hidden md:block" : ""}><Link className="transition-colors hover:text-ink-text" href={href}>{label}</Link></li>)}
          <li><a className="transition-colors hover:text-ink-text" href="https://github.com/kamalhara" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
        </ul>
      </nav>
    </header>
  );
}
