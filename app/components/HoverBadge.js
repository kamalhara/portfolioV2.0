export default function HoverBadge({ label }) {
  return (
    <span
      aria-hidden="true"
      className={`hover-badge rounded-lg border border-border bg-neutral-50/80 px-2.5 py-0.5 text-[12px] font-medium tracking-wide text-muted-foreground backdrop-blur dark:bg-[#171717] ${label === "Search" && "tracking-widest mb-2"}`}
    >
      {label}
    </span>
  );
}
