"use client";

import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  MessageSquareDashed,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const glowColors = [
  "rgb(236, 72, 153)",
  "rgb(139, 92, 246)",
  "rgb(59, 130, 246)",
];
const glowGradient = `linear-gradient(115deg, ${[...glowColors, glowColors[0]].join(", ")})`;

const configuredUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL;
const apiUrl =
  configuredUrl ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8787/chat"
    : null);

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
  const className =
    "assistant-link ui-press inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold leading-5 text-card transition-opacity hover:opacity-80";
  const content = (
    <>
      {label}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClose} className={className}>
        {content}
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
      {content}
    </a>
  );
}

function AnimatedAnswer({ text, reduceMotion }) {
  if (reduceMotion) return <p className="whitespace-pre-wrap">{text}</p>;
  return (
    <p className="whitespace-pre-wrap">
      {text.split(/(\s+)/).map((word, index) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span
            key={index}
            className="assistant-reply-word"
            style={{
              "--reveal-delay": `${Math.floor(index / 2) * 18}ms`,
              "--reveal-color":
                glowColors[Math.floor(index / 2) % glowColors.length],
            }}
          >
            {word}
          </span>
        ),
      )}
    </p>
  );
}

function CopyAnswer({ text }) {
  const [status, setStatus] = useState("idle");
  const resetRef = useRef(null);

  useEffect(() => () => window.clearTimeout(resetRef.current), []);

  async function copy() {
    window.clearTimeout(resetRef.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    resetRef.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        aria-label={status === "copied" ? "Response copied" : "Copy response"}
        title={status === "copied" ? "Copied" : "Copy response"}
        className="ui-press inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        {status === "copied" ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
      <span
        role="status"
        className={
          status === "failed" ? "text-xs text-muted-foreground" : "sr-only"
        }
      >
        {status === "copied"
          ? "Response copied to clipboard"
          : status === "failed"
            ? "Could not copy. Please select the text to copy it."
            : ""}
      </span>
    </div>
  );
}

export default function Assisstant({ onBack, onClose }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [developmentMode, setDevelopmentMode] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState("");
  const [scrollState, setScrollState] = useState({
    overflow: false,
    progress: 0,
    atBottom: true,
  });
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const conversationRef = useRef(null);
  const conversationContentRef = useRef(null);
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
        setDevelopmentMode(Boolean(status.developmentMode));
        setRemaining(status.remaining);
        setLimitReached(
          !status.developmentMode &&
            (status.remaining === 0 || !status.globalAvailable),
        );
      })
      .catch((cause) => {
        if (cause.name !== "AbortError") {
          setError("The assistant is temporarily unavailable.");
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const conversation = conversationRef.current;
    const content = conversationContentRef.current;
    if (!conversation || !content) return;
    const updateScroll = () => {
      const distance = conversation.scrollHeight - conversation.clientHeight;
      const next = {
        overflow: distance > 2,
        progress:
          distance > 2
            ? Math.round((conversation.scrollTop / distance) * 100)
            : 0,
        atBottom: distance - conversation.scrollTop < 12,
      };
      setScrollState((current) =>
        current.overflow === next.overflow &&
        current.progress === next.progress &&
        current.atBottom === next.atBottom
          ? current
          : next,
      );
    };
    const observer = new ResizeObserver(updateScroll);
    observer.observe(conversation);
    observer.observe(content);
    conversation.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      observer.disconnect();
      conversation.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }, [messages, loading, limitReached, error, reduceMotion]);

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
      if (result.developmentMode) {
        setDevelopmentMode(true);
        setRemaining(null);
        setLimitReached(false);
      }
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
            links: Array.isArray(result.links)
              ? result.links.filter((link) => safeHref(link?.href)).slice(0, 1)
              : [],
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
      "button:not(:disabled), textarea:not(:disabled), input:not(:disabled), a[href], [tabindex='0']",
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
        style={{ "--assistant-glow": glowGradient }}
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
                  id="assistant-conversation"
                  role="region"
                  aria-label="Conversation"
                  tabIndex={0}
                  className="assistant-conversation h-full overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
                >
                  <div
                    ref={conversationContentRef}
                    className="flex min-h-full flex-col"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {messages.length === 0 ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                          transition={{ duration: reduceMotion ? 0 : 0.28 }}
                          className="flex flex-1 flex-col items-center justify-center px-4 text-center"
                        >
                          <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                            <MessageSquareDashed
                              className="size-6"
                              aria-hidden="true"
                            />
                          </span>
                          <h4 className="mt-4 text-base font-medium text-foreground">
                            Ask me anything about my work
                          </h4>
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
                              className={`max-w-[95%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                                message.role === "user"
                                  ? "message-enter ml-auto bg-[#232322] text-white"
                                  : "mr-auto text-foreground"
                              }`}
                            >
                              {message.role === "assistant" ? (
                                <AnimatedAnswer
                                  text={message.text}
                                  reduceMotion={reduceMotion}
                                />
                              ) : (
                                <p className="whitespace-pre-wrap">
                                  {message.text}
                                </p>
                              )}
                              {message.role === "assistant" && (
                                <CopyAnswer text={message.text} />
                              )}
                              {message.links?.length > 0 && (
                                <div className="mt-2">
                                  {message.links.slice(0, 1).map((link) => (
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
                  </div>
                </div>
                {scrollState.overflow && (
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={scrollState.progress}
                    onChange={(event) => {
                      const conversation = conversationRef.current;
                      if (!conversation) return;
                      conversation.scrollTo({
                        top:
                          (Number(event.target.value) / 100) *
                          (conversation.scrollHeight -
                            conversation.clientHeight),
                        behavior: "instant",
                      });
                    }}
                    aria-label="Scroll conversation"
                    aria-controls="assistant-conversation"
                    aria-valuetext={`${scrollState.progress}% through the conversation`}
                    className="assistant-scroll-navigator absolute bottom-4 right-1 top-4"
                  />
                )}
                <AnimatePresence>
                  {scrollState.overflow && !scrollState.atBottom && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.18 }}
                      onClick={() =>
                        conversationRef.current?.scrollTo({
                          top: conversationRef.current.scrollHeight,
                          behavior: reduceMotion ? "instant" : "smooth",
                        })
                      }
                      aria-label="Scroll to latest message"
                      aria-controls="assistant-conversation"
                      className="ui-press absolute bottom-2 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm backdrop-blur"
                    >
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </motion.button>
                  )}
                </AnimatePresence>
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
                      background: "var(--assistant-glow)",
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
                        {developmentMode
                          ? "Dev mode · unlimited questions"
                          : remaining === null
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
