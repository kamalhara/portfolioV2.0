import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiServer,
  FiDatabase,
  FiShield,
  FiCloud,
  FiTool,
} from "react-icons/fi";

export const skillCategories = [
  {
    title: "Languages",
    icon: FiCode,
    skills: ["JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    icon: FiLayout,
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "Zustand",
      "React-Hook-Form",
      "Framer Motion",
    ],
  },
  {
    title: "Mobile",
    icon: FiSmartphone,
    skills: ["React Native", "Expo", "Android Studio", "XCode", "FCM"],
  },
  {
    title: "Backend",
    icon: FiServer,
    skills: ["Node.js", "Express.js", "Prisma", "Socket.io", "GraphQL"],
  },
  {
    title: "Databases & BaaS",
    icon: FiDatabase,
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "Supabase",
    ],
  },
  {
    title: "APIs & Auth",
    icon: FiShield,
    skills: ["REST APIs", "WebSockets", "JWT", "OAuth 2.0", "NextAuth.js", "Clerk"],
  },
  {
    title: "DevOps & Cloud",
    icon: FiCloud,
    skills: ["AWS", "Vercel", "Git", "GitHub", "CI/CD"],
  },
  {
    title: "Developer Tools",
    icon: FiTool,
    skills: ["Figma", "Postman", "ESLint", "Husky", "Jest"],
  },
];
