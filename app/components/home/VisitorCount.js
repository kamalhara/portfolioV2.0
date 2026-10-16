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
    <div
      className="visitor-count group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-[11.5px] text-muted-foreground shadow-xs backdrop-blur-md transition-all duration-200 hover:border-border-strong hover:bg-card hover:text-foreground [font-family:var(--font-geist-mono)]"
      title={`${count.toLocaleString()} unique visitors to this portfolio`}
      aria-label={`${count.toLocaleString()} unique visitors`}
    >
      <span aria-hidden="true" className="relative flex size-2 items-center justify-center">
        <span className="absolute inline-flex size-full animate-pulse rounded-full bg-success/35" />
        <span className="relative inline-flex size-1.5 rounded-full bg-success shadow-[0_0_6px_var(--color-success)]" />
      </span>
      <span className="flex items-center gap-1.25">
        <span className="font-semibold text-foreground tracking-tight">
          {count.toLocaleString()}
        </span>
        <span className="text-muted-foreground/85 font-normal">
          visitors
        </span>
      </span>
    </div>
  );
}
