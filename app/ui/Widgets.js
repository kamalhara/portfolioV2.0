"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { portfolio } from "@/app/data/portfolio";
import nowPlaying from "@/app/data/nowPlaying";
import MagneticLogoCard from "../components/magneticLogo/MagneticLogoCard";

function getIndiaTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const part = (type) =>
    Number(parts.find((item) => item.type === type)?.value ?? 0);
  return { hour: part("hour"), minute: part("minute"), second: part("second") };
}

export function EmailCopy() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${portfolio.email}`;
    }
  }

  return (
    <button
      className="mt-5.5 inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-3.5"
      type="button"
      onClick={copyEmail}
    >
      {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      <span>{copied ? "Copied" : portfolio.email}</span>
    </button>
  );
}

function MusicCard() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (nowPlaying.previewUrl) {
      audioRef.current = new Audio(nowPlaying.previewUrl);
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener("ended", () => setPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      window.open(nowPlaying.appleMusicUrl, "_blank", "noopener");
      return;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open player for ${nowPlaying.title}`}
      onClick={togglePlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      }}
      className="relative col-span-1 flex h-full cursor-pointer items-center gap-5 overflow-hidden rounded-[15px] border border-border bg-card p-3.75 backdrop-blur-xl backdrop-saturate-150 transition-colorsd max-[700px]:col-span-2 max-[700px]:gap-4.25 max-[700px]:p-3.5 max-[480px]:gap-3.5"
    >
      {/* Album artwork */}
      <div className="relative aspect-square shrink-0 self-stretch">
        <Image
          alt={`${nowPlaying.title} by ${nowPlaying.artist}`}
          src={nowPlaying.artwork}
          fill
          sizes="(min-width: 640px) 155px, 136px"
          className="rounded-xl object-cover shadow-md shadow-black/20"
          unoptimized
        />
      </div>

      {/* Song info */}
      <div className="flex min-w-0 flex-1 flex-col mt-12">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recently Played
        </span>
        <span className="mt-0.5 truncate text-base font-semibold tracking-tight text-foreground">
          {nowPlaying.title}
        </span>
        <span className="truncate text-sm text-muted-foreground">
          {nowPlaying.artist}
        </span>
        <button
          type="button"
          className="mt-2.5 flex w-fit cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-sm font-medium text-white transition-colors hover:bg-white/20 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* Apple Music icon (top-right) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="absolute right-4 top-4 h-4 w-4 text-neutral-500"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
      </svg>
    </div>
  );
}

function ClockCard() {
  const [time, setTime] = useState(null);
  const secondHandRef = useRef(null);

  useEffect(() => {
    let frame;
    const updateSecondHand = () => {
      const now = new Date();
      const angle = (now.getSeconds() + now.getMilliseconds() / 1000) * 6;
      secondHandRef.current?.setAttribute(
        "transform",
        `rotate(${angle} 100 100)`,
      );
      frame = window.requestAnimationFrame(updateSecondHand);
    };

    const initialFrame = window.requestAnimationFrame(() =>
      setTime(getIndiaTime()),
    );
    frame = window.requestAnimationFrame(updateSecondHand);
    const timer = window.setInterval(() => setTime(getIndiaTime()), 1000);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  const center = 100;
  const hourAngle = time ? ((time.hour % 12) + time.minute / 60) * 30 : 0;
  const minuteAngle = time ? (time.minute + time.second / 60) * 6 : 0;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const radians = ((i * 6 - 90) * Math.PI) / 180;
    const isMajor = i % 5 === 0;
    const cosine = Math.cos(radians);
    const sine = Math.sin(radians);
    const outer = 94 / Math.max(Math.abs(cosine), Math.abs(sine));
    const inner = outer - (isMajor ? 15 : 7);
    const c = (v) => Number(v.toFixed(3));
    return {
      x1: c(center + cosine * inner),
      y1: c(center + sine * inner),
      x2: c(center + cosine * outer),
      y2: c(center + sine * outer),
      isMajor,
    };
  });

  return (
    <div
      className="relative aspect-square min-w-0 overflow-hidden rounded-2xl border bg-neutral-50/80 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-neutral-900/95"
      aria-label="Analog clock showing current time in India"
    >
      <svg
        className="absolute inset-0 h-full w-full transition-opacity duration-300"
        viewBox="0 0 200 200"
        role="img"
        aria-hidden="true"
      >
        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            strokeLinecap="round"
            strokeWidth={tick.isMajor ? 1.7 : 1.1}
            className={
              tick.isMajor
                ? "stroke-black dark:stroke-white"
                : "stroke-neutral-300 dark:stroke-neutral-600"
            }
          />
        ))}

        {/* Numbers */}
        <text
          x={center}
          y={43}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-black text-[26px] font-semibold tracking-tight dark:fill-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          12
        </text>
        <text
          x={157}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-black text-[26px] font-semibold tracking-tight dark:fill-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          3
        </text>
        <text
          x={center}
          y={155}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-black text-[26px] font-semibold tracking-tight dark:fill-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          6
        </text>
        <text
          x={43}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-black text-[26px] font-semibold tracking-tight dark:fill-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          9
        </text>

        {time && (
          <>
            {/* Hour hand — thin stem + thick outer */}
            <g transform={`rotate(${hourAngle} ${center} ${center})`}>
              <line
                x1={center}
                y1={center + 2}
                x2={center}
                y2={center - 17}
                strokeWidth="2.8"
                strokeLinecap="round"
                className="stroke-black dark:stroke-white"
              />
              <line
                x1={center}
                y1={center - 21}
                x2={center}
                y2={center - 50}
                strokeWidth="9"
                strokeLinecap="round"
                className="stroke-black dark:stroke-white"
              />
            </g>

            {/* Minute hand — thin stem + thick outer */}
            <g transform={`rotate(${minuteAngle} ${center} ${center})`}>
              <line
                x1={center}
                y1={center + 2}
                x2={center}
                y2={center - 17}
                strokeWidth="2.8"
                strokeLinecap="round"
                className="stroke-black dark:stroke-white"
              />
              <line
                x1={center}
                y1={center - 21}
                x2={center}
                y2={center - 75}
                strokeWidth="7.5"
                strokeLinecap="round"
                className="stroke-black dark:stroke-white"
              />
            </g>

            {/* Second hand — extends through center */}
            <g ref={secondHandRef}>
              <line
                x1={center}
                y1={center + 18}
                x2={center}
                y2={center - 85}
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke="var(--color-brand)"
              />
            </g>

            {/* Center pin */}
            <circle
              cx={center}
              cy={center}
              r="3.4"
              strokeWidth="2"
              stroke="var(--color-brand)"
              className="fill-neutral-50 dark:fill-neutral-900"
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default function PortfolioWidgets() {
  return (
    <div
      className="mt-11.75 grid grid-cols-[2.07fr_1fr_1fr] gap-4 max-[700px]:mt-10.75 max-[700px]:grid-cols-2 max-[700px]:gap-3"
      aria-label="Featured project and live widgets"
    >
      <MusicCard />
      <ClockCard />
      <MagneticLogoCard />
    </div>
  );
}
