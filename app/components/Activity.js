"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false },
);

export default function PortfolioActivity() {
  return (
    <div className="overflow-hidden rounded-[15px] border border-(--rep-border) bg-(--rep-surface) px-5 pt-6 pb-4">
      <div className="overflow-x-auto text-(--rep-muted) [scrollbar-width:thin] [&>div]:min-w-177.5 [&_svg]:max-w-none">
        <GitHubCalendar
          username="kamalhara"
          colorScheme="dark"
          theme={{
            dark: ["#252525", "#454545", "#666666", "#a4a4a4", "#e5e5e5"],
          }}
          blockSize={10}
          blockMargin={3}
          blockRadius={2}
          fontSize={11}
        />
      </div>
    </div>
  );
}
