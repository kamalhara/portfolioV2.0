"use client";

import {
  ArrowLeft,
  ArrowUp,
  MessageSquareDashed,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/app/data/portfolio";

const configuredUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL;
const apiUrl =
  configuredUrl ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8787/chat"
    : null);

const portfolioLinks = [
  { label: "View Projects", href: "/project" },
  { label: "Technical Skills", href: "/#stack" },
  { label: "Download Resume", href: portfolio.resume },
  { label: "GitHub", href: portfolio.github },
  { label: "Contact Kamal", href: `mailto:${portfolio.email}` },
];

function safeHref(href) {
  return (
    typeof href === "string" &&
    ((href.startsWith("/") && !href.startsWith("//")) ||
      href.startsWith("https://") ||
      href.startsWith("mailto:"))
  );
}

function AssistantLink({ href, label, onClose }) {
  if (!safeHref(href)) return null;
  const className = "font-medium underline underline-offset-4";
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClose} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target={href.startsWith("https://") ? "_blank" : undefined}
      rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
      className={className}
    >
      {label}
    </a>
  );
}

export default function Assisstant({ onBack, onClose }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const conversationRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!apiUrl) return;
    const controller = new AbortController();
    fetch(new URL("/status", apiUrl), {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Assistant status unavailable");
        return response.json();
      })
      .then((status) => {
        setRemaining(status.remaining);
        setLimitReached(status.remaining === 0 || !status.globalAvailable);
      })
      .catch((cause) => {
        if (cause.name !== "AbortError") {
          setError("The assistant is temporarily unavailable.");
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, limitReached, error]);

  async function ask(content) {
    const question = content.trim();
    if (!question || loading || limitReached || !apiUrl) return;
    setError("");
    setDraft("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", text: question }]);
    if (inputRef.current) inputRef.current.style.height = "40px";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const result = await response.json();
      if (typeof result.remaining === "number") setRemaining(result.remaining);
      if (result.limitReached) setLimitReached(true);
      if (!response.ok) {
        setError(
          result.error || "The assistant could not answer. Please try again.",
        );
      } else {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            text: result.answer,
            links: Array.isArray(result.links) ? result.links : [],
          },
        ]);
      }
    } catch {
      setError("The assistant is temporarily unavailable.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function sendMessage(event) {
    event.preventDefault();
    void ask(draft);
  }

  async function newChat() {
    if (loading) return;
    if (apiUrl) {
      try {
        const response = await fetch(new URL("/reset", apiUrl), {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Reset failed");
      } catch {
        setError("The conversation could not be reset. Please try again.");
        return;
      }
    }
    setMessages([]);
    setDraft("");
    setError("");
    if (inputRef.current) inputRef.current.style.height = "40px";
    inputRef.current?.focus();
  }

  function handleKeyDown(event) {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll(
      "button:not(:disabled), textarea, a[href]",
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

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/20 p-4 backdrop-blur-sm dark:bg-black/40"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        id="portfolio-assistant-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-modal-title"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-lg text-foreground"
      >
        <h2 id="assistant-modal-title" className="sr-only">
          Recruiter Assistant
        </h2>
        <div className="rounded-3xl border border-border bg-background p-2 shadow-2xl">
          <div className="relative flex flex-col">
            <div className="flex items-center gap-3 px-3 py-1">
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to search"
                className="ui-press inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <ArrowLeft className="size-[18px]" aria-hidden="true" />
              </button>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold tracking-[-0.01em]">
                  Recruiter Assistant
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                  Ask about projects, skills, experience, and availability
                </p>
              </div>
              <button
                type="button"
                onClick={newChat}
                disabled={loading}
                aria-label="New chat"
                className="ui-press inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2 flex h-[50dvh] min-h-64 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative min-h-0 flex-1">
                <div
                  ref={conversationRef}
                  role="region"
                  aria-label="Conversation"
                  className="h-full overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {messages.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28 }}
                        className="flex h-full flex-col items-center justify-center px-4 text-center"
                      >
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                          <MessageSquareDashed
                            className="size-6"
                            aria-hidden="true"
                          />
                        </span>
                        <h4 className="mt-4 text-base font-medium text-foreground">
                          Ask me about Kamal&apos;s work
                        </h4>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Projects, experience, skills, and collaboration
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="conversation"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28 }}
                        className="flex flex-col gap-4"
                        aria-live="polite"
                      >
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`message-enter max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                              message.role === "user"
                                ? "ml-auto bg-foreground text-background"
                                : "mr-auto border border-border bg-background text-foreground"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">
                              {message.text}
                            </p>
                            {message.links?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                                {message.links.map((link) => (
                                  <AssistantLink
                                    key={`${link.href}-${link.label}`}
                                    href={link.href}
                                    label={link.label}
                                    onClose={onClose}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {loading && (
                    <p
                      role="status"
                      className="mt-4 text-sm text-muted-foreground"
                    >
                      Thinking…
                    </p>
                  )}
                  {error && (
                    <p
                      role="alert"
                      className="mt-4 text-sm text-muted-foreground"
                    >
                      {error}
                    </p>
                  )}
                  {limitReached && !error && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {remaining === 0
                        ? "You’ve reached the AI assistant’s demo limit for this session. You can still explore Kamal’s projects, skills, resume and contact information below."
                        : "The AI assistant has reached its daily demo capacity. You can still explore Kamal’s portfolio below."}
                    </p>
                  )}
                  {!apiUrl && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      The assistant is not configured yet.
                    </p>
                  )}
                  {(limitReached || !apiUrl || error) && (
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
                      {portfolioLinks.map((link) => (
                        <AssistantLink
                          key={link.href}
                          href={link.href}
                          label={link.label}
                          onClose={onClose}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <form
                onSubmit={sendMessage}
                className="relative z-30 px-3 pb-3 pt-1"
              >
                <div className="group relative w-full">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 rounded-3xl blur-xl opacity-0 transition-opacity duration-500 group-focus-within:opacity-[0.12]"
                    style={{
                      background:
                        "linear-gradient(115deg, rgb(236, 72, 153), rgb(139, 92, 246), rgb(59, 130, 246), rgb(236, 72, 153))",
                    }}
                  />
                  <div className="relative w-full rounded-[19px] border border-border bg-background/95 backdrop-blur transition-colors duration-200 focus-within:border-border-strong">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      maxLength={300}
                      disabled={loading || limitReached || !apiUrl}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onInput={(event) => {
                        event.currentTarget.style.height = "40px";
                        event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 160)}px`;
                      }}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey &&
                          !event.nativeEvent.isComposing
                        ) {
                          event.preventDefault();
                          event.currentTarget.form?.requestSubmit();
                        }
                      }}
                      placeholder={
                        limitReached
                          ? "Demo limit reached"
                          : "Ask about projects, stack, or availability"
                      }
                      aria-label="Message"
                      enterKeyHint="send"
                      className="block max-h-[160px] w-full resize-none overflow-y-auto bg-transparent px-4 pb-1 pt-3 text-[15px] leading-6 text-foreground outline-none placeholder:text-muted-foreground/60"
                      style={{ height: 40 }}
                    />
                    <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-0.5">
                      <span className="px-1.5 text-[11px] text-muted-foreground/70">
                        {remaining === null
                          ? "Enter to send"
                          : `${remaining} AI replies left`}
                      </span>
                      <button
                        type="submit"
                        disabled={
                          !draft.trim() || loading || limitReached || !apiUrl
                        }
                        aria-label="Send message"
                        className="ui-press inline-flex size-8 items-center justify-center rounded-lg bg-foreground text-background transition-colors hover:opacity-80 disabled:bg-foreground/10 disabled:text-muted-foreground"
                      >
                        <ArrowUp className="size-[18px]" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
