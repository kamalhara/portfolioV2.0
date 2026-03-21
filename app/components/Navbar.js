"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Professional", href: "#professional" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "/Kamalveer_Singh_Resume_.pdf", external: true },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Navbar shrink
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ["about", "professional", "skills", "projects"];
      let current = "about";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    }
  };

  return (
    <>
      {/* Top navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-100 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-[#0C1117]/90 py-0 shadow-lg shadow-black/20"
            : "bg-[#0C1117]/80 py-2"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#2CB35A] to-[#5DEBB5] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div
          className={`max-w-6xl mx-auto px-6 flex items-center justify-between md:justify-center transition-all duration-300 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          {/* Desktop links */}
          <ul className="hidden md:flex items-center justify-center gap-8 text-gray-500 font-semibold">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative font-mono text-md font-semibold transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-[#2CB35A] after:transition-all after:duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#2CB35A] after:w-full"
                      : "text-muted-foreground hover:text-[#2CB35A] after:w-0 hover:after:w-full"
                  }`}
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
            onClick={() => setOpen(true)}
            className="md:hidden text-gray-400 hover:text-[#2CB35A] transition-colors"
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay — OUTSIDE nav to avoid backdrop-blur stacking */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-[998] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer — OUTSIDE nav with inline bg to guarantee opacity */}
      <div
        className={`fixed top-0 right-0 h-full w-72 border-l border-gray-700/50 shadow-2xl shadow-black/50 z-[999] transform transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#0a0f14" }}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-[#2CB35A] transition-colors"
            aria-label="Close menu"
          >
            <FiX size={28} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 px-8 mt-8">
          {navLinks.map((link, index) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => {
                  handleSmoothScroll(e, link.href);
                  setOpen(false);
                }}
                className={`block px-4 py-4 rounded-lg transition-all font-mono text-xl font-semibold border-l-2 ${
                  activeSection === link.href.slice(1)
                    ? "text-[#2CB35A] border-[#2CB35A] bg-[#2CB35A]/10"
                    : "text-gray-400 hover:text-[#2CB35A] border-transparent hover:border-[#2CB35A] hover:bg-white/5"
                }`}
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
    </>
  );
}

export default Navbar;
