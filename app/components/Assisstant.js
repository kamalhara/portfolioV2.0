"use client";

import { ArrowLeft, ArrowUp, MessageSquareDashed, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/app/data/portfolio";
import { projects } from "@/app/data/project";

function getReply(message) {
  const question = message.toLowerCase();
  const project = projects.find((item) => question.includes(item.title.toLowerCase()));

  if (project) {
    return {
      text: project.description,
      href: `/project/${project.slug}`,
      linkLabel: `View ${project.title}`,
    };
  }

  if (/project|work|portfolio|built/.test(question)) {
    return {
      text: `Some featured projects are ${projects.slice(0, 4).map((item) => item.title).join(", ")}. Explore the project list for details.`,
      href: "/project",
      linkLabel: "View projects",
    };
  }

  if (/stack|tech|skill|react|framework|language|tool/.test(question)) {
    return {
      text: "I work across React, Next.js, React Native, Expo, Node.js, and Express, with experience in databases and cloud services. The stack section has the full list.",
      href: "/#stack",
      linkLabel: "View tech stack",
    };
  }

  if (/experience|job|role|company|talmee/.test(question)) {
    return {
      text: `${portfolio.currently} You can read more in the experience section.`,
      href: "/#experience",
      linkLabel: "View experience",
    };
  }

  if (/available|availability|hire|contact|email|collaborat/.test(question)) {
    return {
      text: `For current availability or collaboration inquiries, email me at ${portfolio.email}.`,
      href: `mailto:${portfolio.email}`,
      linkLabel: "Send an email",
    };
  }

  if (/blog|article|writ/.test(question)) {
    return {
      text: "There isn't a blog listed on this portfolio right now. You can browse my projects or get in touch by email.",
      href: "/project",
      linkLabel: "View projects",
    };
  }

  return {
    text: "I can help you find projects, experience, the tech stack, and contact details. Try asking about one of those topics or a project by name.",
  };
}

export default function Assisstant({ onBack, onClose }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const conversationRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: content },
      { role: "assistant", ...getReply(content) },
    ]);
    setDraft("");
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
          Portfolio Assistant
        </h2>
        <div className="rounded-3xl border border-border bg-background p-2 shadow-2xl">
          <div className="relative flex flex-col">
            <div className="flex items-center gap-3 px-3 py-1">
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to search"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <ArrowLeft className="size-[18px]" aria-hidden="true" />
              </button>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold tracking-[-0.01em]">
                  Portfolio Assistant
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                  Ask about projects, stack, blogs, and availability
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setDraft("");
                  if (inputRef.current) inputRef.current.style.height = "40px";
                  inputRef.current?.focus();
                }}
                aria-label="New chat"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
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
                  {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                        <MessageSquareDashed className="size-6" aria-hidden="true" />
                      </span>
                      <h4 className="mt-4 text-base font-medium text-foreground">
                        Ask me anything about my work
                      </h4>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4" aria-live="polite">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            message.role === "user"
                              ? "ml-auto bg-foreground text-background"
                              : "mr-auto border border-border bg-background text-foreground"
                          }`}
                        >
                          <p>{message.text}</p>
                          {message.href && (
                            <Link
                              href={message.href}
                              onClick={onClose}
                              className="mt-2 inline-block font-medium underline underline-offset-4"
                            >
                              {message.linkLabel}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={sendMessage} className="relative z-30 px-3 pb-3 pt-1">
                <div className="relative w-full rounded-[19px] border border-border bg-background/95 backdrop-blur">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    maxLength={500}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onInput={(event) => {
                      event.currentTarget.style.height = "40px";
                      event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 160)}px`;
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder="Ask about projects, stack, or availability"
                    aria-label="Message"
                    enterKeyHint="send"
                    className="block max-h-[160px] w-full resize-none overflow-y-auto bg-transparent px-4 pb-1 pt-3 text-[15px] leading-6 text-foreground outline-none placeholder:text-muted-foreground/60"
                    style={{ height: 40 }}
                  />
                  <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-0.5">
                    <span className="px-1.5 text-[11px] text-muted-foreground/70">
                      Enter to send
                    </span>
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      aria-label="Send message"
                      className="inline-flex size-8 items-center justify-center rounded-lg bg-foreground text-background transition-colors hover:opacity-80 disabled:bg-foreground/10 disabled:text-muted-foreground"
                    >
                      <ArrowUp className="size-[18px]" aria-hidden="true" />
                    </button>
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
