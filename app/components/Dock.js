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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolio } from "@/app/data/portfolio";
import { LuBot, LuHouse } from "react-icons/lu";
import { BsArrowLeftCircle, BsHouse } from "react-icons/bs";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { usePathname, useRouter } from "next/navigation";
import Assisstant from "@/app/components/Assisstant";
import { assistantOpenEvent } from "@/app/lib/assistantEvents";
import { setTheme, useTheme } from "@/app/lib/useTheme";
import HoverBadge from "@/app/components/HoverBadge";
import { lockDialogScroll } from "@/app/lib/dialogViewport";

const quickLinks = [
  {
    label: "Home",
    description: "Back to the homepage",
    href: "/",
    icon: House,
    shortcut: "H",
  },

  {
    label: "Projects",
    description: "Selected work",
    href: "/#projects",
    icon: FolderKanban,
    shortcut: "P",
  },
  {
    label: "Experience",
    description: "Where I've worked",
    href: "/#experience",
    icon: BriefcaseBusiness,
    shortcut: "E",
  },
  {
    label: "About",
    description: "A little about me",
    href: "/#about",
    icon: UserRound,
    shortcut: "A",
  },
  {
    label: "Tech stack",
    description: "Tools I use",
    href: "/#stack",
    icon: Layers3,
  },
  {
    label: "How I work",
    description: "From user flow to finished feature",
    href: "/#approach",
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
  const light = useTheme() === "light";
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const searchButtonRef = useRef(null);
  const navigationButtonRef = useRef(null);
  const dockRef = useRef(null);
  const assistantTriggerRef = useRef(null);
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const dialogOpen = searchOpen || assistantOpen;
  const focusSearchDialog = useCallback((node) => {
    dialogRef.current = node;
    node?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (dialogOpen) return lockDialogScroll();
  }, [dialogOpen]);

  useEffect(() => {
    const onProjectQuestion = (event) => {
      if (typeof event.detail?.question !== "string") return;
      assistantTriggerRef.current = event.detail.trigger;
      setAssistantQuestion(event.detail.question.trim());
      setMenuOpen(false);
      setSearchOpen(false);
      setAssistantOpen(true);
    };
    window.addEventListener(assistantOpenEvent, onProjectQuestion);
    return () =>
      window.removeEventListener(assistantOpenEvent, onProjectQuestion);
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
    if (!menuOpen) return;
    const closeOnOutsidePress = (event) => {
      if (!dockRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [menuOpen]);

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setAssistantOpen(false);
        setSearchOpen(true);
      } else if (
        event.key === "Escape" &&
        (searchOpen || assistantOpen || menuOpen)
      ) {
        setSearchOpen(false);
        setAssistantOpen(false);
        setMenuOpen(false);
        if (menuOpen) navigationButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [assistantOpen, menuOpen, searchOpen]);

  function toggleTheme() {
    setTheme(light ? "dark" : "light");
  }

  function closeSearch() {
    setSearchOpen(false);
  }

  function openAssistant(question = "") {
    setAssistantQuestion(question.trim());
    setSearchOpen(false);
    setAssistantOpen(true);
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
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          if (!searchOpen && !assistantOpen) {
            setQuery("");
            const trigger = assistantTriggerRef.current;
            if (trigger?.isConnected) trigger.focus({ preventScroll: true });
            else searchButtonRef.current?.focus({ preventScroll: true });
            assistantTriggerRef.current = null;
          }
        }}
      >
        {assistantOpen ? (
          <motion.div
            key="assistant-dialog"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <Assisstant
              initialQuestion={assistantQuestion}
              onBack={() => {
                setAssistantOpen(false);
                setSearchOpen(true);
              }}
              onClose={() => {
                setAssistantOpen(false);
              }}
            />
          </motion.div>
        ) : searchOpen ? (
          <motion.div
            key="search-dialog"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <div
              className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/20 p-4 backdrop-blur-sm dark:bg-black/40"
              data-click-sound="dismiss"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeSearch();
              }}
            >
              <div
                ref={focusSearchDialog}
                id="portfolio-search-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="command-modal-title"
                tabIndex={-1}
                onKeyDown={trapDialogFocus}
                className="command-menu dialog-panel w-full max-w-lg text-foreground outline-none"
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
                      type="search"
                      maxLength={300}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.nativeEvent.isComposing &&
                          !filteredGroups.length &&
                          !showSettings
                        ) {
                          event.preventDefault();
                          openAssistant(query);
                        }
                      }}
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
                        <div
                          key={group.label}
                          className="content-enter mb-2 mt-4"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="mx-1 px-2 py-2 text-xs font-medium text-muted-foreground">
                              {group.label}
                            </h3>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {group.items.map((item) => {
                              const Icon = item.icon;
                              const ItemLink = item.action
                                ? "button"
                                : item.external ||
                                    item.href.startsWith("mailto:")
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
                                      openAssistant();
                                    } else {
                                      closeSearch();
                                    }
                                  }}
                                  className="ui-press content-enter group mx-1 flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[13px] leading-none transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring/40 dark:hover:bg-foreground/10"
                                >
                                  <Icon
                                    className="size-4 shrink-0 text-foreground/80"
                                    aria-hidden="true"
                                  />
                                  <span className="flex-1">{item.label}</span>
                                  {item.shortcut && (
                                    <div className="border border-border bg-background/70 px-1.5 py-0.5 rounded-md text-muted-foreground text-[12px]">
                                      {item.shortcut}
                                    </div>
                                  )}
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
                            className="ui-press mx-1 flex w-[calc(100%-0.5rem)] cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[13px] leading-none transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring/40 dark:hover:bg-foreground/10"
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
                        <div>
                          <div className="mx-1 px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                            Ask Assistant
                          </div>
                          <button
                            type="button"
                            onClick={() => openAssistant(query)}
                            className="ui-press content-enter flex w-full items-center gap-3 rounded-lg border border-brand/30 bg-brand-soft px-3 py-3 text-left text-sm text-foreground transition-colors hover:bg-brand/15 focus-visible:ring-2 focus-visible:ring-ring/40"
                          >
                            <LuBot
                              className="size-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1 wrap-break-word">
                              Ask Assistant: &ldquo;{query.trim()}&rdquo;
                            </span>
                            <kbd
                              aria-hidden="true"
                              className="shrink-0 text-xs text-muted-foreground"
                            >
                              ↵
                            </kbd>
                          </button>
                        </div>
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
                        <kbd className="hidden  rounded-md border border-border bg-background/70 px-1.5 py-0.5 text-[10px] text-muted-foreground shadow-sm sm:block dark:shadow-none">
                          Esc
                        </kbd>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-16.5 backdrop-blur-[32px] mask-[linear-gradient(to_bottom,transparent,black_35%)]"
      />

      <div className="pointer-events-none fixed bottom-4.5 left-1/2 z-50 max-w-[calc(100%-2rem)] -translate-x-1/2">
        <div ref={dockRef} className="pointer-events-auto">
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="portfolio-mobile-navigation"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                className="absolute bottom-[calc(100%+12px)] right-0 flex max-h-[calc(100dvh-100px)] w-40 flex-col gap-2.5 overflow-y-auto py-1 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
                aria-label="Quick navigation"
              >
                {quickLinks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                        delay: reduceMotion ? 0 : index * 0.025,
                      }}
                    >
                      <Link
                        href={
                          item.label === "Projects" ? "/project" : item.href
                        }
                        onClick={() => setMenuOpen(false)}
                        className="ui-press flex min-h-10 items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 text-[13px] font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <Icon
                          className="size-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>

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
              className="hover-badge-trigger ui-press relative flex h-8 w-40 cursor-pointer items-center gap-2 rounded-full bg-foreground/5 px-3 text-muted-foreground transition-colors hover:bg-foreground/8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-52.5 [html.dark_&]:bg-foreground/8 [html.dark_&]:hover:bg-foreground/12"
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
              <HoverBadge label="Search" />
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
              className="ui-press relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [html.dark_&]:hover:bg-foreground/10"
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
                  className="ui-press relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [html.dark_&]:hover:bg-foreground/10"
                >
                  <LuHouse />
                </Link>
                <button
                  type="button"
                  aria-label="Go back"
                  onClick={() => router.back()}
                  className="ui-press relative flex size-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [html.dark_&]:hover:bg-foreground/10"
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
            <button
              ref={navigationButtonRef}
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="portfolio-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="ui-press flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:hidden [html.dark_&]:hover:bg-foreground/10"
            >
              {menuOpen ? (
                <FiX className="size-4" aria-hidden="true" />
              ) : (
                <FiMenu className="size-4" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
