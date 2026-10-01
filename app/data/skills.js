import {
  BsJavascript,
  BsTypescript,
  BsChatSquareText,
  BsClaude,
} from "react-icons/bs";
import Image from "next/image";
import CursorLogo from "@/app/ui/CursorLogo";
import { DiReact } from "react-icons/di";
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiExpo,
  SiFirebase,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSocketdotio,
  SiSupabase,
  SiLangchain,
  SiRedis,
  SiOpenai,
  SiNotion,
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import {
  FaAws,
  FaRobot,
  FaWandMagicSparkles,
  FaDatabase,
  FaGitAlt,
} from "react-icons/fa6";
import { PiNotionLogo } from "react-icons/pi";

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "TypeScript", icon: <BsTypescript size={14} /> },
      { name: "JavaScript", icon: <BsJavascript size={14} /> },
      { name: "React.js", icon: <DiReact size={18} /> },
      { name: "Next.js", icon: <SiNextdotjs size={14} /> },
      { name: "Redux", icon: <SiRedux size={14} /> },
      { name: "Zustand", icon: <GiBearFace size={14} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={14} /> },
      { name: "Shadcn UI", icon: <SiShadcnui size={14} /> },
      { name: "Motion", icon: <SiFramer size={14} /> },
    ],
  },
  {
    title: "Mobile",
    skills: [
      { name: "React Native", icon: <DiReact size={18} /> },
      { name: "Expo", icon: <SiExpo size={14} /> },
      { name: "NativeWind", icon: <SiTailwindcss size={14} /> },
      { name: "Firebase", icon: <SiFirebase size={14} /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs size={14} /> },
      { name: "Express", icon: <SiExpress size={14} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={14} /> },
      { name: "MongoDB", icon: <SiMongodb size={14} /> },
      { name: "Redis", icon: <SiRedis size={14} /> },
      { name: "AWS", icon: <FaAws size={14} /> },
      { name: "Supabase", icon: <SiSupabase size={14} /> },
      { name: "WebSockets", icon: <SiSocketdotio size={14} /> },
      { name: "git", icon: <FaGitAlt size={14} /> },
    ],
  },
  {
    title: "AI & Tools",
    skills: [
      { name: "Claude", icon: <BsClaude size={14} /> },
      { name: "ChatGPT", icon: <SiOpenai size={14} /> },
      { name: "Cursor", icon: <CursorLogo /> },
      {
        name: "Gemini",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-3.5 w-3.5"
          >
            <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"></path>
          </svg>
        ),
      },

      { name: "Notion", icon: <SiNotion size={14} /> },
    ],
  },
  {
    title: "Agentic AI",
    skills: [
      { name: "Generative AI", icon: <FaRobot size={14} /> },
      { name: "LLMs", icon: <BsChatSquareText size={14} /> },
      { name: "LangChain", icon: <SiLangchain size={14} /> },
      { name: "AI agents", icon: <FaWandMagicSparkles size={14} /> },
      { name: "RAG", icon: <FaDatabase size={14} /> },
    ],
  },
];
