"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Capabilities", href: "/#skills" },
  { label: "Archive", href: "/project" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper/95 backdrop-blur-sm">
      <nav
        aria-label="Primary navigation"
        className="site-shell flex h-18 items-center justify-between"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.03em]"
          onClick={() => setOpen(false)}
        >
          KS
          <span className="font-mono text-xs font-medium text-muted">
            Software engineer
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold text-muted transition-colors hover:text-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:kamalhara7@gmail.com"
              className="button-primary min-h-10 px-4 py-2"
            >
              Say hello
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full min-h-[calc(100vh-4.5rem)] border-t border-ink bg-paper px-5 py-8 md:hidden"
        >
          <ul className="site-shell flex flex-col">
            {links.map((link, index) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-5 text-2xl font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <span className="font-mono text-xs text-muted">
                    0{index + 1}
                  </span>
                </Link>
              </li>
            ))}
            <li className="pt-8">
              <a
                href="mailto:kamalhara7@gmail.com"
                className="button-primary w-full"
              >
                Say hello
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
