"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Professional", href: "#professional" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  {
    label: "Resume",
    href: "/Kamalveer_Singh_Resume_.pdf",
    external: true,
  },
];

function Navbar() {
  const progressRef = useRef(null);
  const frameRef = useRef(0);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateNavigation = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;

      const progressTransform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      if (progressRef.current) {
        progressRef.current.style.transform = progressTransform;
      }

      setScrolled(window.scrollY > 50);

      const sections = ["about", "professional", "skills", "projects"];
      let current = "about";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section?.getBoundingClientRect().top <= 150) current = id;
      }
      setActiveSection(current);
      frameRef.current = 0;
    };

    const handleScroll = () => {
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(updateNavigation);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateNavigation();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleSmoothScroll = (event, href) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const renderLink = (link) => {
    const sectionId = link.href.slice(1);
    const isActive = !link.external && activeSection === sectionId;

    return (
      <a
        href={link.href}
        onClick={(event) => handleSmoothScroll(event, link.href)}
        className={`relative whitespace-nowrap font-mono text-[10px] font-semibold transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-[#2CB35A] after:transition-all after:duration-300 sm:text-sm md:text-base ${
          isActive
            ? "text-[#2CB35A] after:w-full"
            : "text-gray-500 hover:text-[#2CB35A] after:w-0 hover:after:w-full"
        }`}
        aria-current={isActive ? "page" : undefined}
        {...(link.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-[999] border-b backdrop-blur-lg transition-all duration-300 ${
        scrolled
          ? "border-gray-800/70 bg-[#0C1117]/95"
          : "border-transparent bg-[#0C1117]/80"
      }`}
    >
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#2CB35A] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        className={`mx-auto flex max-w-6xl items-center justify-center px-4 transition-all duration-300 md:px-6 ${
          scrolled ? "py-3" : "py-4 md:py-5"
        }`}
      >
        <ul className="flex items-center justify-center gap-3 font-semibold sm:gap-5 md:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>{renderLink(link)}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
