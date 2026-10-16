"use client";

import { useEffect, useState } from "react";

/**
 * Derives the worker base URL from NEXT_PUBLIC_ASSISTANT_API_URL
 * (which ends with /chat) so we can hit /visitors on the same origin.
 */
function getWorkerBase() {
  const chatUrl =
    process.env.NEXT_PUBLIC_ASSISTANT_API_URL ?? "http://localhost:8787/chat";
  return chatUrl.replace(/\/chat$/, "");
}

export default function VisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${getWorkerBase()}/visitors`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.visitors != null) setCount(data.visitors);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (count == null) return null;

  return (
    <span
      className="visitor-count inline-flex items-center gap-1.5 text-xs text-muted-foreground [font-family:var(--font-geist-mono)]"
      aria-label={`${count.toLocaleString()} unique visitors`}
    >
      <span
        aria-hidden="true"
        className="relative flex size-1.5"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-success" />
      </span>
      {count.toLocaleString()} visitors
    </span>
  );
}
