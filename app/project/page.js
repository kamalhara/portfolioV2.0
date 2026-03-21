import React from "react";
import { mainProjects, projects } from "../data/project";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
import GridBackground from "@/app/components/GridBackground";

export default function project() {
  return (
    <div
      className="z-50 h-auto relative mb-20  px-6 py-20 flex  items-center flex-col gap-8 "
      id="professional"
    >
      <GridBackground />
      <Link
        href="/#projects"
        className="self-start gap-2 px-3 py-2 md:px-4 md:py-2  bg-card/80 backdrop-blur-sm border border-gray-700 mb-6 md:mb-8 font-mono text-xs md:text-sm  ml-25  "
      >
        &larr; Back to Home
      </Link>
      <div className="flex flex-col items-center relative z-50">
        <h1 className="text-5xl font-semibold mb-5 ">
          Featured <span className="text-green-300 ">Project</span>
        </h1>
        <p className="text-gray-500 text-lg">
          {" "}
          // Projects in Fullstack Development and Mobile Development
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Link
            href={`/project/${project.slug}`}
            key={index}
            className="flex  gap-6  bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono transition-transform duration-300  hover:border-[#2CB35A]  hover:text-[#2CB35A] flex-col w-2xl px-6 py-4  "
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <FaArrowUpRightFromSquare />
              </div>
              <p className="text-sm text-gray-500">{project.type}</p>
            </div>

            <p className="text-gray-300">{project.description}</p>

            <div className="flex">
              <p className="text-gray-500 text-xs">{project.technologies}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
