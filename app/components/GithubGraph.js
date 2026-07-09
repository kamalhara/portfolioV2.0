"use client";

import React, { useEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";

export default function GithubGraph() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const explicitTheme = {
    dark: ["#0C1117", "#0e4429", "#006d32", "#2CB35A", "#5DEBB5"],
  };

  return (
    <div
      ref={sectionRef}
      className="z-50 relative mb-20 px-6 flex flex-col items-center gap-8 max-w-5xl mx-auto w-full"
    >
      <div 
        className="flex flex-col items-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 md:mb-5 text-white">
          GitHub{" "}
          <span className="bg-linear-to-r from-[#2CB35A] to-[#5DEBB5] bg-clip-text text-transparent">
            Contributions
          </span>
        </h1>
        <p className="text-gray-500 text-lg font-mono">
          // Real-time code commits
        </p>
      </div>

      <div 
        className="group relative flex flex-col items-center bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono transition-all duration-500 hover:border-[#2CB35A] overflow-hidden rounded-xl p-6 md:p-8 w-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(44,179,90,0.08),transparent_70%)]" />
        
        {/* Terminal-style title bar */}
        <div className="absolute top-0 left-0 w-full flex items-center gap-2 px-4 py-2.5 border-b border-gray-700 bg-[#0C1117]/60">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-xs text-gray-500 ml-2">github_activity.js</span>
        </div>

        <div className="mt-8 w-full overflow-x-auto pb-4 pt-2 flex justify-center text-gray-300">
          <GitHubCalendar 
            username="kamalhara" 
            year={2026}
            colorScheme="dark"
            theme={explicitTheme}
            blockSize={14}
            blockMargin={5}
            fontSize={14}
          />
        </div>
        
        <div className="mt-4 flex justify-center z-10">
          <Link
            href="https://github.com/kamalhara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#2CB35A] transition-colors"
          >
            <FiGithub /> Follow me on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
