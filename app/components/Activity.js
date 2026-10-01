"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/app/lib/useTheme";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false },
);

export default function PortfolioActivity() {
  const theme = useTheme();
  return (
    <div className="overflow-hidden rounded-[15px] border border-border bg-card px-5 pt-6 pb-4">
      <div className="activity-calendar overflow-x-auto text-muted-foreground [scrollbar-width:thin] [&>div]:min-w-177.5 [&_svg]:max-w-none">
        <GitHubCalendar
          username="kamalhara"
          colorScheme={theme}
          theme={{
            light: ["#e5e5e5", "#a4a4a4", "#666666", "#454545", "#252525"],
            dark: ["#252525", "#454545", "#666666", "#a4a4a4", "#e5e5e5"],
          }}
          year={new Date().getFullYear()}
          blockSize={10}
          blockMargin={3}
          blockRadius={2}
          fontSize={11}
        />
      </div>
    </div>
  );
}
