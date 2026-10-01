"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  downloadsRefreshMs,
  showDownloadsBadge,
} from "@/app/lib/stateglyphDownloads";

export default function StateglyphDownloadsBadge() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let controller;
    let inFlight = false;
    let lastChecked = 0;

    async function refresh() {
      if (document.hidden || inFlight || Date.now() - lastChecked < 60_000) {
        return;
      }
      controller = new AbortController();
      const signal = controller.signal;
      inFlight = true;
      lastChecked = Date.now();
      try {
        const response = await fetch("/api/stateglyph-downloads", { signal });
        if (!response.ok) throw new Error("Download statistics unavailable");
        const data = await response.json();
        if (!signal.aborted) setStats(data);
      } catch {
        if (!signal.aborted) setStats(null);
      } finally {
        inFlight = false;
      }
    }

    refresh();
    const interval = window.setInterval(refresh, downloadsRefreshMs);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  if (!showDownloadsBadge(stats?.downloads)) return null;

  const count = new Intl.NumberFormat("en-US").format(stats.downloads);
  return (
    <span
      className="inline-flex items-center gap-1.25 rounded-full border border-brand/20 bg-brand/5 px-2 py-0.75 text-[11px] leading-[1.2] tracking-normal text-brand"
      aria-label={`${count} weekly npm downloads across all four StateGlyph packages`}
      title={`Combined npm downloads · ${stats.start} to ${stats.end} · npm updates daily`}
    >
      <Download size={12} aria-hidden="true" />
      <span>{count} downloads / week</span>
    </span>
  );
}
