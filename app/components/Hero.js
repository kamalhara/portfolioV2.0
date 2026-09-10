import Link from "next/link";

export default function Hero() {
  return (
    <section id="start" aria-labelledby="hero-title" className="mb-28 pt-4">
      <div className="mb-6 flex items-center justify-between border-b border-paper-border pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted"><span>00 Intro</span><span>Portfolio — 2026</span></div>
      <div className="mb-12 grid grid-cols-1 border border-paper-border bg-bg-cream-light/70 md:grid-cols-12">
        <div className="flex items-center gap-3 border-b border-paper-border p-3.5 md:col-span-5 md:border-r md:border-b-0">
          <span className="grid h-7 w-7 place-items-center rounded-sm bg-ink-text font-mono text-[10px] font-bold text-bg-cream">KS</span>
          <span><strong className="block font-mono text-xs uppercase tracking-wide">Kamalveer</strong><small className="font-mono text-[10px] text-ink-muted">INDIA</small></span>
        </div>
        <p className="flex items-center border-b border-paper-border p-3.5 font-mono text-xs uppercase tracking-wider text-ink-muted md:col-span-4 md:border-r md:border-b-0">Web / Mobile / Backend</p>
        <p className="flex items-center gap-2 p-3.5 font-mono text-[11px] uppercase tracking-wide md:col-span-3 md:justify-end"><span className="h-2 w-2 animate-[quiet-pulse_2.2s_ease-in-out_infinite] rounded-full bg-accent-orange" />Building Spotus</p>
      </div>
      <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="pt-2 md:col-span-3"><Link href="#work" className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">↓ Scroll to explore</Link></div>
        <h1 id="hero-title" className="text-2xl leading-snug font-normal tracking-tight sm:text-3xl md:col-span-9 md:text-[34px]">Full-stack and mobile engineer building dependable products across interfaces, APIs, and real-time systems—<strong className="font-semibold">especially where those layers meet.</strong></h1>
      </div>
      <dl className="grid grid-cols-1 divide-y divide-paper-border border border-paper-border text-xs sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4">
        {[["Focus", "Product systems · Mobile · APIs"], ["Currently shipping", "Spotus · location-based social"], ["In production", "React Native · Expo · Node.js"], ["Next", "01 — Work →"]].map(([term, detail], index) => (
          <div key={term} className={`flex min-h-28 flex-col justify-between space-y-3 p-4 ${index > 1 ? "sm:border-t sm:border-paper-border md:border-t-0" : ""}`}><dt className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">{term}</dt><dd className="m-0 font-medium">{index === 3 ? <Link className="font-mono transition-transform hover:translate-x-0.5" href="#work">{detail}</Link> : detail}</dd></div>
        ))}
      </dl>
    </section>
  );
}
