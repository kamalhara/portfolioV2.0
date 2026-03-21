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
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 md:mb-5 text-center">
          Featured <span className="text-green-300">Project</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg text-center font-mono">
          // Projects in Fullstack Development and Mobile Development
        </p>
      </div>

      <div className="w-full max-w-5xl flex justify-end px-0 md:px-4">
        <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-card/80 backdrop-blur-sm border border-gray-700 mb-4 md:mb-6 font-mono text-xs md:text-sm hover:border-[#2CB35A] hover:text-[#2CB35A] transition-colors">
          <Link href="/project">View All Projects &rarr;</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
        {mainProjects.map((project, index) => (
          <Link
            href={`/project/${project.slug}`}
            key={index}
            className="group flex gap-4 md:gap-6 bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono transition-all duration-300 hover:border-[#2CB35A] hover:text-[#2CB35A] flex-col w-full px-5 md:px-6 py-4"
            style={{
              opacity: visibleCards.includes(index) ? 1 : 0,
              transform: visibleCards.includes(index)
                ? "translateY(0) scale(1)"
                : "translateY(24px) scale(0.97)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <h2 className="text-lg md:text-xl font-semibold">
                  {project.title}
                </h2>
                <FaArrowUpRightFromSquare className="shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-sm text-gray-500">{project.type}</p>
            </div>

            <p className="text-gray-300 text-sm md:text-base">
              {project.description}
            </p>

            <div className="flex">
              <p className="text-gray-500 text-xs">{project.technologies}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
