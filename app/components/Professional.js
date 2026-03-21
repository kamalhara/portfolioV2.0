"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiBriefcase } from "react-icons/fi";
import { experiences } from "../data/experience";

export default function Professional() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 150);
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
      id="professional"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-3 text-center">
          Professional{" "}
          <span className="bg-gradient-to-r from-[#2CB35A] to-[#5DEBB5] bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <p className="text-gray-500 text-sm md:text-lg font-mono">
          // Where I&apos;ve worked
        </p>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-4xl relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2CB35A]/60 via-gray-700 to-transparent" />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-14 md:pl-20"
              style={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index)
                  ? "translateX(0)"
                  : "translateX(-24px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] md:left-[26px] top-5 w-4 h-4 rounded-full border-2 border-[#2CB35A] bg-[#0C1117] z-10">
                <div className="w-2 h-2 rounded-full bg-[#2CB35A] absolute top-0.5 left-0.5" />
              </div>

              {/* Card */}
              <div className="group flex flex-col gap-3 px-5 md:px-6 py-5 bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono w-full transition-all duration-300 hover:border-[#2CB35A]/50 relative overflow-hidden">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_0%_0%,rgba(44,179,90,0.06),transparent_50%)]" />

                <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-12 h-12 shrink-0 border border-gray-700 group-hover:border-[#2CB35A]/40 transition-colors"
                  />

                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h2 className="text-lg font-semibold">{exp.role}</h2>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {exp.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="w-3.5 h-3.5 text-[#2CB35A]" />
                      <h3 className="text-sm font-semibold text-[#2CB35A]">
                        {exp.company}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#0C1117]/80 text-gray-400 px-2.5 py-1 font-mono border border-gray-700/60 transition-all duration-300 hover:border-[#2CB35A] hover:text-[#2CB35A] hover:shadow-[0_0_8px_rgba(44,179,90,0.1)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
