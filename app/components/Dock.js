"use client";

import {
  Activity,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  House,
  HousesIcon,
  Layers3,
  Mail,
  MessageCircle,
  PanelsTopLeft,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolio } from "@/app/data/portfolio";
import { LuBot, LuHouse } from "react-icons/lu";
import { BsArrowLeftCircle, BsHouse } from "react-icons/bs";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { usePathname, useRouter } from "next/navigation";
import Assisstant from "@/app/components/Assisstant";

const quickLinks = [
  {
    label: "Home",
    description: "Back to the homepage",
    href: "/",
    icon: House,
  },

  {
    label: "Projects",
    description: "Selected work",
    href: "/#projects",
    icon: FolderKanban,
  },
  {
    label: "Experience",
    description: "Where I've worked",
    href: "/#experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "About",
    description: "A little about me",
    href: "/#about",
    icon: UserRound,
  },
  {
    label: "Tech stack",
    description: "Tools I use",
    href: "/#stack",
    icon: Layers3,
  },
  {
    label: "Interfaces",
    description: "Interface explorations",
    href: "/#interfaces",
    icon: PanelsTopLeft,
  },
  {
    label: "Activity",
    description: "Recent GitHub activity",
    href: "/#activity",
    icon: Activity,
  },
];

const commandGroups = [
  {
    label: "Featured",
    items: [
      {
        label: "Ask Assistant",
        description: "Ask me anything",
        action: "assistant",
        icon: LuBot,
      },
    ],
  },
  { label: "Views", items: quickLinks },
  {
    label: "Socials",
    items: [
      {
        label: "GitHub",
        href: portfolio.github,
        icon: FaGithub,
        external: true,
      },
      {
        label: "LinkedIn",
        href: portfolio.linkedin,
        icon: FaLinkedin,
        external: true,
      },
      { label: "Email", href: `mailto:${portfolio.email}`, icon: Mail },
      {
        label: "Resume",
        href: portfolio.resume,
        icon: FileText,
        external: true,
      },
    ],
  },
];

const ringCircumference = 2 * Math.PI * 7.75;

export default function PortfolioDock() {
  const pathname = usePathname();
  const router = useRouter();
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
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
        setAssistantOpen(false);
        setSearchOpen(true);
      } else if (event.key === "Escape" && (searchOpen || assistantOpen || menuOpen)) {
        setSearchOpen(false);
        setAssistantOpen(false);
        setMenuOpen(false);
        setQuery("");
        if (searchOpen || assistantOpen) searchButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [assistantOpen, menuOpen, searchOpen]);

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

  const searchTerm = query.trim().toLowerCase();
  const filteredGroups = commandGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${item.label} ${item.description ?? ""}`
          .toLowerCase()
          .includes(searchTerm),
      ),
    }))
    .filter((group) => group.items.length);
  const showSettings = "toggle theme light dark".includes(searchTerm);

  return (
    <>
      {assistantOpen && (
        <Assisstant
          onBack={() => {
            setAssistantOpen(false);
            setSearchOpen(true);
          }}
          onClose={() => {
            setAssistantOpen(false);
            searchButtonRef.current?.focus();
          }}
        />
      )}
      {searchOpen && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/20 p-4 backdrop-blur-sm dark:bg-black/40"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <div
            ref={dialogRef}
            id="portfolio-search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-modal-title"
            onKeyDown={trapDialogFocus}
            className="command-menu w-full max-w-lg text-foreground"
          >
            <h2 id="command-modal-title" className="sr-only">
              Command menu
            </h2>
            <div className="rounded-3xl border border-border bg-background p-2 shadow-2xl">
              <div className="flex items-center gap-2 px-3 py-1">
                <FiSearch
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Type something or Ask Assistant..."
                  aria-label="Search commands"
                  className="w-full appearance-none border-none bg-transparent text-base font-medium text-foreground outline-none placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <nav
                  className="max-h-[45dvh] overflow-y-auto px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Command results"
                >
                  {filteredGroups.map((group) => (
                    <div key={group.label} className="mb-2 mt-4">
                      <h3 className="mx-1 px-2 py-2 text-xs font-medium text-muted-foreground">
                        {group.label}
                      </h3>
                      <div className="flex flex-col gap-0.5">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const ItemLink =
                            item.action
                              ? "button"
                              : item.external || item.href.startsWith("mailto:")
                              ? "a"
                              : Link;

                          return (
                            <ItemLink
                              key={item.href ?? item.label}
                              type={item.action ? "button" : undefined}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={
                                item.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              onClick={() => {
                                if (item.action === "assistant") {
                                  setSearchOpen(false);
                                  setAssistantOpen(true);
                                } else {
                                  closeSearch();
                                }
                              }}
                              className="group mx-1 flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[13px] leading-none transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring/40 dark:hover:bg-foreground/10"
                            >
                              <Icon
                                className="size-4 shrink-0 text-foreground/80"
                                aria-hidden="true"
                              />
                              <span className="flex-1">{item.label}</span>
                            </ItemLink>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {showSettings && (
                    <div className="mb-2 mt-4">
                      <h3 className="mx-1 px-2 py-2 text-xs font-medium text-muted-foreground">
                        Settings
                      </h3>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="mx-1 flex w-[calc(100%-0.5rem)] cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[13px] leading-none transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring/40 dark:hover:bg-foreground/10"
                      >
                        {light ? (
                          <FiMoon
                            className="size-4 shrink-0 text-foreground/80"
                            aria-hidden="true"
                          />
                        ) : (
                          <FiSun
                            className="size-4 shrink-0 text-foreground/80"
                            aria-hidden="true"
                          />
                        )}
                        <span>Toggle Theme</span>
                      </button>
                    </div>
                  )}

                  {!filteredGroups.length && !showSettings && (
                    <p className="px-3 py-4 text-sm text-muted-foreground">
                      No matching commands.
                    </p>
                  )}
                </nav>
                <div className="flex items-center justify-between border-t border-border bg-card/80 px-4 py-3 text-xs text-muted-foreground backdrop-blur-md">
                  <span className="font-medium">Actions</span>
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="flex cursor-pointer items-center gap-2 rounded-sm transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <span>Close</span>
                    <kbd className="hidden rounded border border-border bg-background/70 px-1.5 py-0.5 text-[10px] text-muted-foreground shadow-sm sm:block dark:shadow-none">
                      Esc
                    </kbd>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed bottom-4.5 left-1/2 z-50 -translate-x-1/2">
        <div className="pointer-events-auto">
          {menuOpen && (
            <nav
              className="mx-auto mb-2 grid w-52 gap-px rounded-2xl border border-border bg-card p-2 shadow-2xl sm:hidden [&_a]:rounded-lg [&_a]:px-3 [&_a]:py-2 [&_a]:text-sm [&_a]:text-muted-foreground [&_a:hover]:bg-foreground/5 [&_a:hover]:text-foreground"
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

            {pathname !== "/" && (
              <>
                <Link
                  href="/"
                  aria-label="Go to home"
                  className="relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [html.dark_&]:hover:bg-foreground/10"
                >
                  <LuHouse />
                </Link>
                <button
                  type="button"
                  aria-label="Go back"
                  onClick={() => router.back()}
                  className="relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [html.dark_&]:hover:bg-foreground/10"
                >
                  <TfiArrowCircleLeft />
                </button>
              </>
            )}
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
