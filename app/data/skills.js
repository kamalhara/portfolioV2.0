import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiServer,
  FiCloud,
  FiPackage,
} from "react-icons/fi";

export const skillCategories = [
  {
    title: "Languages",
    icon: FiCode,
    skills: ["JavaScript", "HTML", "CSS", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Frontend",
    icon: FiLayout,
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "React-Hook-Form",
      "Framer Motion",
    ],
  },
  {
    title: "Mobile",
    icon: FiSmartphone,
    skills: [
      "React Native",
      "Expo",
      "Android Studio",
      "XCode",
      "Firebase",
      "Supabase",
      "FCM",
    ],
  },
  {
    title: "Backend",
    icon: FiServer,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.io",
      "Authentication",
      "MySQL",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    title: "Cloud & Tools",
    icon: FiCloud,
    skills: ["AWS", "ESLint", "Husky", "Jest", "Git", "VSCode"],
  },
  {
    title: "Others",
    icon: FiPackage,
    skills: ["API Development", "GraphQL", "REST APIs", "WebSockets", "JWT"],
  },
];
