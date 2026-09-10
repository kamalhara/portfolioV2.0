import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-ink bg-orange text-ink">
      <div className="site-shell py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em]">
              Have a useful problem?
            </p>
            <a
              href="mailto:kamalhara7@gmail.com"
              className="mt-4 inline-block max-w-4xl text-4xl font-semibold tracking-[-0.06em] underline decoration-2 underline-offset-8 sm:text-6xl md:text-7xl"
            >
              Tell me what you&apos;re building.
            </a>
          </div>
          <div className="flex gap-5 md:col-span-4 md:justify-end">
            <a
              href="https://github.com/kamalhara"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-11 w-11 items-center justify-center border border-ink hover:bg-ink hover:text-white"
            >
              <FiGithub aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-11 w-11 items-center justify-center border border-ink hover:bg-ink hover:text-white"
            >
              <FiLinkedin aria-hidden="true" />
            </a>
            <a
              href="mailto:kamalhara7@gmail.com"
              aria-label="Email Kamalveer Singh"
              className="flex h-11 w-11 items-center justify-center border border-ink hover:bg-ink hover:text-white"
            >
              <FiMail aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kamalveer Singh</p>
          <p className="font-mono text-xs">Designed and built with care.</p>
          <a href="#main" className="flex items-center gap-2 font-semibold">
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
