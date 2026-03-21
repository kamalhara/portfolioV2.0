import { projects } from "@/app/data/project";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { LuFolderOpen } from "react-icons/lu";
import { GrLanguage } from "react-icons/gr";
import { FaDatabase } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";

export default async function ProjectPage({ params: paramsPromise }) {
  const { slug } = await paramsPromise;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className="bg-[#0C1117] min-h-screen flex flex-col items-center py-12 md:py-20 px-4">
      <div className="flex gap-4 md:gap-6 bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 flex-col px-4 md:px-6 py-4 mt-12 md:mt-20 rounded-md w-full max-w-4xl">
        <Link
          href="/#projects"
          className="text-gray-500 hover:text-[#2CB35A] transition-colors text-md font-semibold"
        >
          &larr; Back to Projects
        </Link>

        <div className="flex flex-col md:flex-row justify-between mt-5 gap-4">
          <div className="flex gap-4 mb-2 md:mb-4">
            <div className="h-12 w-12 md:h-14 md:w-14 bg-[#152421] flex items-center justify-center shrink-0">
              <LuFolderOpen color="#2cb35a" className="w-6 h-6 md:w-8 md:h-8" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
              <p className="text-[#2cb35a] font-semibold">{project.type}</p>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 flex-wrap">
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-sm font-medium border h-10 md:h-12 px-4 md:px-5 py-2 md:py-3 gap-2 transition-colors bg-[#2CB35A] border-[#2CB35A] text-[#0a1117]"
            >
              <FiGithub className="w-4 h-4 shrink-0" />
              <span>GitHub</span>
            </Link>

            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-sm font-medium border border-gray-700 bg-[#0a1117] h-10 md:h-12 px-4 md:px-5 py-2 md:py-3 gap-2 transition-colors hover:text-[#2CB35A] hover:border-[#2CB35A]"
              >
                <CgWebsite />
                <span>View Live</span>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-gray-700/50">
          {project.frontEnd && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <GrLanguage color="#2cb35a" />
                <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wide">
                  FRONTEND
                </h3>
              </div>
              <p className="text-foreground text-sm text-center">
                {project.frontEnd}
              </p>
            </div>
          )}

          {project.backEnd && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <FaDatabase color="#2bc35a" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  BACKEND
                </h3>
              </div>
              <p className="text-foreground text-sm text-center">
                {project.backEnd}
              </p>
            </div>
          )}

          {project.type && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <TbCategory color="#2cb35a" />
                <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wide">
                  CATEGORY
                </h3>
              </div>
              <p className="text-foreground text-sm">{project.type}</p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <p className="font-bold text-lg md:text-xl text-foreground">
            Overview
          </p>
          <p className="text-base md:text-lg text-gray-400 mt-2">
            {project.overview}
          </p>
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <p className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2">
            <span>
              <IoCheckmarkCircleOutline color="#2bc35a" />
            </span>
            Key Features
          </p>
          <ul className="list-disc list-inside marker:text-[#2cb35a] mt-2 text-gray-400">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="mb-2 text-sm md:text-base">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {project.screenshot && (
          <div className="pt-6 border-t border-gray-700/50">
            <p className="font-bold text-lg md:text-xl text-foreground">
              Screenshots
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {project.screenshot &&
            project.screenshot.map((src, index) => (
              <img
                key={index}
                src={`/${src}`}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-auto object-contain rounded-md"
              />
            ))}
        </div>
        {project.img && (
          <div className="pt-6 border-t border-gray-700/50">
            <p className="font-bold text-lg md:text-xl text-foreground">
              Screenshots
            </p>
            <img
              src={project.img}
              alt={`${project.title} screenshot`}
              className="w-full h-auto object-contain rounded-md mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
