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
    <div className="bg-[#0C1117] h-full flex flex-col items-center py-20 ">
      <div className="flex  gap-6  bg-[#181E25]/80 backdrop-blur-xs border border-gray-700  flex-col  px-6 py-4 mt-20 rounded-md w-[60%] ">
        <Link
          href="/#projects"
          className="text-gray-500 hover:text-[#2CB35A] transition-colors text-md font-semibold "
        >
          &larr; Back to Projects
        </Link>
        <div className="flex justify-between mt-5">
          <div className="flex  gap-4 mb-4">
            <div className="h-14 w-14 bg-[#152421] flex items-center justify-center ">
              <LuFolderOpen color="#2cb35a" className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">{project.title}</h2>
              <p className="text-[#2cb35a] font-semibold">{project.type}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center  text-sm font-medium border  h-12 px-5 py-3 gap-2 transition-colors bg-[#2CB35A] border-[#2CB35A] text-[#0a1117] "
            >
              <FiGithub className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">View on GitHub</span>
            </Link>

            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center  text-sm font-medium border border-gray-700 bg-[#0a1117] h-12 px-5 py-3 gap-2 transition-colors hover:text-[#2CB35A] hover:border-[#2CB35A]  "
              >
                <CgWebsite />
                <span className="hidden sm:inline">View Live</span>
              </Link>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-700/50">
          {/* FRONTEND, BACKEND, CATEGORY */}
          {project.frontEnd && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <GrLanguage color="#2cb35a" />
                <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wide">
                  FRONTEND
                </h3>
              </div>
              <p className="text-foreground text-sm">{project.frontEnd}</p>
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
              <p className="text-foreground text-sm">{project.backEnd}</p>
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
              <p className="text-foreground text-sm ">{project.type}</p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <p className="font-bold text-xl text-foreground">Overview</p>
          <p className=" text-lg text-gray-400  mt-2">{project.overview}</p>
        </div>

        <div className="pt-6 border-t border-gray-700/50">
          <p className="font-bold text-xl text-foreground flex items-center gap-2">
            <span>
              <IoCheckmarkCircleOutline
                color="#2bc35a
              "
              />
            </span>
            Key Features
          </p>
          <ul className="list-disc list-inside marker:text-[#2cb35a] mt-2 text-gray-400">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="mb-2">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {project.screenshot && (
          <div className="pt-6 border-t border-gray-700/50">
            <p className="font-bold text-xl text-foreground">Screenshots</p>
          </div>
        )}
        <div className="grid grid-cols-2">
          {project.screenshot &&
            project.screenshot.map((src, index) => (
              <img
                key={index}
                src={`/${src}`}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-auto max-w-xs object-contain rounded-md  mb-4"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
