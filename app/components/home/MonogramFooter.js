"use client";

import { useId } from "react";

// Both letters share a 240 × 320 construction box and a 96-unit stroke.
// Their boxes are equally spaced around the composition's center at x = 580.
const letterPaths = [
  "M280 190V510",
  "M280 350L520 190",
  "M280 350L520 510",
  "M860 230C825 198 800 190 760 190C690 190 640 224 640 270C640 314 688 336 760 350C832 364 880 386 880 430C880 476 830 510 760 510C720 510 695 502 660 470",
];
const horizontalGuides = [142, 190, 270, 350, 430, 510, 558];
const verticalGuides = [232, 280, 520, 580, 640, 880, 928];
const diagonalAngle = (Math.atan2(160, 240) * 180) / Math.PI;

export default function MonogramFooter() {
  const id = useId();
  const fadeId = `${id}-fade`;
  const fadeMaskId = `${id}-fade-mask`;
  const outlineMaskId = `${id}-outline-mask`;
  const inkId = `${id}-ink`;

  return (
    <div
      className="footer-monogram mt-12"
      role="img"
      aria-label="Kamalveer Singh's KS initials with geometric construction guides"
    >
      <svg
        viewBox="0 0 1160 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full"
      >
        <defs>
          <linearGradient
            id={inkId}
            x1="0"
            y1="190"
            x2="0"
            y2="510"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--monogram-strong)" />
            <stop offset="1" stopColor="var(--monogram-soft)" />
          </linearGradient>
          <radialGradient id={fadeId}>
            <stop offset="35%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
          <mask
            id={fadeMaskId}
            x="0"
            y="0"
            width="1160"
            height="700"
            maskUnits="userSpaceOnUse"
          >
            <rect width="1160" height="700" fill={`url(#${fadeId})`} />
          </mask>
          <mask
            id={outlineMaskId}
            x="0"
            y="0"
            width="1160"
            height="700"
            maskUnits="userSpaceOnUse"
          >
            <rect width="1160" height="700" fill="white" />
            <g
              stroke="black"
              strokeWidth="96"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {letterPaths.map((path) => (
                <path key={path} d={path} />
              ))}
            </g>
          </mask>
        </defs>

        <g
          mask={`url(#${fadeMaskId})`}
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 9"
          strokeLinecap="round"
          className="monogram-guides"
        >
          <g className="monogram-dashes">
            {horizontalGuides.map((y) => (
              <path key={y} d={`M0 ${y}H1160`} />
            ))}
          </g>
          <g className="monogram-dashes monogram-dashes-reverse">
            {verticalGuides.map((x) => (
              <path key={x} d={`M${x} 0V700`} />
            ))}
          </g>
          {[-240, 0, 240].flatMap((offset) =>
            [-1, 1].map((direction) => (
              <path
                key={`${offset}-${direction}`}
                d="M-220 350H1380"
                transform={`translate(${offset} 0) rotate(${direction * diagonalAngle} 580 350)`}
                className={
                  direction === 1
                    ? "monogram-dashes"
                    : "monogram-dashes monogram-dashes-reverse"
                }
              />
            )),
          )}
        </g>

        <g
          mask={`url(#${outlineMaskId})`}
          stroke="currentColor"
          strokeWidth="112"
          strokeDasharray="4 9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="monogram-outline monogram-dashes"
        >
          {letterPaths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>

        <g strokeWidth="96" strokeLinecap="round" strokeLinejoin="round">
          {letterPaths.map((path, index) => (
            <path
              key={path}
              d={path}
              stroke={
                index === 3
                  ? `url(#${inkId})`
                  : index === 2
                    ? "var(--monogram-soft)"
                    : "var(--monogram-strong)"
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
