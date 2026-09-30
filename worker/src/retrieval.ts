import { assistantFacts } from "../../app/data/assistantFacts.js";
import { projects } from "../../app/data/project.js";
import type { KnowledgeSection } from "./knowledge";

const stopWords = new Set([
  "about",
  "are",
  "can",
  "does",
  "did",
  "do",
  "for",
  "has",
  "have",
  "he",
  "him",
  "his",
  "how",
  "in",
  "is",
  "it",
  "kamal",
  "kamalveer",
  "of",
  "on",
  "the",
  "to",
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

function containsWord(text: string, word: string): boolean {
  return new RegExp(`\\b${word}\\b`).test(text);
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
  const educationQuestion =
    /\b(education|degree|study|college|university)\b/i.test(question);
  const availabilityQuestion =
    /\b(available|availability|hire|hired|opportunities|freelance)\b/i.test(
      question,
    );
  const contactQuestion = /\b(contact|email|reach)\b/i.test(question);
  const resumeQuestion = /\b(resume|cv|résumé)\b/i.test(question);
  const technologyQuestion =
    /\b(tech|technologies|stack|languages|tools|frameworks)\b/i.test(question);
  const scored = sections.map((section) => {
    const title = section.title.toLowerCase();
    const body = section.text.toLowerCase();
    const lexicalScore = query.reduce(
      (sum, term) =>
        sum +
        (containsWord(title, term) ? 4 : 0) +
        (containsWord(body, term) ? 1 : 0),
      0,
    );
    const score =
      lexicalScore +
      (locationQuestion && section.id === "location" ? 12 : 0) +
      (improvementQuestion && section.id === "improving" ? 12 : 0) +
      (educationQuestion && section.id === "education" ? 12 : 0) +
      (availabilityQuestion && section.id === "opportunities" ? 12 : 0) +
      (contactQuestion && section.id === "contact" ? 12 : 0) +
      (resumeQuestion && section.id === "resume" ? 12 : 0) +
      (technologyQuestion && section.id === "skills:frontend" ? 8 : 0);
    return { section, score };
  });
  const matched = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ section }) => section);
  return matched;
}

function projectInQuestion(question: string) {
  const normalized = question.toLowerCase().replace(/[^a-z0-9]/g, "");
  return projects.find((project) =>
    normalized.includes(project.title.toLowerCase().replace(/[^a-z0-9]/g, "")),
  );
}

export function selectEvidence(
  question: string,
  ranked: KnowledgeSection[],
  all: KnowledgeSection[],
): KnowledgeSection[] {
  const byId = new Map(all.map((section) => [section.id, section]));
  const selected: KnowledgeSection[] = [];
  const add = (id: string) => {
    const section = byId.get(id);
    if (section && !selected.includes(section)) selected.push(section);
  };
  const comparison =
    /\b(best|top|strongest|flagship|showcase|recommend|most impressive)\b/i.test(
      question,
    );
  const projectQuestion = /\b(projects?|portfolio|work)\b/i.test(question);
  const skillQuestion =
    /\b(skills?|strengths?|good at|expertise|technologies|tech stack)\b/i.test(
      question,
    );
  const namedProject = projectInQuestion(question);

  if (comparison && projectQuestion) {
    if (namedProject) {
      add(`assessment:${namedProject.slug}`);
      add("showcase-projects");
      add(`project:${namedProject.slug}`);
    } else {
      add("showcase-projects");
      const slugs = /\b(mobile|app)\b/i.test(question)
        ? ["spotus", "ryde"]
        : /\b(backend|api|server)\b/i.test(question)
          ? ["productify", "natours-backend-api"]
          : assistantFacts.showcaseProjects
              .slice(0, 3)
              .map((item) => item.slug);
      slugs.forEach((slug) => add(`project:${slug}`));
    }
    return selected;
  }

  if (
    comparison &&
    skillQuestion &&
    !/\b(backend|database|mobile)\b/i.test(question)
  ) {
    add("strengths");
    add("skills:frontend");
    return selected;
  }

  if (namedProject) {
    add(`assessment:${namedProject.slug}`);
    add(`project:${namedProject.slug}`);
    if (/\b(tech|stack|built with|framework)\b/i.test(question)) {
      add(`technology:${namedProject.slug}`);
    } else {
      add(`features:${namedProject.slug}`);
    }
    return selected;
  }

  if (
    rankByText(all, question, 1).length === 0 &&
    !/^(hi|hello|hey)[.!?\s]*$/i.test(question)
  ) {
    return [];
  }
  return ranked.slice(0, 4);
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
    return "I don't have that detail in Kamal's portfolio. Please ask him directly.";
  return sections
    .slice(0, 1)
    .map((section) => section.text)
    .join("");
}
