"use client";

import { useEffect, useRef, useState } from "react";

const configuredUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL;
const apiBase = configuredUrl
  ? configuredUrl.replace(/\/chat$/, "")
  : process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : null;

const HEARTBEAT_MS = 15_000;

function createSessionId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function EyeIcon({ className = "size-3.5" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1.5 8C2.85 5.25 5.2 3.75 8 3.75C10.8 3.75 13.15 5.25 14.5 8C13.15 10.75 10.8 12.25 8 12.25C5.2 12.25 2.85 10.75 1.5 8Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="8"
        r="1.9"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle cx="8" cy="8" r="0.7" fill="currentColor" />
    </svg>
  );
}

export default function VisitorCount() {
  const [count, setCount] = useState(null);
  const [live, setLive] = useState(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    if (!apiBase) return;
    if (!sessionIdRef.current) {
      sessionIdRef.current = createSessionId();
    }
    const sid = sessionIdRef.current;
    const controller = new AbortController();

    fetch(`${apiBase}/visitors?sid=${encodeURIComponent(sid)}`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.visitors != null) setCount(data.visitors);
        if (data?.live != null) setLive(data.live);
      })
      .catch(() => {});

    const sendHeartbeat = () => {
      if (document.visibilityState !== "visible") return;
      fetch(`${apiBase}/live?sid=${encodeURIComponent(sid)}`, {
        method: "POST",
        credentials: "include",
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.live != null) setLive(data.live);
        })
        .catch(() => {});
    };

    const intervalId = window.setInterval(sendHeartbeat, HEARTBEAT_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") sendHeartbeat();
    };
    const onPageHide = () => {
      const leaveUrl = `${apiBase}/live?sid=${encodeURIComponent(sid)}&action=leave`;
      if (typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon(leaveUrl);
      } else {
        fetch(leaveUrl, {
          method: "POST",
          credentials: "include",
          keepalive: true,
        }).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  if (count == null && live == null) return null;

  const titleParts = [];
  if (live != null) {
    titleParts.push(
      `${live.toLocaleString()} ${live === 1 ? "person" : "people"} watching right now`,
    );
  }
  if (count != null) {
    titleParts.push(
      `${count.toLocaleString()} unique visitors to this portfolio`,
    );
  }

  return (
    <div
      className="visitor-count group inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/65 px-2.5 py-1 text-[11.5px] leading-none text-muted-foreground shadow-xs backdrop-blur-md transition-all duration-200 hover:border-border-strong hover:bg-card hover:text-foreground [font-family:var(--font-geist-mono)]"
      title={titleParts.join(" · ")}
      aria-label={titleParts.join(", ")}
    >
      {live != null && (
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="relative flex size-2 items-center justify-center"
          >
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/50" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          <span className="font-semibold tracking-tight text-foreground tabular-nums">
            {live.toLocaleString()}
          </span>
          <span className="text-muted-foreground/85">watching</span>
        </span>
      )}
      {live != null && count != null && (
        <span aria-hidden="true" className="h-3 w-px bg-border/80" />
      )}
      {count != null && (
        <span className="inline-flex items-center gap-1.5">
          <EyeIcon className="size-3.5 shrink-0 text-muted-foreground/80 transition-colors duration-200 group-hover:text-foreground/85" />
          <span className="font-semibold tracking-tight text-foreground tabular-nums">
            {count.toLocaleString()}
          </span>
        </span>
      )}
    </div>
  );
}
