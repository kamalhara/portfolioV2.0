"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiMusic } from "react-icons/fi";
import type { MusicTrack } from "@/app/types/music";

const POLL_INTERVAL = 10_000;

export default function MusicCard() {
  const [track, setTrack] = useState<MusicTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIdRef = useRef<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;
    let inFlight = false;
    let controller: AbortController | null = null;

    async function refresh() {
      if (!active || inFlight || document.hidden) return;

      inFlight = true;
      controller = new AbortController();

      try {
        const response = await fetch("/api/now-playing", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Music request failed");

        const nextTrack = (await response.json()) as MusicTrack | null;
        if (!active) return;

        if (
          nextTrack?.id !== trackIdRef.current ||
          nextTrack?.previewUrl !== previewUrlRef.current
        ) {
          audioRef.current?.pause();
          setPlaying(false);
          setPreviewFailed(false);
          trackIdRef.current = nextTrack?.id ?? null;
          previewUrlRef.current = nextTrack?.previewUrl ?? null;
        }

        setTrack(nextTrack);
        setRequestFailed(false);
      } catch {
        if (active) setRequestFailed(true);
      } finally {
        inFlight = false;
      }
    }

    function refreshWhenVisible() {
      if (!document.hidden) void refresh();
    }

    void refresh();
    const interval = window.setInterval(() => void refresh(), POLL_INTERVAL);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      active = false;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, []);

  useEffect(() => {
    if (!track?.previewUrl) return;

    const audio = new Audio();
    audio.preload = "auto";
    audio.src = track.previewUrl;
    audio.volume = 0.5;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => setPreviewFailed(true);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);
    audio.addEventListener("error", handleError);
    audioRef.current = audio;
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeAttribute("src");
      audio.load();
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, [track?.id, track?.previewUrl]);

  async function togglePreview() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setPreviewFailed(true);
    }
  }

  const status = requestFailed
    ? "RECENT TRACK"
    : track?.isNowPlaying
      ? "NOW PLAYING"
      : "LAST PLAYED";
  const contentKey = `${track?.id ?? "empty"}-${requestFailed ? "failed" : status}`;

  function handleCardKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      void togglePreview();
    }
  }

  return (
    <div
      role={track?.previewUrl && !previewFailed ? "button" : undefined}
      tabIndex={track?.previewUrl && !previewFailed ? 0 : undefined}
      aria-label={
        track?.previewUrl
          ? `${playing ? "Pause" : "Play"} preview of ${track.title}`
          : undefined
      }
      onKeyDown={handleCardKeyDown}
      onClick={() => {
        if (track?.previewUrl && !previewFailed) void togglePreview();
      }}
      className={`ui-lift media-zoom relative col-span-1 flex h-full min-h-38 min-w-0 items-center gap-5 rounded-2xl border border-border bg-[#171717] p-4 text-foreground backdrop-blur-xl backdrop-saturate-150 max-[700px]:col-span-2 max-[480px]:gap-3 ${track?.previewUrl && !previewFailed ? "cursor-pointer" : ""}`}
    >
      <div className="relative aspect-square shrink-0 self-stretch overflow-hidden rounded-xl bg-muted shadow-md shadow-black/20">
        <AnimatePresence mode="wait" initial={false}>
          {track?.artwork ? (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={track.artwork}
                alt={`${track.title} by ${track.artist}`}
                fill
                loading="eager"
                sizes="(min-width: 700px) 160px, 42vw"
                className="rounded-xl object-cover"
                unoptimized
              />
            </motion.div>
          ) : (
            <motion.div
              key="no-artwork"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              className="flex h-full items-center justify-center text-neutral-500"
            >
              <FiMusic className="size-8" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex min-w-0 flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            className="flex min-w-0 flex-col"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {track
                ? status
                : requestFailed
                  ? "UNAVAILABLE"
                  : "CHECKING MUSIC"}
            </span>
            <span
              className="mt-0.5 truncate text-base font-semibold tracking-tight text-foreground"
              title={track?.title}
            >
              {track?.title ??
                (requestFailed ? "Music unavailable" : "Loading…")}
            </span>
            <span
              className="truncate text-sm text-muted-foreground"
              title={track?.artist}
            >
              {track?.artist}
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <button
            type="button"
            disabled={!track?.previewUrl || previewFailed}
            onClick={(event) => {
              event.stopPropagation();
              void togglePreview();
            }}
            className="ui-press flex w-fit cursor-pointer items-center gap-2 rounded-full bg-neutral-700 px-3.5 py-1 text-sm font-medium text-white transition-colors hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 [html.dark_&]:bg-white/10 [html.dark_&]:hover:bg-white/20"
          >
            {playing ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
            {previewFailed ? "Unavailable" : playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
      {track?.appleMusicUrl && (
        <a
          href={track.appleMusicUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="absolute right-4 top-4 text-neutral-500 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          aria-label={`Open ${track.title} in Apple Music`}
          title="Open in Apple Music"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="#A1A1A1"
            aria-hidden="true"
          >
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
          </svg>
        </a>
      )}
    </div>
  );
}
