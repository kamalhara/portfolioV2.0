import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return <main id="main" className="mx-auto flex min-h-screen max-w-[1040px] flex-col justify-center px-6 py-16 sm:px-10 lg:px-12"><p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">404 / Not found</p><h1 className="mt-6 max-w-3xl text-6xl leading-[.9] font-medium tracking-[-.065em] sm:text-8xl">This page took a wrong turn.</h1><p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted">The address may have changed, or the project may no longer be in the archive.</p><div className="mt-8"><Link href="/" className="inline-flex min-h-11 items-center gap-2 border border-ink-text bg-ink-text px-4 text-sm font-semibold text-bg-cream"><FiArrowLeft /> Return home</Link></div></main>;
}
