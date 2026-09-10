import Link from "next/link";

export default function Hero() {
  return (
    <section id="start" aria-labelledby="hero-title" className="chapter-section intro-section">
      <div className="chapter-heading">
        <h2>Intro</h2>
        <p>Portfolio — 2026</p>
      </div>

      <h1 id="hero-title" className="sr-only">
        Kamalveer Singh — full-stack and mobile developer
      </h1>

      <div className="identity-strip">
        <div className="identity-name">
          <span className="identity-mark">KS</span>
          <span><strong>Kamalveer</strong><small>India</small></span>
        </div>
        <p>Web / mobile / backend</p>
        <p><span className="status-dot" /> Building Spotus</p>
      </div>

      <div className="intro-body">
        <Link href="#work" className="scroll-cue">↓ Scroll to explore</Link>
        <p>
          Full-stack and mobile engineer building dependable products across
          interfaces, APIs, real-time systems, and the places where those layers
          meet.
        </p>
      </div>

      <dl className="intro-ledger">
        <div><dt>Focus</dt><dd>Product systems · Mobile · APIs</dd></div>
        <div><dt>Currently shipping</dt><dd>Spotus · location-based social</dd></div>
        <div><dt>In production</dt><dd>React Native · Expo · Node.js</dd></div>
        <div><dt>Next</dt><dd><Link href="#work">01 — Work →</Link></dd></div>
      </dl>
    </section>
  );
}
