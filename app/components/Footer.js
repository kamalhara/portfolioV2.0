"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const farewells = [
  { text: "see you", lang: "en" },
  { text: "nos vemos", lang: "es" },
  { text: "until next time", lang: "en" },
  { text: "hasta pronto", lang: "es" },
];

export default function Footer() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % farewells.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = farewells[index];

  return (
    <footer className="border-t border-paper-border bg-bg-cream px-6 pb-10 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-350 text-center">
        {/* Rotating farewell */}
        <div className="flex h-[1.25em] items-center justify-center text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight">
          <span
            lang={current.lang}
            className="font-serif italic transition-all duration-400 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              filter: visible ? "blur(0px)" : "blur(6px)",
              transform: visible ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {current.text}
          </span>
        </div>

        {/* Copyright */}
        <p className="mt-8 font-mono text-[10.5px] uppercase tracking-widest text-ink-faint">
          Kamalveer · © {new Date().getFullYear()} · Available for building
          things
        </p>

        {/* Navigation */}
        <nav aria-label="Footer" className="mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {[
              ["Work", "/#work"],
              ["Experience", "/#experience"],
              ["About", "/#about"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group relative py-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted no-underline transition-colors duration-200 hover:text-ink-text"
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent-orange transition-transform duration-200 ease-out group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/kamalhara"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative py-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted no-underline transition-colors duration-200 hover:text-ink-text"
              >
                GitHub
                <span aria-hidden="true" className="ml-1">
                  ↗
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent-orange transition-transform duration-200 ease-out group-hover:scale-x-100"
                />
              </a>
            </li>
          </ul>
        </nav>

        {/* Bottom links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-paper-border pt-6">
          <a
            href="mailto:kamalhara7@gmail.com"
            className="font-mono text-[10.5px] uppercase tracking-widest text-ink-faint no-underline transition-colors duration-200 hover:text-ink-text"
          >
            hello@kamalveer
          </a>
          <a
            href="https://github.com/kamalhara"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10.5px] uppercase tracking-widest text-ink-faint no-underline transition-colors duration-200 hover:text-ink-text"
          >
            GitHub
            <span aria-hidden="true" className="ml-1">
              ↗
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10.5px] uppercase tracking-widest text-ink-faint no-underline transition-colors duration-200 hover:text-ink-text"
          >
            LinkedIn
            <span aria-hidden="true" className="ml-1">
              ↗
            </span>
          </a>
          <a
            href="#main"
            className="font-mono text-[10.5px] uppercase tracking-widest text-ink-faint no-underline transition-colors duration-200 hover:text-ink-text"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
