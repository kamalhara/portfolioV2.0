// Homepage copy lives here so the layout can be edited without touching JSX.
export const portfolio = {
  name: "Kamalveer Singh",
  role: "Full-stack web and mobile software engineer",
  currently:
    "Open to software engineering opportunities worldwide. I build modern web and mobile products with Next.js, React Native, TypeScript, and Node.js — focused on AI integrations and real-time experiences.",
  email: "kamalhara7@gmail.com",
  location: "India",
  github: "https://github.com/kamalhara",
  linkedin: "https://www.linkedin.com/in/kamalveer-singh-bb7250335/",
  resume: "/kamalveer-singh-resume.pdf",
  about:
    "I’m Kamal Hara (Kamalveer Singh), a 20-year-old software engineer from Ludhiana, Punjab who thinks from the interface inward. I bring UI/UX intuition, frontend craft, and backend architecture together so products feel cohesive from first tap to database.",
  aboutHeading: "Thoughtful interfaces. Complete applications.",
  aboutDetail:
    "I move naturally between Next.js and Tailwind on the web and React Native with Expo on mobile, backed by Node.js, PostgreSQL, WebSockets, and AI workflows. The details others treat as afterthoughts — empty states, keyboard flow, subtle motion — are usually where I spend the extra hour.",
  aboutContext: [
    "Ludhiana, Punjab",
    "Designer × Full-Stack Engineer",
    "Web & Native Mobile",
  ],
  aboutHighlights: [
    {
      id: "full-loop",
      kicker: "Sketch to ship",
      title: "Full Loop Ownership",
      summary: "UI/UX · Frontend · Backend",
      detail:
        "I prefer owning the entire arc of a feature rather than handing it off across silos — when visual intent and API design live in one head, the product clicks faster.",
      meta: "End-to-end",
      prompt: "How does Kamal connect UI/UX design with backend engineering?",
      stages: [
        {
          id: "sketch",
          label: "01 Sketch",
          text: "Start with user flow, edge cases, and hierarchy before writing a line of UI.",
        },
        {
          id: "frontend",
          label: "02 Frontend",
          text: "Translate layouts into responsive TypeScript, fluid Motion transitions, and clean component state.",
        },
        {
          id: "backend",
          label: "03 Backend",
          text: "Back screens with fast REST/WebSocket APIs, PostgreSQL or Redis schemas, and real validation.",
        },
      ],
    },
    {
      id: "details",
      kicker: "Tiny details",
      title: "Obsessed with Feel",
      summary: "No dead states · Micro-motion",
      detail:
        "A good interface responds clearly even when nothing is loading yet or something breaks. Hover physics, focus rings, and quiet feedback make software feel considered.",
      meta: "Craft & Polish",
      prompt: "What UI details does Kamal pay extra attention to?",
      stages: [
        {
          id: "states",
          label: "States",
          text: "Loading skeletons, helpful empty screens, and calm error recovery get the same love as the happy path.",
        },
        {
          id: "motion",
          label: "Motion",
          text: "Purposeful springs and transitions that clarify where content came from — while honoring reduced motion.",
        },
        {
          id: "tactile",
          label: "Feedback",
          text: "Crisp press depth, subtle sound cues, and reliable keyboard navigation across every interactive control.",
        },
      ],
    },
    {
      id: "dual-canvas",
      kicker: "Dual canvas",
      title: "Web & Native Together",
      summary: "Browser + iOS & Android",
      detail:
        "Building across Next.js on desktop and React Native on mobile sharpens both — web teaches density and typography, while mobile teaches gesture and thumb reach.",
      meta: "Next.js · Expo",
      prompt: "How does Kamal switch between React web apps and React Native?",
      stages: [
        {
          id: "browser",
          label: "Browser",
          text: "Next.js App Router, Tailwind CSS, Shadcn UI, server/client boundaries, and fast static/streaming routes.",
        },
        {
          id: "mobile",
          label: "Mobile",
          text: "React Native, Expo, NativeWind, maps, real-time notifications, and native-feeling touch flows.",
        },
        {
          id: "shared",
          label: "Shared mental model",
          text: "Shared TypeScript types, modular hooks, and clean state contracts between client apps and Node APIs.",
        },
      ],
    },
    {
      id: "aesthetic",
      kicker: "Visual taste",
      title: "Minimal Warm Aesthetic",
      summary: "Calm surfaces · Editorial type",
      detail:
        "Drawn to warm dark surfaces, clean typographic hierarchy, and restrained color accents — letting typography and product clarity speak instead of noisy neon.",
      meta: "Warm dark UI",
      prompt: "What inspires the visual style of Kamal's interfaces?",
      swatches: ["#111110", "#1c1c1a", "#e9e8e4", "#f04e15"],
      stages: [
        {
          id: "surfaces",
          label: "Surfaces",
          text: "Charcoal and warm stone layers separated cleanly by hairline borders rather than heavy drop shadows.",
        },
        {
          id: "type",
          label: "Typography",
          text: "Tight geometric headings paired with monospace metadata for clear scanning and quiet contrast.",
        },
        {
          id: "restraint",
          label: "Restraint",
          text: "One terracotta accent reserved for intent and live moments — zero clutter, zero visual glare.",
        },
      ],
    },
  ],
  aboutLanguages: [
    {
      id: "pa",
      label: "Punjabi",
      native: "ਪੰਜਾਬੀ",
      greeting: "Sat Sri Akal!",
      note: "Mother tongue — roots in Ludhiana, Punjab.",
    },
    {
      id: "hi",
      label: "Hindi",
      native: "हिन्दी",
      greeting: "Namaste!",
      note: "Fluent for everyday conversation and collaboration.",
    },
    {
      id: "en",
      label: "English",
      native: "English",
      greeting: "Hey there!",
      note: "Fluent — worked remotely with engineering teams in the UK.",
    },
  ],
  signoff: "I care about the point where software meets real life.",
};

export const workingApproach = [
  {
    title: "Start with the experience",
    description:
      "Understand the goal, map the user flow, and shape an interface that makes the next step clear.",
    focus: "UI/UX & product thinking",
  },
  {
    title: "Connect the whole product",
    description:
      "Build the web or mobile interface alongside the APIs, authentication, and data it needs.",
    focus: "Frontend & backend",
  },
  {
    title: "Refine the details",
    description:
      "Give loading, empty, and error states the same attention as the main flow. Make interactions feel considered.",
    focus: "States & interactions",
  },
];

export const projectSummaries = {
  stateglyph: "An icon system that understands interface state.",
  spotus: "Live conversations shaped by place and proximity.",
  ryde: "An educational ride-booking app for mobile.",
  productify: "A product directory built for makers and communities.",
  "natours-backend-api": "A secure REST API for tour booking and management.",
  "the-wild-oasis-staff": "A hotel operations dashboard for staff and owners.",
  "dine-time-app":
    "A mobile app for discovering restaurants and booking tables.",
  "the-wild-oasis": "A guest-facing booking experience for hotel stays.",
  nexcent: "An accessible, responsive authentication interface.",
  "world-wise": "A travel journal built around an interactive map.",
};
