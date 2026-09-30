"use client";

/**
 * MonogramFooter – architectural line-art "KS" monogram.
 *
 * Every construction band is computed from the letter geometry:
 * – Horizontal bands at letter top / center / bottom
 * – ±45° diagonal bands matching the K arm angles
 * – Small node dots at key geometric intersections
 *
 * The result feels like a single cohesive blueprint.
 */
export default function MonogramFooter() {
  /* ── Core letter geometry ── */
  const CX = 756;    // viewport horizontal center
  const CY = 498;    // vertical center
  const TOP = 248;   // letter top
  const BOT = 748;   // letter bottom
  const MID = CY;    // letter center / K junction
  const QU = 373;    // quarter up
  const QD = 623;    // quarter down

  const KX = 440;    // K stem x
  const KAX = 700;   // K arm-end x
  const SL = 930;    // S left extent
  const SR = 1110;   // S right extent

  /* ── Diagonal intercepts (symmetric around composition center) ──
   * 45° lines: y = x + c   → center line c₀ = CY − CX = −258
   * −45° lines: y = −x + c′ → center line c₀′ = CX + CY = 1254
   */
  const c0 = CY - CX;        // -258
  const cp0 = CX + CY;       // 1254
  const SPACING = 280;        // perpendicular spacing ≈ 198 px

  /* 45° band intercepts */
  const diag45 = [c0 - 2 * SPACING, c0 - SPACING, c0, c0 + SPACING, c0 + 2 * SPACING];
  /* −45° band intercepts */
  const diagN45 = [cp0 - 2 * SPACING, cp0 - SPACING, cp0, cp0 + SPACING, cp0 + 2 * SPACING];

  /* ── Collect intersection dots ── */
  const dots = [];
  const hLines = [TOP, QU, MID, QD, BOT];

  // Horizontal × 45° intersections: x = y − c
  hLines.forEach((y) => {
    diag45.forEach((c) => {
      const x = y - c;
      if (x > 50 && x < 1462 && y > 50 && y < 946) dots.push({ x, y });
    });
  });

  // Horizontal × −45° intersections: x = c′ − y
  hLines.forEach((y) => {
    diagN45.forEach((cp) => {
      const x = cp - y;
      if (x > 50 && x < 1462 && y > 50 && y < 946) dots.push({ x, y });
    });
  });

  // 45° × −45° intersections: x = (c′ − c) / 2, y = (c′ + c) / 2
  diag45.forEach((c) => {
    diagN45.forEach((cp) => {
      const x = (cp - c) / 2;
      const y = (cp + c) / 2;
      if (x > 50 && x < 1462 && y > 80 && y < 916) dots.push({ x, y });
    });
  });

  // Deduplicate dots close to each other
  const uniqueDots = [];
  dots.forEach((d) => {
    const isDupe = uniqueDots.some(
      (u) => Math.abs(u.x - d.x) < 15 && Math.abs(u.y - d.y) < 15,
    );
    if (!isDupe) uniqueDots.push(d);
  });

  /* ── Diagonal band length — spans viewport diagonal ── */
  const DIAG_LEN = 2200;

  return (
    <div
      className={[
        "mt-12",
        "[--mg-surface:var(--color-background)]",
        "[--mg-fill-solid:rgb(170,167,160)]",
        "[--mg-fill-strong:rgb(170,167,160,0.78)]",
        "[--mg-fill-soft:rgb(170,167,160,0.45)]",
        "[--mg-outline:rgb(0,0,0)]",
        "[--mg-dot:rgb(0,0,0,0.12)]",
        "dark:[--mg-surface:var(--color-background)]",
        "dark:[--mg-fill-solid:rgb(255,255,255,0.26)]",
        "dark:[--mg-fill-strong:rgb(255,255,255,0.18)]",
        "dark:[--mg-fill-soft:rgb(255,255,255,0.10)]",
        "dark:[--mg-outline:rgb(255,255,255)]",
        "dark:[--mg-dot:rgb(255,255,255,0.18)]",
      ].join(" ")}
    >
      <div className="w-full">
        <svg
          width="1512"
          height="996"
          viewBox="0 0 1512 996"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          className="block h-auto w-full"
        >
          <defs>
            <linearGradient id="mg-hfade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--mg-outline)" stopOpacity="0" />
              <stop offset="10%" stopColor="var(--mg-outline)" stopOpacity="0.14" />
              <stop offset="50%" stopColor="var(--mg-outline)" stopOpacity="0.18" />
              <stop offset="90%" stopColor="var(--mg-outline)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--mg-outline)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mg-dfade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--mg-outline)" stopOpacity="0" />
              <stop offset="15%" stopColor="var(--mg-outline)" stopOpacity="0.12" />
              <stop offset="50%" stopColor="var(--mg-outline)" stopOpacity="0.16" />
              <stop offset="85%" stopColor="var(--mg-outline)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--mg-outline)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="mg-clip">
              <rect width="1512" height="996" />
            </clipPath>
          </defs>

          <g clipPath="url(#mg-clip)">
            <rect width="1512" height="996" fill="var(--mg-surface)" />

            {/* ═══════════ HORIZONTAL BANDS ═══════════
                Aligned to letter top / quarter / center / quarter / bottom */}
            {hLines.map((y, i) => {
              const h = i === 2 ? 96 : 80;
              const w = (i === 1 || i === 3) ? 900 : 1512;
              const xOff = (i === 1) ? 0 : (i === 3) ? 612 : 0;
              return (
                <g key={`hb-${i}`}>
                  <rect x={xOff} y={y - h / 2} width={w} height={h} fill="var(--mg-surface)" />
                  <rect
                    x={xOff - 2} y={y - h / 2 - 2}
                    width={w + 4} height={h + 4}
                    stroke="url(#mg-hfade)" strokeOpacity="0.22"
                    strokeWidth="3" strokeDasharray="7 7" fill="none"
                  />
                </g>
              );
            })}

            {/* ═══════════ 45° DIAGONAL BANDS ═══════════
                Matching K lower-leg angle, symmetric spacing */}
            {diag45.map((c, i) => {
              // Point on the line closest to viewport center
              const px = (CX - c + CY) / 2;
              const py = (CX + c + CY) / 2;
              return (
                <rect
                  key={`d45-${i}`}
                  x={px - DIAG_LEN / 2} y={py - 48}
                  width={DIAG_LEN} height={96}
                  fill="none"
                  stroke="url(#mg-dfade)" strokeOpacity="0.20"
                  strokeWidth="3" strokeDasharray="7 7"
                  transform={`rotate(45 ${px} ${py})`}
                />
              );
            })}

            {/* ═══════════ −45° DIAGONAL BANDS ═══════════
                Matching K upper-arm angle, symmetric spacing */}
            {diagN45.map((cp, i) => {
              const px = (cp + CX - CY) / 2;
              const py = (cp - CX + CY) / 2;
              return (
                <rect
                  key={`dn45-${i}`}
                  x={px - DIAG_LEN / 2} y={py - 48}
                  width={DIAG_LEN} height={96}
                  fill="none"
                  stroke="url(#mg-dfade)" strokeOpacity="0.20"
                  strokeWidth="3" strokeDasharray="7 7"
                  transform={`rotate(-45 ${px} ${py})`}
                />
              );
            })}

            {/* ═══════════ INTERSECTION DOTS ═══════════
                Small circles where construction lines cross */}
            {uniqueDots.map((d, i) => (
              <circle
                key={`dot-${i}`}
                cx={d.x} cy={d.y} r="3.5"
                fill="var(--mg-dot)"
              />
            ))}

            {/* ═══════════ LETTER K ═══════════
                Three thick round-cap strokes.
                Arm angles = ±45° to match the construction grid. */}
            <g fill="none" strokeLinecap="round">
              {/* Vertical stem */}
              <line
                x1={KX} y1={TOP}
                x2={KX} y2={BOT}
                strokeWidth="102"
                stroke="var(--mg-fill-solid)"
              />
              {/* Upper arm — 45° up-right from junction */}
              <line
                x1={KX} y1={MID}
                x2={KAX} y2={TOP}
                strokeWidth="102"
                stroke="var(--mg-fill-strong)"
              />
              {/* Lower leg — 45° down-right from junction */}
              <line
                x1={KX} y1={MID}
                x2={KAX} y2={BOT}
                strokeWidth="102"
                stroke="var(--mg-fill-soft)"
              />
            </g>

            {/* ═══════════ LETTER S ═══════════
                Layered bezier curves with thick round-cap strokes.
                Three layers at different opacities for depth. */}
            <g fill="none" strokeLinecap="round">
              {/* Full S silhouette — base layer */}
              <path
                d={`M ${SR} ${TOP + 68}
                    C ${SR} ${TOP + 10}, ${SL} ${TOP + 5}, ${SL} ${QU + 20}
                    C ${SL} ${MID - 30}, ${SR} ${MID + 30}, ${SR} ${QD - 20}
                    C ${SR} ${BOT - 5}, ${SL} ${BOT - 10}, ${SL} ${BOT - 68}`}
                strokeWidth="100"
                stroke="var(--mg-fill-soft)"
              />
              {/* Top half overlay */}
              <path
                d={`M ${SR} ${TOP + 68}
                    C ${SR} ${TOP + 10}, ${SL} ${TOP + 5}, ${SL} ${QU + 20}
                    C ${SL} ${MID - 50}, ${(SL + SR) / 2} ${MID - 15}, ${(SL + SR) / 2 + 20} ${MID}`}
                strokeWidth="100"
                stroke="var(--mg-fill-solid)"
              />
              {/* Bottom half overlay */}
              <path
                d={`M ${(SL + SR) / 2 - 20} ${MID}
                    C ${(SL + SR) / 2} ${MID + 15}, ${SR} ${MID + 50}, ${SR} ${QD - 20}
                    C ${SR} ${BOT - 5}, ${SL} ${BOT - 10}, ${SL} ${BOT - 68}`}
                strokeWidth="100"
                stroke="var(--mg-fill-strong)"
              />
            </g>

            {/* ═══════════ ACCENT DOTS ON LETTERS ═══════════
                Larger dots at letter endpoints for extra geometric flair */}
            {[
              { x: KX, y: TOP },           // K stem top
              { x: KX, y: BOT },           // K stem bottom
              { x: KAX, y: TOP },          // K upper arm tip
              { x: KAX, y: BOT },          // K lower leg tip
              { x: KX, y: MID },           // K junction
              { x: SR, y: TOP + 68 },      // S top
              { x: SL, y: BOT - 68 },      // S bottom
            ].map((d, i) => (
              <circle
                key={`adot-${i}`}
                cx={d.x} cy={d.y} r="6"
                fill="var(--mg-dot)"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
