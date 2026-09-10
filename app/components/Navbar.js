"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "GitHub ↗", href: "https://github.com/kamalhara", external: true },
];

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="nav-frame">
        <Link href="/" className="wordmark">
          <span className="wordmark-mark">KS</span>
          <span>
            <strong>Kamalveer ↗</strong>
            <small>Developer / builder</small>
          </span>
        </Link>

        <p className="local-time" aria-label={`India time ${time}`}>
          <span /> GMT+5:30&nbsp; {time || "--:--:--"}
        </p>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
