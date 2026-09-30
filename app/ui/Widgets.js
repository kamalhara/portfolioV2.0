"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { portfolio } from "@/app/data/portfolio";
import MusicCard from "@/app/components/music/MusicCard";
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
      className="ui-press mt-5.5 inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-3.5"
      type="button"
      onClick={copyEmail}
    >
      {copied ? (
        <FiCheck className="content-enter" aria-hidden="true" />
      ) : (
        <FiCopy className="content-enter" aria-hidden="true" />
      )}
      <span>{copied ? "Copied" : portfolio.email}</span>
    </button>
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
      className="widget-grid mt-11.75 grid grid-cols-[2.07fr_1fr_1fr] gap-4 max-[700px]:mt-10.75 max-[700px]:grid-cols-2 max-[700px]:gap-3"
      aria-label="Featured project and live widgets"
    >
      <MusicCard />
      <ClockCard />
      <MagneticLogoCard />
    </div>
  );
}
