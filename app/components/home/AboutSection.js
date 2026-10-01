import { portfolio } from "@/app/data/portfolio";

export default function AboutSection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="about"
      aria-labelledby="about-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="about-heading"
      >
        About
      </h2>
      <h3 className="mb-4 max-w-140 text-[clamp(22px,4vw,28px)] leading-[1.3] font-medium tracking-[-.045em]">
        {portfolio.aboutHeading}
      </h3>
      <p className="max-w-167.5">{portfolio.about}</p>
      <p className="mt-3.25 max-w-167.5 text-muted-foreground">
        {portfolio.aboutDetail}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {portfolio.aboutContext.map((context) => (
            <li key={context} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-brand/70"
              />
              {context}
            </li>
          ))}
        </ul>
        <a
          href={portfolio.resume}
          className="ui-nudge inline-block underline underline-offset-4 transition-colors hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          view résumé ↗
        </a>
      </div>
    </section>
  );
}
