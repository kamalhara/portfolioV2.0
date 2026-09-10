"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const links = [
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["About", "/#about"],
];

const themeEvent = "portfolio-theme-change";

function subscribeToTheme(callback) {
  window.addEventListener(themeEvent, callback);
  return () => window.removeEventListener(themeEvent, callback);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot() {
  return "light";
}

export default function Navbar() {
  const [time, setTime] = useState("");
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.35,
  });

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

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    try {
      window.localStorage.setItem("kamalveer-portfolio-theme-v2", nextTheme);
    } catch {
      // The theme still changes when storage is unavailable.
    }
    window.dispatchEvent(new Event(themeEvent));
  };

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-paper-border bg-bg-cream/90 py-1 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto grid h-14 max-w-400 grid-cols-[auto_1fr] items-center gap-3 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs tracking-tight transition-opacity hover:opacity-70"
        >
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-ink-text text-[10px] font-bold text-bg-cream">
            KS
          </span>
          <span className="max-[360px]:hidden">
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
        <ul className="flex justify-self-end gap-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted sm:gap-6 sm:text-[12px]">
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
          <li className="flex items-center">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="grid h-8 w-8 place-items-center border border-paper-border text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-orange hover:text-ink-text"
            >
              {theme === "dark" ? (
                <FiSun aria-hidden="true" className="text-sm" />
              ) : (
                <FiMoon aria-hidden="true" className="text-sm" />
              )}
            </button>
          </li>
        </ul>
      </nav>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[1.5px] h-[1.5px] origin-left bg-accent-orange"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
