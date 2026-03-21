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
        <h1
          className="text-4xl md:text-7xl font-bold"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Kamalveer <span className="text-green-300">Singh</span>
        </h1>

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

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <p className="text-gray-300 text-base md:text-xl font-mono">
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

        <div
          className="flex flex-wrap mt-8 md:mt-12 gap-3 md:gap-4 transition-all duration-300"
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
            className="flex border border-[#2CB35A] bg-[#2CB35A] text-gray-900 px-4 md:px-5 py-2.5 md:py-3 transition-colors duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold"
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
            className="flex border border-gray-700 bg-[#181E25] text-gray-200 px-4 md:px-5 py-2.5 md:py-3 transition-colors duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold"
          >
            <span>
              <FiLinkedin />
            </span>
            LinkedIn
          </Link>

          <Link
            href="mailto:kamalhara7@gmail.com"
            className="flex border border-gray-700 bg-[#181E25] text-gray-200 px-4 md:px-5 py-2.5 md:py-3 transition-colors duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold"
          >
            <span>
              <FiMail />
            </span>
            <span className="hidden sm:inline">Copy Email</span>
            <span className="sm:hidden">Email</span>
          </Link>

          <Link
            href="https://example.com/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex border border-gray-700 bg-[#181E25] text-gray-200 px-4 md:px-5 py-2.5 md:py-3 transition-colors duration-300 justify-center items-center gap-2 text-base md:text-lg space-grostesk-semi-bold hover:border-[#2CB35A] hover:text-[#2CB35A] font-semibold"
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
