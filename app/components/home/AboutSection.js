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
      <p className="max-w-167.5">{portfolio.about}</p>
      <p className="mt-3.25 max-w-167.5 text-muted-foreground">
        My recent work spans mobile products, open-source components,
        authentication, real-time messaging, maps, and the services behind
        them.
      </p>
      <a
        href={portfolio.resume}
        className="mt-7 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        target="_blank"
        rel="noopener noreferrer"
      >
        view résumé
      </a>
    </section>
  );
}
