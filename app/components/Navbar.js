"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Professional", href: "#professional" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "/", external: true },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-[#0C1117]/80 backdrop-blur-md py-2">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center">
        {/* Desktop links */}
        <ul className="hidden md:flex items-center justify-center gap-8 text-gray-500 font-semibold">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-muted-foreground hover:text-[#2CB35A] transition-colors font-mono text-md font-semibold after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-[#2CB35A] after:transition-all after:duration-300 hover:after:w-full"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-400 hover:text-[#2CB35A] transition-colors z-120"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-105 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#0C1117] border-l border-gray-700 z-110 transform transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-[#2CB35A] transition-colors"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 px-6">
          {navLinks.map((link, index) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-gray-400 hover:text-[#2CB35A] hover:bg-[#181E25]/60 transition-all font-mono text-lg font-semibold border-l-2 border-transparent hover:border-[#2CB35A]"
                style={{
                  animation: open
                    ? `fadeInRight 0.4s ease-out ${index * 0.08}s both`
                    : "none",
                }}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
