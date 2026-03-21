import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-50 border-t border-gray-700/50 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              Let&apos;s work{" "}
              <span className="bg-gradient-to-r from-[#2CB35A] to-[#5DEBB5] bg-clip-text text-transparent">
                together
              </span>
            </h3>
            <p className="text-gray-500 font-mono text-sm">
              // Open for freelance and full-time opportunities
            </p>
          </div>

          <Link
            href="mailto:kamalhara7@gmail.com"
            className="group flex items-center gap-2 px-6 py-3 bg-[#2CB35A] text-[#0C1117] font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(44,179,90,0.35)] hover:scale-105"
          >
            <FiMail className="transition-transform group-hover:rotate-12" />
            Get In Touch
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-mono">
            &copy; {new Date().getFullYear()} Kamalveer Singh. Built with
            Next.js
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/kamalveersingh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2CB35A] transition-colors"
            >
              <FiGithub size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2CB35A] transition-colors"
            >
              <FiLinkedin size={18} />
            </Link>
            <Link
              href="mailto:kamalhara7@gmail.com"
              className="text-gray-600 hover:text-[#2CB35A] transition-colors"
            >
              <FiMail size={18} />
            </Link>
          </div>

          <a
            href="#about"
            className="text-gray-600 hover:text-[#2CB35A] transition-colors flex items-center gap-1 text-sm font-mono"
          >
            <FiArrowUp size={14} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
