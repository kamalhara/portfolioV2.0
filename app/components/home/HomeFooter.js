import { portfolio } from "@/app/data/portfolio";
import MonogramFooter from "./MonogramFooter";

/**
 * Main characters to rotate through.
 * Uses the `/quotes?character=` endpoint which returns 5 quotes,
 * then we pick the shortest one for a clean footer.
 */
const CHARACTER_ROTATION = [
  "Naruto Uzumaki",
  "Itachi Uchiha",
  "Kakashi Hatake",
  "Tanjiro Kamado",
  "Gojo Satoru",
  "Jiraiya",
  "Pain",
  "Madara Uchiha",
  "Rengoku",
];

/** Maximum character length for a quote to keep it short. */
const MAX_QUOTE_LENGTH = 140;

/**
 * Fetch an anime quote by character, cached for 3 hours via ISR.
 *
 * Rate-limit math:
 *   24 h ÷ 3 h = 8 revalidations/day → well under the 100-req free cap.
 *
 * Each 3-hour window picks one character from the rotation.
 * The endpoint returns up to 5 quotes; we pick the shortest one.
 */
async function getAnimeQuote() {
  try {
    const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
    const windowIndex = Math.floor(Date.now() / THREE_HOURS_MS);
    const character = CHARACTER_ROTATION[windowIndex % CHARACTER_ROTATION.length];

    const res = await fetch(
      `https://api.animechan.io/v1/quotes?character=${encodeURIComponent(character)}`,
      { next: { revalidate: 10800 } }, // 3 hours
    );

    if (!res.ok) return null;

    const { status, data } = await res.json();
    if (status !== "success" || !Array.isArray(data) || data.length === 0) return null;

    // Pick the shortest quote that fits the max length
    const short = data
      .filter((q) => q.content && q.content.length <= MAX_QUOTE_LENGTH)
      .sort((a, b) => a.content.length - b.content.length);

    const pick = short.length > 0 ? short[0] : data[0];

    return {
      content: pick.content,
      character: pick.character?.name ?? character,
      anime: pick.anime?.name ?? "",
    };
  } catch {
    return null;
  }
}

export default async function HomeFooter() {
  const quote = await getAnimeQuote();

  return (
    <footer className="mt-25 text-center max-[700px]:mt-21.25">
      <MonogramFooter />

      {quote ? (
        <>
          <p className="mt-22.5 max-w-[540px] mx-auto text-sm leading-[1.7] tracking-[.03em] [font-family:var(--font-geist-mono)] max-[700px]:mt-20">
            &ldquo;{quote.content}&rdquo;
          </p>
          <span className="mt-1.75 block text-xs leading-[1.6] text-muted-foreground [font-family:var(--font-geist-mono)]">
            — {quote.character} ({quote.anime})
          </span>
        </>
      ) : (
        <>
          <p className="mt-22.5 text-sm leading-[1.7] tracking-[.03em] [font-family:var(--font-geist-mono)] max-[700px]:mt-20">
            &ldquo;{portfolio.signoff}&rdquo;
          </p>
          <span className="mt-1.75 block text-xs leading-[1.6] text-muted-foreground [font-family:var(--font-geist-mono)]">
            — Kamalveer Singh
          </span>
        </>
      )}

      <nav
        className="mt-15 flex flex-wrap justify-center gap-4 text-xs [font-family:var(--font-geist-mono)]"
        aria-label="Social links"
      >
        <a
          className="ui-nudge inline-block text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          href={portfolio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
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
