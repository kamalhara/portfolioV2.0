"use client";

import dynamic from "next/dynamic";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false },
);

export default function GithubGraph() {
  return (
    <section
      aria-labelledby="github-title"
      className="site-shell pb-20 md:pb-28"
    >
      <div className="grid gap-8 border-t border-ink pt-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="section-label">04 / In public</p>
          <h2
            id="github-title"
            className="mt-5 text-3xl font-semibold tracking-[-0.045em]"
          >
            The work between the launches.
          </h2>
        </div>

        <figure className="min-w-0 border border-line bg-sheet p-5 md:col-span-8 md:p-7">
          <figcaption className="mb-6 flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 font-semibold">
              <FiGithub aria-hidden="true" /> GitHub activity
            </span>
            <a
              href="https://github.com/kamalhara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-sm"
              aria-label="View Kamalveer Singh on GitHub"
            >
              @kamalhara <FiArrowUpRight aria-hidden="true" />
            </a>
          </figcaption>
          <div
            className="overflow-x-auto pb-2 text-sm text-muted"
            aria-label="Kamalveer Singh's GitHub contribution calendar"
          >
            <GitHubCalendar
              username="kamalhara"
              colorScheme="light"
              theme={{
                light: ["#ebe7de", "#b7c3f3", "#748be5", "#415fda", "#2447d7"],
              }}
              blockSize={12}
              blockMargin={4}
              blockRadius={0}
              fontSize={13}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
