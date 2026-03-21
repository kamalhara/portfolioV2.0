import { projects } from "@/app/data/project";
import { LuFolderOpen } from "react-icons/lu";

export default async function ProjectPage({ params: paramsPromise }) {
  const { slug } = await paramsPromise;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className="bg-[#0C1117] h-screen flex flex-col items-center ">
      <div className="flex  gap-6  bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 fo flex-col w-2xl px-6 py-4 mt-20 rounded-md  ">
        <div>
          <div className="flex  gap-4 mb-4">
            <div className="h-14 w-14 bg-[#152421] flex items-center justify-center ">
              <LuFolderOpen color="#2cb35a" className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">{project.title}</h2>
              <p>{project.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
