"use client";

import { useEffect, useState } from "react";

const configuredUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL;
const apiBase = configuredUrl
  ? configuredUrl.replace(/\/chat$/, "")
  : process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : null;

export default function VisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!apiBase) return;
    const controller = new AbortController();
    fetch(`${apiBase}/visitors`, {
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
