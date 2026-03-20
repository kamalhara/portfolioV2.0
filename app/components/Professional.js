import React from "react";
import { FiCalendar } from "react-icons/fi";
import { experiences } from "../data/experience";

export default function Professional() {
  return (
    <div
      className="z-50 h-screen relative  px-6 py-20 flex  items-center flex-col gap-8 "
      id="professional"
    >
      <h1 className="text-5xl font-semibold mb-5">
        Professional <span className="text-green-300 ">Experience</span>
      </h1>
      <div>
        {experiences.map((exp, index) => (
          <a
            key={index}
            href="/"
            className="flex items-center gap-6 px-6 py-4 bg-[#181E25]/80 backdrop-blur-xs border border-gray-700 font-mono max-w-4xl transition-transform duration-300 hover:scale-101 hover:border-[#2CB35A]  hover:text-[#2CB35A] "
          >
            <div className="flex z-50 gap-4">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-12 h-12 shrink-0  border border-gray-700 "
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
                  <p className="text-gray-300">{exp.description}</p>
                  <div className="flex gap-2 mt-2">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#181E25] text-gray-300 px-2 py-1 rounded font-mono border border-gray-700 "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
