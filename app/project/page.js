import React from "react";
import { projects } from "../data/project";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
import GridBackground from "@/app/components/GridBackground";

export default function project() {
  return (
    <div
      className="z-50 h-auto relative mb-12 md:mb-20 px-4 md:px-6 py-12 md:py-20 flex items-center flex-col gap-6 md:gap-8"
      id="professional"
    >
      <GridBackground />
      <Link
        href="/#projects"
        className="self-start gap-2 px-3 py-2 md:px-4 md:py-2 bg-[#181E25]/80 backdrop-blur-sm border border-gray-700 rounded-lg mb-4 md:mb-6 font-mono text-xs md:text-sm ml-4 md:ml-25 text-gray-400 hover:border-[#2CB35A] hover:text-[#2CB35A] transition-all duration-300 z-50"
      >
        &larr; Back to Home
      </Link>
      <div className="flex flex-col items-center relative z-50">
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 md:mb-5 text-center text-white">
          Featured{" "}
          <span className="bg-gradient-to-r from-[#2CB35A] to-[#5DEBB5] bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg text-center px-4 font-mono">
          // Projects in Fullstack Development and Mobile Development
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl relative z-50">
        {projects.map((project, index) => (
          <Link
            href={`/project/${project.slug}`}
            key={index}
            className="group flex gap-4 md:gap-6 bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 rounded-lg font-mono transition-all duration-300 hover:border-[#2CB35A]/50 flex-col w-full px-5 md:px-6 py-4 overflow-hidden"
          >
            {/* Hover gradient glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_100%_100%,rgba(44,179,90,0.08),transparent_60%)]" />

            <div className="flex flex-col gap-1.5 relative z-10">
              <div className="flex justify-between items-start">
                <h2 className="text-lg md:text-xl font-semibold text-gray-100 group-hover:text-[#2CB35A] transition-colors">
                  {project.title}
                </h2>
                <FaArrowUpRightFromSquare className="shrink-0 mt-1 text-gray-600 group-hover:text-[#2CB35A] transition-all duration-300" />
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-[#2CB35A]/10 text-[#2CB35A] border border-[#2CB35A]/20 rounded font-mono uppercase tracking-wider w-fit">
                {project.type}
              </span>
            </div>

            <p className="text-gray-400 text-sm md:text-base relative z-10">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-700/40 relative z-10">
              {project.technologies.split(" · ").map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-gray-500 px-2 py-0.5 bg-[#0C1117]/60 border border-gray-700/40 rounded font-mono"
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

