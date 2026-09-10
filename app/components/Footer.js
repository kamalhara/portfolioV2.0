import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1040px] border-t border-paper-border px-6 pt-16 text-center sm:px-10 lg:px-12">
      <div className="mb-8"><h2 className="select-none font-serif text-6xl font-normal italic tracking-tight sm:text-7xl md:text-8xl">see you</h2><p className="mt-2 font-mono text-[11px] tracking-wider text-ink-muted">またね &nbsp; Goodbye—see you soon.</p></div>
      <p className="mb-6 font-mono text-[11px] uppercase tracking-wide text-ink-muted">Kamalveer · © {new Date().getFullYear()} · Available for building things</p>
      <nav className="mb-10 flex items-center justify-center gap-6 font-mono text-xs uppercase"><Link className="text-ink-muted hover:text-ink-text" href="/#work">Work</Link><Link className="text-ink-muted hover:text-ink-text" href="/#experience">Experience</Link><Link className="text-ink-muted hover:text-ink-text" href="/#about">About</Link><a className="text-ink-muted hover:text-ink-text" href="https://github.com/kamalhara" target="_blank" rel="noopener noreferrer">GitHub ↗</a></nav>
      <div className="flex flex-col justify-between gap-4 border-t border-paper-border py-6 font-mono text-[11px] text-ink-muted sm:flex-row sm:items-center"><div className="flex flex-wrap gap-6"><a className="hover:text-ink-text" href="mailto:kamalhara7@gmail.com">hello@kamalveer</a><a className="inline-flex items-center gap-1 hover:text-ink-text" href="https://github.com/kamalhara" target="_blank" rel="noopener noreferrer">GitHub <FiArrowUpRight /></a><a className="inline-flex items-center gap-1 hover:text-ink-text" href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/" target="_blank" rel="noopener noreferrer">LinkedIn <FiArrowUpRight /></a></div><a className="hover:text-ink-text" href="#main">Back to top ↑</a></div>
    </footer>
  );
}
