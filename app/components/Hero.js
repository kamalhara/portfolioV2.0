import TerminalDec from "./TerminalDec";
import Link from "next/link";
import { FiFile, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Hero() {
  return (
    <main
      className="z-50 relative max-w-3xl ml-40 mt-48 px-6 py-20  mb-30"
      id="about"
    >
      <TerminalDec />
      <div>
        <h1 className="text-7xl font-bold">
          Kamalveer <span className="text-green-300">Singh</span>
        </h1>

        <div className="flex  gap-4 text-gray-500 my-4 font-mono text-2xl md:text-md">
          <p>FULL-STACK DEVELOPER</p>
          <span>•</span>
          <p>MOBILE APP DEVELOPER</p>
        </div>
        <div>
          <p className="text-gray-300 text-xl">
            Hello! My name is Kamalveer Singh. I develop web and mobile
            applications using JavaScript, React, Next.js, React Native, Expo,
            Node.js, Express, and cloud services like Firebase and AWS.
          </p>
        </div>

        <div className="flex mt-12 gap-4 transition-all duration-300 ">
          <Link
            href="https://github.com/kamalveersingh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex border border-[#2CB35A] bg-[#2CB35A] text-gray-900 px-5 py-3  transition-colors duration-300 justify-center items-center gap-2 text-lg space-grostesk-semi-bold"
          >
            <span>
              <FiGithub />
            </span>
            GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex border border-gray-700 bg-[#181E25] text-gray-200 px-5 py-3  transition-colors duration-300 justify-center items-center gap-2 text-lg  space-grostesk-semi-bold  hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold "
          >
            <span>
              <FiLinkedin />
            </span>
            LinkedIn
          </Link>

          <Link
            href="mailto:kamalveersingh@example.com"
            className="flex border border-gray-700 bg-[#181E25] text-gray-200 px-5 py-3  transition-colors duration-300 justify-center items-center gap-2 text-lg  space-grostesk-semi-bold  hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold "
          >
            <span>
              <FiMail />
            </span>
            Copy Email
          </Link>

          <Link
            href="https://example.com/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex border border-gray-700 bg-[#181E25] text-gray-200 px-5 py-3  transition-colors duration-300 justify-center items-center gap-2 text-lg  space-grostesk-semi-bold  hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold "
          >
            <span>
              <FiFile />
            </span>
            Resume
          </Link>
        </div>
      </div>
    </main>
  );
}
export default Hero;
