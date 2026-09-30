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
  const educationQuestion =
    /\b(education|degree|study|college|university)\b/i.test(question);
  const ageQuestion = /\b(age|old|born|birth year)\b/i.test(question);
  const languageQuestion =
    /\b(spoken languages?|speaks?|punjabi|hindi|english|programming languages?)\b/i.test(
      question,
    );
  const timeZoneQuestion = /\b(time\s?zones?|working hours|schedule)\b/i.test(
    question,
  );
  const interestQuestion =
    /\b(ai|artificial intelligence|chat apps?|interests?)\b/i.test(question);
  const hireQuestion = /\b(why hire|hire him|hire kamal|good fit)\b/i.test(
    question,
  );
  const deliveryQuestion =
    /\b(solo|alone|entire app|whole app|end.to.end)\b/i.test(question);
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
      (educationQuestion && section.id === "education" ? 12 : 0) +
      (ageQuestion && section.id === "age" ? 12 : 0) +
      (languageQuestion && section.id === "languages" ? 12 : 0) +
      (timeZoneQuestion && section.id === "time-zones" ? 12 : 0) +
      (interestQuestion && section.id === "interests" ? 8 : 0) +
      (hireQuestion && section.id === "why-hire" ? 12 : 0) +
      (deliveryQuestion && section.id === "end-to-end-delivery" ? 12 : 0) +
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
  const aliases: Record<string, string[]> = {
    "natours-backend-api": ["natours"],
    "the-wild-oasis-staff": [
      "wildoasisstaff",
      "wildoasisdashboard",
      "ownerdashboard",
    ],
    "dine-time-app": ["dinetime"],
    "world-wise": ["worldwise", "wordwise"],
  };
  const aliased = projects.find((project) =>
    aliases[project.slug]?.some((alias) => normalized.includes(alias)),
  );
  if (aliased) return aliased;
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
  if (!sections.length) return assistantFacts.responsePreferences.unknown;
  return sections
    .slice(0, 1)
    .map((section) => section.text)
    .join("");
}

export function answerFromPolicy(question: string): string | null {
  const normalized = question.trim();
  if (/^(hi|hello|hey)[.!?\s]*$/i.test(normalized)) {
    return "Hi! Ask me about Kamal's projects, skills, experience, or job search.";
  }
  if (
    /\b(weakness(?:es)?|weak(?:er)? points?|weak(?:er)? (?:skills?|areas?)|areas? (?:to improve|for improvement)|development gaps?|biggest flaw|worst (?:skill|project)|bad at|struggles? with|limitations?)\b/i.test(
      normalized,
    )
  ) {
    return assistantFacts.responsePreferences.weakness;
  }
  if (
    /\b(salary|compensation|pay|hourly rate|freelance rate)\b/i.test(normalized)
  ) {
    return assistantFacts.responsePreferences.salary;
  }
  if (/\b(age|how old|birth year|born)\b/i.test(normalized)) {
    return `Kamal was ${assistantFacts.ageAsOf} and was born in ${assistantFacts.birthYear}.`;
  }
  if (/\b(rcd|college portal|management portal)\b/i.test(normalized)) {
    return assistantFacts.responsePreferences.unknown;
  }
  if (
    /\b(how many years|years of experience|how many users|user count|revenue|downloads|gpa|grade point|number of clients)\b/i.test(
      normalized,
    )
  ) {
    return assistantFacts.responsePreferences.unknown;
  }
  if (
    /\b(why (?:should .* )?hire|should .* hire|good fit for (?:the|this|our) role)\b/i.test(
      normalized,
    )
  ) {
    return assistantFacts.responsePreferences.roleFit;
  }
  return null;
}
