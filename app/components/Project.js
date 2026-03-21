"use client";

import React, { useEffect, useRef, useState } from "react";
import { mainProjects } from "../data/project";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

export default function Project() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mainProjects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="z-50 h-auto relative mb-12 md:mb-20 px-4 md:px-6 py-12 md:py-20 flex items-center flex-col gap-6 md:gap-8"
      id="projects"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-3 text-center">
          Featured{" "}
          <span className="bg-gradient-to-r from-[#2CB35A] to-[#5DEBB5] bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="text-gray-500 text-sm md:text-lg text-center font-mono">
          // Projects in Fullstack Development and Mobile Development
        </p>
      </div>

      <div className="w-full max-w-5xl flex justify-end px-0 md:px-4">
        <Link
          href="/project"
          className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-[#181E25]/80 border border-gray-700 mb-4 md:mb-6 font-mono text-xs md:text-sm hover:border-[#2CB35A] hover:text-[#2CB35A] transition-all duration-300 hover:shadow-[0_0_12px_rgba(44,179,90,0.15)]"
        >
          View All Projects &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
        {mainProjects.map((project, index) => (
          <Link
            href={`/project/${project.slug}`}
            key={index}
            className="group relative flex gap-4 md:gap-6 bg-[#181E25]/80 border border-gray-700 font-mono transition-all duration-500 hover:border-[#2CB35A]/50 flex-col w-full px-5 md:px-6 py-5 overflow-hidden"
            style={{
              opacity: visibleCards.includes(index) ? 1 : 0,
              transform: visibleCards.includes(index)
                ? "translateY(0) scale(1)"
                : "translateY(24px) scale(0.97)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {/* Hover gradient glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_100%_100%,rgba(44,179,90,0.08),transparent_60%)]" />

            {/* Project type badge */}
            <div className="flex items-center gap-2 relative z-10">
              <span className="text-[10px] px-2 py-0.5 bg-[#2CB35A]/10 text-[#2CB35A] border border-[#2CB35A]/20 font-mono uppercase tracking-wider">
                {project.type}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 relative z-10">
              <div className="flex justify-between items-start">
                <h2 className="text-lg md:text-xl font-semibold group-hover:text-[#2CB35A] transition-colors">
                  {project.title}
                </h2>
                <FaArrowUpRightFromSquare className="shrink-0 mt-1 text-gray-600 group-hover:text-[#2CB35A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed relative z-10">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-700/40 relative z-10">
              {project.technologies.split(" · ").map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-gray-500 px-2 py-0.5 bg-[#0C1117]/60 border border-gray-700/40 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
