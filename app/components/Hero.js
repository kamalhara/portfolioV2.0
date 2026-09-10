import Link from "next/link";
import Heading from "../ui/Heading";

export default function Hero() {
  return (
    <section
      id="start"
      aria-label="Introduction"
      className="relative mt-3 mb-16 pt-4 pb-8 sm:mt-6 sm:mb-20 md:pt-10 md:pb-10 lg:mb-25"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-paper-border lg:block"
      ></div>

      <Heading
        label1="00Intro"
        label2={`Portfolio — ${new Date().getFullYear()}`}
      />

      <h1 className="sr-only">Kamalveer — full-stack and mobile engineer.</h1>

      <div className="">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y-[1.5px] border-paper-border py-4 sm:gap-x-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-ink-text font-mono text-[12px] font-bold text-bg-cream">
              KS
            </span>
            <div className="font-mono text-[11px] uppercase tracking-widest">
              <div className="text-ink-text font-medium">Kamalveer</div>
              <div className="text-ink-muted">India</div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="hidden h-8 w-px bg-paper-border sm:block"
          ></div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Web / Mobile / Backend
          </div>
          <div className="flex w-full items-center gap-2.5 border-t border-paper-border/70 pt-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted sm:ml-auto sm:w-auto sm:border-0 sm:pt-0">
            <span className="relative flex h-1.5 w-1.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-60"
              ></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-orange"></span>
            </span>
            Available for work
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-12 sm:gap-6 md:py-10">
        <div className="sm:col-span-4">
          <Link
            href="#work"
            className="group inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-widest"
            style={{ color: "#8a8a8a" }}
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-y-0.5 motion-reduce:animate-none"
            >
              ↓
            </span>
            Scroll to explore
          </Link>
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-ink-text/70">
            Full-stack and mobile engineer building dependable products across
            interfaces, APIs, and real-time systems—{" "}
            <span className="text-ink-text">
              especially where those layers meet.
            </span>
          </p>
        </div>
      </div>

      <div className="">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 border-t-[1.5px] border-paper-border pt-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {[
            ["Focus", "Systems architecture · Mobile · APIs"],
            ["Exploring", "Agentic AI"],
            ["Core Stack", "React Native · Next.js · Node.js"],
            ["Next", "01 — Work"],
          ].map(([term, detail], index) => (
            <div key={term}>
              <dt className="font-mono text-sm uppercase tracking-widest text-ink-muted">
                {term}
              </dt>
              <dd className="mt-2 text-sm text-ink-text">
                {index === 3 ? (
                  <Link
                    href="#work"
                    className="group inline-flex items-center gap-2 text-ink-text transition-colors"
                  >
                    {detail}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 text-accent-orange"
                    >
                      →
                    </span>
                  </Link>
                ) : (
                  detail
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
