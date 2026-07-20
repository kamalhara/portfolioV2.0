"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiBriefcase,
  FiCode,
  FiFileText,
  FiFolder,
  FiUser,
} from "react-icons/fi";

const navLinks = [
  { label: "About", shortLabel: "About", href: "#about", icon: FiUser },
  {
    label: "Professional",
    shortLabel: "Work",
    href: "#professional",
    icon: FiBriefcase,
  },
  { label: "Skills", shortLabel: "Skills", href: "#skills", icon: FiCode },
  {
    label: "Projects",
    shortLabel: "Projects",
    href: "#projects",
    icon: FiFolder,
  },
  {
    label: "Resume",
    shortLabel: "Resume",
    href: "/Kamalveer_Singh_Resume_.pdf",
    external: true,
    icon: FiFileText,
  },
];

function Navbar() {
  const desktopProgressRef = useRef(null);
  const mobileProgressRef = useRef(null);
  const frameRef = useRef(0);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateNavigation = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;

      const progressTransform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      if (desktopProgressRef.current) {
        desktopProgressRef.current.style.transform = progressTransform;
      }
      if (mobileProgressRef.current) {
        mobileProgressRef.current.style.transform = progressTransform;
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

  const renderLink = (link, mobile = false) => {
    const sectionId = link.href.slice(1);
    const isActive = !link.external && activeSection === sectionId;
    const Icon = link.icon;

    return (
      <a
        href={link.href}
        onClick={(event) => handleSmoothScroll(event, link.href)}
        className={
          mobile
            ? `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 font-mono text-[10px] transition-colors ${
                isActive
                  ? "text-[#2CB35A]"
                  : "text-gray-500 hover:text-gray-200"
              }`
            : `relative font-mono text-md font-semibold transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-[#2CB35A] after:transition-all after:duration-300 ${
                isActive
                  ? "text-[#2CB35A] after:w-full"
                  : "text-gray-500 hover:text-[#2CB35A] after:w-0 hover:after:w-full"
              }`
        }
        aria-current={isActive ? "page" : undefined}
        {...(link.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {mobile && <Icon className="h-[18px] w-[18px]" aria-hidden="true" />}
        <span>{mobile ? link.shortLabel : link.label}</span>
      </a>
    );
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-100 hidden border-b backdrop-blur-lg transition-all duration-300 md:block ${
          scrolled
            ? "border-gray-800/70 bg-[#0C1117]/95"
            : "border-transparent bg-[#0C1117]/80"
        }`}
      >
        <div
          ref={desktopProgressRef}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#2CB35A] will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />

        <div
          className={`mx-auto flex max-w-6xl items-center justify-center px-6 transition-all duration-300 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <ul className="flex items-center justify-center gap-8 font-semibold">
            {navLinks.map((link) => (
              <li key={link.label}>{renderLink(link)}</li>
            ))}
          </ul>
        </div>
      </nav>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-3 bottom-3 z-[999] border border-gray-700 bg-[#10161D] md:hidden"
      >
        <div
          ref={mobileProgressRef}
          className="absolute left-0 top-0 h-[2px] w-full origin-left bg-[#2CB35A] will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
        <div className="flex items-stretch px-1 pb-[max(0px,env(safe-area-inset-bottom))]">
          {navLinks.map((link) => (
            <div key={link.label} className="flex min-w-0 flex-1">
              {renderLink(link, true)}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
