import { portfolio } from "@/app/data/portfolio";

export default function HomeFooter() {
  return (
    <footer className="mt-25 text-center max-[700px]:mt-21.25">
      <div
        className="h-[min(41vw,390px)] pr-[0.15em] text-[min(43vw,445px)] leading-[.8] font-extrabold tracking-[-.15em] text-[#363636] select-none max-[700px]:h-[35vw] max-[700px]:text-[41vw]"
        aria-hidden="true"
      >
        KS
      </div>
      <p className="mt-22.5 text-sm leading-[1.7] tracking-[.03em] [font-family:var(--font-geist-mono)] max-[700px]:mt-20">
        “{portfolio.signoff}”
      </p>
      <span className="mt-1.75 block text-xs leading-[1.6] text-muted-foreground [font-family:var(--font-geist-mono)]">
        — Kamalveer Singh
      </span>
      <nav
        className="mt-15 flex flex-wrap justify-center gap-4 text-xs [font-family:var(--font-geist-mono)]"
        aria-label="Social links"
      >
        <a
          className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
          href={portfolio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
          href={`mailto:${portfolio.email}`}
        >
          Email
        </a>
        <a
          className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
          href={portfolio.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
          href={portfolio.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé
        </a>
      </nav>
    </footer>
  );
}
