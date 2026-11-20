import assert from "node:assert/strict";
import test from "node:test";
import { animeQuotes } from "../app/data/quotes.js";

test("quotes dataset has equal length across all 4 anime and concise content", () => {
  const expectedAnimes = [
    "Naruto",
    "Naruto Shippuden",
    "Jujutsu Kaisen",
    "Demon Slayer",
  ];

  const counts = {};
  for (const quote of animeQuotes) {
    assert.ok(quote.content && quote.content.trim().length > 0, "quote has non-empty content");
    assert.ok(quote.character && quote.character.trim().length > 0, "quote has a character");
    assert.ok(quote.anime && quote.anime.trim().length > 0, "quote has an anime title");
    assert.ok(
      quote.content.length <= 100,
      `quote exceeds 100 chars (${quote.content.length}): "${quote.content}"`,
    );

    counts[quote.anime] = (counts[quote.anime] || 0) + 1;
  }

  // Verify all 4 expected animes exist
  for (const anime of expectedAnimes) {
    assert.ok(counts[anime], `missing anime: ${anime}`);
  }

  // Verify all 4 anime have the exact same count / length
  const lengths = expectedAnimes.map((a) => counts[a]);
  const targetLength = lengths[0];
  assert.ok(targetLength >= 10, "each anime has at least 10 quotes");

  for (const len of lengths) {
    assert.equal(len, targetLength, "all anime have the exact same count of quotes");
  }

  assert.equal(animeQuotes.length, targetLength * 4, "total quotes match expected sum");
});
