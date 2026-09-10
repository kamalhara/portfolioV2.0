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
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-paper-border bg-bg-cream/90 backdrop-blur-xl py-1">
      <nav
        aria-label="Primary navigation"
        className="mx-16 grid h-14  grid-cols-[1fr_auto] items-center px-4  sm:grid-cols-[1fr_auto_1fr] sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs tracking-tight transition-opacity hover:opacity-70"
        >
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-ink-text text-[10px] font-bold text-bg-cream">
            KS
          </span>
          <span>
            <strong className="block text-[14px] font-semibold">
              Kamalveer
            </strong>
            <p className="hidden text-[12px] uppercase tracking-widest text-ink-muted/70 sm:block ">
              developer / builder
            </p>
          </span>
        </Link>
        <p className="hidden items-center font-mono text-[12px] tracking-[.16em] text-ink-muted sm:flex">
          <span className="mr-2 h-1.5 w-1.5  rounded-full bg-accent-orange" />
          GMT+5:30&nbsp; {time || "--:--:--"}
        </p>
        <ul className="flex justify-self-end gap-4 font-mono text-[12px] text-ink-muted sm:gap-6 uppercase tracking-widest ">
          {links.map(([label, href], index) => (
            <li key={href} className={index === 1 ? "hidden md:block" : ""}>
              <Link
                className="group relative inline-block transition-colors hover:text-ink-text"
                href={href}
              >
                {label}
                <div className="absolute inset-x-0 -bottom-1 h-[1.2px] w-0 bg-accent-orange transition-all duration-300 ease-out group-hover:w-full"></div>
              </Link>
            </li>
          ))}
          <li>
            <a
              className="group relative inline-block transition-colors hover:text-ink-text"
              href="https://github.com/kamalhara"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="ml-1 inline-block transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-orange">
                ↗
              </span>
              <div className="absolute inset-x-0 -bottom-1 h-[1.2px] w-0 bg-accent-orange transition-all duration-300 ease-out group-hover:w-full"></div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
