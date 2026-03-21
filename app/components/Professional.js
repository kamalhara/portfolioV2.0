"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
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
      <h1 className="text-3xl md:text-5xl font-semibold mb-3 md:mb-5 text-center">
        Professional <span className="text-green-300">Experience</span>
      </h1>
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 px-4 sm:px-6 py-4 bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono w-full transition-all duration-300 hover:border-[#2CB35A] hover:text-[#2CB35A]"
            style={{
              opacity: visibleCards.includes(index) ? 1 : 0,
              transform: visibleCards.includes(index)
                ? "translateY(0)"
                : "translateY(24px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <img
              src={exp.logo}
              alt={`${exp.company} logo`}
              className="w-12 h-12 shrink-0 border border-gray-700"
            />

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">{exp.role}</h2>
              <h2 className="text-lg font-semibold text-[#2CB35A]">
                {exp.company}
              </h2>
              <p className="text-gray-500 text-md flex items-center gap-1">
                <span>
                  <FiCalendar />
                </span>
                {exp.duration}
              </p>
              <div>
                <p className="text-gray-300 text-sm sm:text-base">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#181E25] text-gray-300 px-2 py-1 rounded font-mono border border-gray-700 transition-colors duration-300 hover:border-[#2CB35A] hover:text-[#2CB35A]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
