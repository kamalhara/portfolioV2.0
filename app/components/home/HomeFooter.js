import { portfolio } from "@/app/data/portfolio";
import { animeQuotes } from "@/app/data/quotes";
import MonogramFooter from "./MonogramFooter";
import RotatingQuote from "./RotatingQuote";

/** Pick a random quote — runs once per server render (SSR/ISR). */
function getRandomQuote() {
  return animeQuotes[Math.floor(Math.random() * animeQuotes.length)];
}

export default function HomeFooter() {
  const quote = getRandomQuote();

  return (
    <footer className="mt-25 text-center max-[700px]:mt-21.25">
      <MonogramFooter />

      <RotatingQuote initialIndex={animeQuotes.indexOf(quote)} />

      <nav
        className="mt-15 flex flex-wrap justify-center gap-4 text-xs [font-family:var(--font-geist-mono)]"
        aria-label="Social links"
      >
        <a
          className="ui-nudge inline-block text-muted-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-foreground"
          href={portfolio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <a
          className="ui-nudge inline-block text-muted-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-foreground"
          href="https://x.com/hara_kamal56547"
        >
          X
        </a>

        <a
          className="ui-nudge inline-block text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          href={`mailto:${portfolio.email}`}
        >
          Email
        </a>
        <a
          className="ui-nudge inline-block text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          href={portfolio.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="ui-nudge inline-block text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
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
