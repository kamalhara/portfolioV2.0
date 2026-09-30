import { assistantFacts } from "../../app/data/assistantFacts.js";
import { portfolio } from "../../app/data/portfolio.js";
import { projects } from "../../app/data/project.js";
import { experiences } from "../../app/data/experience.js";

export type KnowledgeLink = {
  label: string;
  href: string;
};

export type KnowledgeSection = {
  id: string;
  title: string;
  text: string;
  links: KnowledgeLink[];
};

function joinFacts(facts: Array<string | null | undefined>): string {
  return facts.filter((fact): fact is string => Boolean(fact)).join(" ");
}

const profileSections: KnowledgeSection[] = [
  {
    id: "about",
    title: "About Kamalveer",
    text: joinFacts([
      `Name: ${portfolio.name}.`,
      `Role: ${portfolio.role}.`,
      portfolio.currently,
      portfolio.about,
    ]),
    links: [],
  },
  {
    id: "location",
    title: "Location",
    text: `${portfolio.name} is based in ${assistantFacts.location}.`,
    links: [],
  },
  {
    id: "education",
    title: "Education",
    text: `${portfolio.name} is a ${assistantFacts.education}.`,
    links: [],
  },
  ...Object.entries(assistantFacts.skills).map(([category, skills]) => ({
    id: `skills:${category}`,
    title: `${category} skills`,
    text: `${portfolio.name}'s ${category} skills include ${skills.join(", ")}.`,
    links: [{ label: "Technical skills", href: "/#stack" }],
  })),
  {
    id: "strengths",
    title: "Strengths",
    text: `${portfolio.name}'s strongest skills are ${assistantFacts.strengths.join(", ")}. StateGlyph, Spotus, and Productify demonstrate this work.`,
    links: [{ label: "Projects", href: "/project" }],
  },
  {
    id: "showcase-projects",
    title: "Recruiter showcase projects",
    text: `Kamal's recommended showcase projects, in order: ${assistantFacts.showcaseProjects
      .map((item, index) => {
        const project = projects.find(
          (candidate) => candidate.slug === item.slug,
        );
        return `${index + 1}. ${project?.title ?? item.slug}: ${item.reason}`;
      })
      .join(
        "; ",
      )}. These are recommendations based on Kamal's featured portfolio work, not measured rankings.`,
    links: assistantFacts.showcaseProjects.slice(0, 3).map((item) => ({
      label:
        projects.find((project) => project.slug === item.slug)?.title ??
        item.slug,
      href: `/project/${item.slug}`,
    })),
  },
  ...Object.entries(assistantFacts.projectAssessments).map(([slug, text]) => ({
    id: `assessment:${slug}`,
    title: `${projects.find((project) => project.slug === slug)?.title ?? slug} portfolio assessment`,
    text,
    links: [
      {
        label: projects.find((project) => project.slug === slug)?.title ?? slug,
        href: `/project/${slug}`,
      },
    ],
  })),
  {
    id: "improving",
    title: "Areas being strengthened",
    text: `${portfolio.name} is currently strengthening ${assistantFacts.improving.join(", ")}. He has worked with role-based authorization in projects such as Natours; complex production permissions remain an area of growth.`,
    links: [{ label: "Natours API", href: "/project/natours-backend-api" }],
  },
  {
    id: "goals",
    title: "Career goals",
    text: assistantFacts.goals,
    links: [],
  },
  {
    id: "opportunities",
    title: "Opportunities and availability",
    text: assistantFacts.opportunities,
    links: [{ label: "Contact Kamal", href: `mailto:${portfolio.email}` }],
  },
  {
    id: "freelance",
    title: "Freelance services",
    text: assistantFacts.freelance,
    links: [{ label: "Contact Kamal", href: `mailto:${portfolio.email}` }],
  },
  {
    id: "contact",
    title: "Contact and profiles",
    text: `Contact ${portfolio.name} at ${portfolio.email}. His GitHub and LinkedIn profiles are linked in the portfolio.`,
    links: [
      { label: "Email", href: `mailto:${portfolio.email}` },
      { label: "GitHub", href: portfolio.github },
      { label: "LinkedIn", href: portfolio.linkedin },
    ],
  },
  {
    id: "resume",
    title: "Resume",
    text: `${portfolio.name}'s public resume summarizes full-stack and mobile experience, including React, Next.js, React Native, Node.js, Express, PostgreSQL, MongoDB, REST APIs, authentication, and deployment. Download it from the portfolio.`,
    links: [{ label: "Download resume", href: portfolio.resume }],
  },
];

const experienceSections: KnowledgeSection[] = experiences.map(
  (experience) => ({
    id: `experience:${experience.company.toLowerCase().replaceAll(" ", "-")}`,
    title: `${experience.role} at ${experience.company}`,
    text: joinFacts([
      `Company: ${experience.company}.`,
      `Role: ${experience.role}.`,
      `Dates: ${experience.duration}.`,
      `Technologies: ${experience.skills.join(", ")}.`,
      experience.description,
    ]),
    links: experience.link
      ? [{ label: experience.company, href: experience.link }]
      : [],
  }),
);

const projectSections: KnowledgeSection[] = projects.flatMap(
  (project): KnowledgeSection[] => {
    const links: KnowledgeLink[] = [
      { label: "Portfolio page", href: `/project/${project.slug}` },
    ];

    if (project.code) {
      links.push({ label: "Source code", href: project.code });
    }

    if ("live" in project && project.live) {
      links.push({ label: "Live project", href: project.live });
    }

    return [
      {
        id: `project:${project.slug}`,
        title: `${project.title} overview`,
        text: joinFacts([
          `Project: ${project.title}.`,
          project.description,
          project.overview,
        ]),
        links,
      },
      {
        id: `technology:${project.slug}`,
        title: `${project.title} technologies`,
        text: joinFacts([
          `Project: ${project.title}.`,
          project.frontEnd && `Frontend: ${project.frontEnd}.`,
          project.backEnd && `Backend: ${project.backEnd}.`,
          `Technologies: ${project.technologies}.`,
        ]),
        links,
      },
      {
        id: `features:${project.slug}`,
        title: `${project.title} features and solutions`,
        text: joinFacts([
          `Project: ${project.title}.`,
          ...project.keyFeatures.map((feature) => `${feature}.`),
        ]),
        links,
      },
    ];
  },
);

export const knowledge: KnowledgeSection[] = [
  ...profileSections,
  ...experienceSections,
  ...projectSections,
];

const versionSource = JSON.stringify(knowledge);
let versionHash = 2_166_136_261;
for (let index = 0; index < versionSource.length; index += 1) {
  versionHash = Math.imul(
    versionHash ^ versionSource.charCodeAt(index),
    16_777_619,
  );
}
export const knowledgeVersion = `${knowledge.length}-${(versionHash >>> 0).toString(16)}`;
