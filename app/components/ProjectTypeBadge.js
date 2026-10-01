import {
  AppWindow,
  GitFork,
  ServerCog,
  Smartphone,
  TabletSmartphone,
} from "lucide-react";

const typeIcons = {
  "Open Source": GitFork,
  "Mobile Product": TabletSmartphone,
  "Mobile App": Smartphone,
  "Web App": AppWindow,
  "Backend API": ServerCog,
};

export default function ProjectTypeBadge({ type, className = "" }) {
  const Icon = typeIcons[type];

  return (
    <span
      className={`inline-flex min-h-4.75 items-center gap-1 rounded-full dark:bg-[#3f251b] bg-[#F0D9D1] px-2 py-px text-[11px] leading-[1.2] tracking-normal text-primary ${className}`}
    >
      {Icon && (
        <Icon aria-hidden="true" className="size-3.5 shrink-0 text-brand" />
      )}
      {type}
    </span>
  );
}
