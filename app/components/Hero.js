"use client";

import { useEffect, useRef, useState } from "react";
import TerminalDec from "./TerminalDec";
import Link from "next/link";
import { FiFile, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const bioText =
    "Hello! My name is Kamalveer Singh. I develop web and mobile applications using JavaScript, React, Next.js, React Native, Expo, Node.js, Express, and cloud services like Firebase and AWS.";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const delay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(bioText.slice(0, i + 1));
        i++;
        if (i >= bioText.length) {
          clearInterval(interval);
          setTypingDone(true);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 25);
      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(delay);
  }, [visible]);

  return (
    <main
      ref={ref}
      className="z-50 relative max-w-3xl w-full mx-auto md:ml-40 mt-24 md:mt-48 px-6 py-12 md:py-20 mb-16 md:mb-30"
      id="about"
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <TerminalDec />
      </div>

      <div>
        {/* Status Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-[#2CB35A]/30 bg-[#2CB35A]/5 rounded-full font-mono text-xs"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2CB35A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2CB35A]" />
          </span>
          <span className="text-[#2CB35A]">Available for work</span>
        </div>

        {/* Name with gradient */}
        <h1
          className="text-4xl md:text-7xl font-bold"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Kamalveer{" "}
          <span className="bg-gradient-to-r from-[#2CB35A] to-[#5DEBB5] bg-clip-text text-transparent">
            Singh
          </span>
        </h1>

        {/* Subtitle */}
        <div
          className="flex flex-col md:flex-row gap-2 md:gap-4 text-gray-500 my-4 font-mono text-lg md:text-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <p>FULL-STACK DEVELOPER</p>
          <span className="hidden md:inline">•</span>
          <p>MOBILE APP DEVELOPER</p>
        </div>

        {/* Typing Bio */}
        <div
          className="bg-[#181E25]/60 border border-gray-700/50 rounded-md px-4 py-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
            <span className="ml-1">about.js</span>
          </div>
          <p className="text-gray-300 text-sm md:text-base font-mono leading-relaxed">
            <span className="text-gray-500">{"// "}</span>
            {displayedText}
            {showCursor && (
              <span
                className={`inline-block ml-0.5 text-[#2CB35A] ${
                  typingDone ? "animate-pulse" : ""
                }`}
              >
                █
              </span>
            )}
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap mt-8 md:mt-10 gap-3 md:gap-4 transition-all duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}
        >
          <Link
            href="https://github.com/kamalveersingh"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex border border-[#2CB35A] bg-[#2CB35A] text-gray-900 px-4 md:px-5 py-2.5 md:py-3 transition-all duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:shadow-[0_0_20px_rgba(44,179,90,0.3)] hover:scale-105"
          >
            <FiGithub className="transition-transform group-hover:rotate-12" />
            GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex border border-gray-700 bg-[#181E25] text-gray-200 px-4 md:px-5 py-2.5 md:py-3 transition-all duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold hover:shadow-[0_0_15px_rgba(44,179,90,0.15)]"
          >
            <FiLinkedin className="transition-transform group-hover:scale-110" />
            LinkedIn
          </Link>

          <Link
            href="mailto:kamalhara7@gmail.com"
            className="group flex border border-gray-700 bg-[#181E25] text-gray-200 px-4 md:px-5 py-2.5 md:py-3 transition-all duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold hover:shadow-[0_0_15px_rgba(44,179,90,0.15)]"
          >
            <FiMail className="transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Email</span>
            <span className="sm:hidden">Email</span>
          </Link>

          <Link
            href="/Kamalveer_Singh_Resume_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex border border-gray-700 bg-[#181E25] text-gray-200 px-4 md:px-5 py-2.5 md:py-3 transition-all duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold hover:shadow-[0_0_15px_rgba(44,179,90,0.15)]"
          >
            <FiFile className="transition-transform group-hover:scale-110" />
            Resume
          </Link>
        </div>
      </div>
    </main>
  );
}
export default Hero;
