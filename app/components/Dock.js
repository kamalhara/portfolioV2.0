"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";

const quickLinks = [
  { label: "Projects", description: "Selected work", href: "/#projects" },
  {
    label: "Experience",
    description: "Where I've worked",
    href: "/#experience",
  },
  { label: "Tech stack", description: "Tools I use", href: "/#stack" },
  {
    label: "Activity",
    description: "Recent GitHub activity",
    href: "/#activity",
  },
  {
    label: "All projects",
    description: "Browse the full collection",
    href: "/project",
  },
];

const ringCircumference = 2 * Math.PI * 7.75;

export default function PortfolioDock() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const searchButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      const frame = window.requestAnimationFrame(() => setLight(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    function updateProgress() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const next =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, next)));
    }

    const frame = window.requestAnimationFrame(updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      } else if (event.key === "Escape" && (searchOpen || menuOpen)) {
        setSearchOpen(false);
        setMenuOpen(false);
        setQuery("");
        if (searchOpen) searchButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const frame = window.requestAnimationFrame(() =>
      searchInputRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [searchOpen]);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("dark", !next);
    window.localStorage.setItem("portfolio-theme", next ? "light" : "dark");
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    searchButtonRef.current?.focus();
  }

  function trapDialogFocus(event) {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll(
      "button, input, a[href]",
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const filteredLinks = quickLinks.filter((item) =>
    `${item.label} ${item.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <>
      {searchOpen && (
        <div
          className="fixed inset-0 z-60 flex justify-center bg-black/50 px-4 pt-[min(22vh,180px)] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <div
            ref={dialogRef}
            id="portfolio-search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-search-title"
            onKeyDown={trapDialogFocus}
            className="h-fit w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <FiSearch
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, experience, or skills"
                aria-label="Search portfolio sections"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:ring-none"
              />
            </div>
            <nav
              className="max-h-80 overflow-y-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Search results"
            >
              {filteredLinks.length ? (
                filteredLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSearch}
                    className="flex flex-col rounded-lg px-3 py-2 transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none"
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="px-3 py-4 text-sm text-muted-foreground">
                  No matching sections.
                </p>
              )}
            </nav>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed bottom-4.5 left-1/2 z-50 -translate-x-1/2">
        <div className="pointer-events-auto">
          {menuOpen && (
            <nav
              className="mx-auto mb-2 grid w-52 gap-px rounded-2xl border border-border bg-background p-2 shadow-2xl sm:hidden [&_a]:rounded-lg [&_a]:px-3 [&_a]:py-2 [&_a]:text-sm [&_a]:text-muted-foreground [&_a:hover]:bg-foreground/5 [&_a:hover]:text-foreground"
              aria-label="Quick navigation"
            >
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <nav
            className="relative z-10 flex h-12 items-center gap-1 rounded-full border border-border bg-background px-2 text-foreground/80 shadow-none sm:shadow-2xl"
            aria-label="Portfolio controls"
          >
            <button
              ref={searchButtonRef}
              type="button"
              aria-label="Ask me anything"
              aria-expanded={searchOpen}
              aria-haspopup="dialog"
              aria-controls="portfolio-search-dialog"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex h-8 w-40 cursor-pointer items-center gap-2 rounded-full bg-foreground/5 px-3 text-muted-foreground transition-colors hover:bg-foreground/8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-52.5 [html.dark_&]:bg-foreground/8 [html.dark_&]:hover:bg-foreground/12"
            >
              <FiSearch className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="flex-1 truncate text-left text-[12.5px]">
                Ask me anything
              </span>
              <span
                className="hidden shrink-0 items-center gap-1 sm:flex"
                aria-hidden="true"
              >
                <kbd className="flex h-4.5 min-w-4.5 items-center justify-center rounded-md bg-foreground/8 px-1 text-[11px] font-medium leading-none">
                  ⌘
                </kbd>
                <kbd className="flex h-4.5 min-w-4.5 items-center justify-center rounded-md bg-foreground/8 px-1 text-[11px] font-medium leading-none">
                  K
                </kbd>
              </span>
            </button>

            <span
              className="mx-1 h-4 w-px shrink-0 bg-border"
              aria-hidden="true"
            />

            <button
              type="button"
              aria-label={
                light ? "Switch to dark theme" : "Switch to light theme"
              }
              aria-pressed={!light}
              onClick={toggleTheme}
              className="relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [html.dark_&]:hover:bg-foreground/10"
            >
              {light ? (
                <FiMoon className="size-4.25" aria-hidden="true" />
              ) : (
                <FiSun className="size-4.25" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:hidden [html.dark_&]:hover:bg-foreground/10"
            >
              {menuOpen ? (
                <FiX className="size-4" aria-hidden="true" />
              ) : (
                <FiMenu className="size-4" aria-hidden="true" />
              )}
            </button>

            {scrollProgress > 0 && (
              <div
                role="progressbar"
                aria-label={`Scroll progress ${Math.round(scrollProgress)}%`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(scrollProgress)}
                className="hidden size-8 items-center justify-center rounded-full text-foreground/80 sm:flex"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  aria-hidden="true"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="7.75"
                    strokeWidth="2.5"
                    fill="none"
                    className="stroke-border"
                  />
                  <circle
                    cx="9"
                    cy="9"
                    r="7.75"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={
                      ringCircumference * (1 - scrollProgress / 100)
                    }
                    transform="rotate(-90 9 9)"
                  />
                </svg>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
