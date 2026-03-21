"use client";

import { useState, useEffect } from "react";

const lines = [
  { text: "> initializing portfolio...", delay: 0 },
  { text: "> loading components... ██████████ 100%", delay: 400 },
  { text: "> compiling assets... done", delay: 800 },
  { text: "> establishing connection... OK", delay: 1200 },
  { text: "> launching kamalveer.dev", delay: 1600, green: true },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if already loaded this session
    if (sessionStorage.getItem("portfolio_loaded")) {
      setVisible(false);
      return;
    }

    lines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay);
    });

    // Start fade out after last line
    setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // Remove from DOM
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("portfolio_loaded", "true");
    }, 2700);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0C1117] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-lg px-6">
        {/* Terminal window */}
        <div className="border border-gray-700 bg-[#0C1117] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-700 bg-[#181E25]/60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-xs text-gray-500 ml-2 font-mono">
              terminal — zsh
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-4 md:p-6 font-mono text-sm space-y-2 min-h-[180px]">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`transition-opacity duration-300 ${
                  visibleLines.includes(index) ? "opacity-100" : "opacity-0"
                } ${line.green ? "text-[#2CB35A]" : "text-gray-400"}`}
              >
                {line.text}
                {index === visibleLines[visibleLines.length - 1] && (
                  <span className="animate-pulse text-[#2CB35A] ml-1">█</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
