import { portfolio } from "../../app/data/portfolio.js";
import type { KnowledgeLink, KnowledgeSection } from "./knowledge";

// Links are selected from verified data, never from generated answer text.
export function answerLinks(
  question: string,
  sections: KnowledgeSection[],
  needsContact = false,
): KnowledgeLink[] {
  const contact = { label: "Contact Kamal", href: `mailto:${portfolio.email}` };
  if (
    needsContact ||
    /\b(contact|email|reach|hire|salary|compensation)\b/i.test(question)
  ) {
    return [contact];
  }
  if (/\b(resume|cv|résumé)\b/i.test(question)) {
    return [{ label: "View resume", href: portfolio.resume }];
  }
  const projects = sections.filter((section) =>
    section.id.startsWith("project:"),
  );
  const links = sections.flatMap((section) => section.links);
  if (/\b(source|code|github|repository|repo)\b/i.test(question)) {
    const source = links.find((link) => link.label === "Source code");
    if (source) return [{ ...source, label: "View source code" }];
  }
  if (/\b(live|demo|visit|try)\b/i.test(question)) {
    const live = links.find((link) => link.label === "Live project");
    if (live) return [{ ...live, label: "View live project" }];
  }
  if (
    sections.some((section) => section.id === "showcase-projects") ||
    projects.length > 1
  ) {
    return [{ label: "View projects", href: "/project" }];
  }
  if (projects.length === 1) {
    const page = projects[0].links.find(
      (link) => link.label === "Portfolio page",
    );
    if (page) return [{ ...page, label: "View project" }];
  }
  return [];
}
