import type { KnowledgeSection } from "./knowledge";

const stopWords = new Set([
  "about",
  "are",
  "can",
  "does",
  "for",
  "has",
  "his",
  "how",
  "kamal",
  "kamalveer",
  "the",
  "their",
  "this",
  "what",
  "where",
  "which",
  "with",
  "would",
  "you",
]);

function terms(text: string): string[] {
  return (
    text
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.filter((word) => word.length > 1 && !stopWords.has(word)) ?? []
  );
}

export function rankByText(
  sections: KnowledgeSection[],
  question: string,
  limit = 5,
): KnowledgeSection[] {
  const query = [...new Set(terms(question))];
  const locationQuestion = /\b(where|location|located|based|city)\b/i.test(
    question,
  );
  const improvementQuestion =
    /\b(weak|weaker|weakness|improv|strengthen|gap)\w*\b/i.test(question);
  const scored = sections.map((section) => {
    const title = section.title.toLowerCase();
    const body = section.text.toLowerCase();
    const lexicalScore = query.reduce(
      (sum, term) =>
        sum + (title.includes(term) ? 4 : 0) + (body.includes(term) ? 1 : 0),
      0,
    );
    const score =
      lexicalScore +
      (locationQuestion && section.id === "location" ? 12 : 0) +
      (improvementQuestion && section.id === "improving" ? 12 : 0);
    return { section, score };
  });
  const matched = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ section }) => section);
  return matched.length
    ? matched
    : sections.filter((section) => section.id === "about");
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || !a.length) return 0;
  let dot = 0;
  let aLength = 0;
  let bLength = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    aLength += a[index] ** 2;
    bLength += b[index] ** 2;
  }
  return dot / (Math.sqrt(aLength) * Math.sqrt(bLength) || 1);
}

export function rankByEmbedding(
  sections: KnowledgeSection[],
  vectors: number[][],
  queryVector: number[],
  limit = 5,
): KnowledgeSection[] {
  if (vectors.length !== sections.length) {
    throw new Error("Knowledge index is out of sync");
  }
  return sections
    .map((section, index) => ({
      section,
      score: cosineSimilarity(vectors[index], queryVector),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ section }) => section);
}

export function directAnswer(sections: KnowledgeSection[]): string {
  if (!sections.length)
    return "The portfolio does not specify that detail. Contact Kamal for more information.";
  return sections
    .slice(0, 2)
    .map((section) => section.text)
    .join("\n\n");
}
