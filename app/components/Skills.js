"use client";

import React, { useEffect, useRef, useState } from "react";
import { skillCategories } from "../data/skills";
import {
  SiAndroidstudio,
  SiClerk,
  SiCss,
  SiEslint,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGraphql,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJson,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostman,
  SiPostgresql,
  SiReact,
  SiReacthookform,
  SiRedux,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiXcode,
} from "react-icons/si";
import { FaAws, FaUniversalAccess } from "react-icons/fa6";
import {
  FiAlertCircle,
  FiBell,
  FiCheckCircle,
  FiCode,
  FiGitBranch,
  FiMonitor,
  FiRepeat,
  FiShield,
} from "react-icons/fi";
import {
  TbApi,
  TbBrandOauth,
  TbDatabaseEdit,
  TbPlugConnected,
  TbShieldCheck,
  TbWebhook,
} from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const skillIcons = {
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  JSON: SiJson,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  Redux: SiRedux,
  "React-Hook-Form": SiReacthookform,
  "Framer Motion": SiFramer,
  Vite: SiVite,
  "Responsive Design": FiMonitor,
  Accessibility: FaUniversalAccess,
  "React Native": SiReact,
  Expo: SiExpo,
  "Android Studio": SiAndroidstudio,
  XCode: SiXcode,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  FCM: FiBell,
  NativeWind: SiTailwindcss,
  Zustand: FiRepeat,
  "React Native Reanimated": SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": TbApi,
  "Socket.io": SiSocketdotio,
  Authentication: FiShield,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Clerk: SiClerk,
  CRUD: TbDatabaseEdit,
  "Role-Based Access": TbShieldCheck,
  "Data Validation": FiCheckCircle,
  AWS: FaAws,
  ESLint: SiEslint,
  Husky: FiGitBranch,
  Jest: SiJest,
  Git: SiGit,
  GitHub: SiGithub,
  npm: SiNpm,
  VSCode: VscVscode,
  Postman: SiPostman,
  Vercel: SiVercel,
  "API Development": FiCode,
  GraphQL: SiGraphql,
  WebSockets: TbPlugConnected,
  JWT: SiJsonwebtokens,
  "OAuth 2.0": TbBrandOauth,
  Webhooks: TbWebhook,
  "Error Handling": FiAlertCircle,
};

export default function Skills() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          skillCategories.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0,
  );

  return (
    <div
      ref={sectionRef}
      className="z-50 h-auto relative mb-20 px-6 py-20 flex items-center flex-col gap-8"
      id="skills"
    >
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 md:mb-5 text-white">
          Technical <span className="text-[#2CB35A]">Skills</span>
        </h1>
        <p className="text-gray-500 text-lg font-mono">
          // {totalSkills}+ technologies across {skillCategories.length} domains
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          const isVisible = visibleCards.includes(index);

          return (
            <div
              key={index}
              className="group relative flex flex-col bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono transition-all duration-500 hover:border-[#2CB35A] overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {/* Terminal-style title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-700 bg-[#0C1117]/60">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-xs text-gray-500 ml-2">
                  {category.title.toLowerCase().replace(/\s+/g, "_")}.js
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 px-5 py-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-md bg-[#0C1117]/60 text-gray-400 group-hover:border-[#2CB35A] group-hover:text-[#2CB35A] transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-[#2CB35A]">
                      {category.title}
                    </h2>
                  </div>
                  <span className="text-xs text-gray-600">
                    {category.skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => {
                    const SkillIcon = skillIcons[skill] ?? FiCode;

                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs bg-[#0C1117]/80 text-gray-400 px-3 py-1.5 border border-gray-700/60 font-mono transition-all duration-300 hover:border-[#2CB35A] hover:text-[#2CB35A] cursor-default"
                      >
                        <SkillIcon
                          className="h-3.5 w-3.5 shrink-0 text-current"
                          aria-hidden="true"
                        />
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
