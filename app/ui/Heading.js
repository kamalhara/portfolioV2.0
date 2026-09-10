import React from "react";

export default function Heading({ label1, label2, border_y }) {
  return (
    <div
      className={`mb-2 flex items-start justify-between  pt-4 pb-12 font-mono text-[12px] uppercase tracking-wider text-ink-muted ${border_y ? "border-y-[1.5px] border-paper-border" : "border-t-[1.5px] border-paper-border"} `}
    >
      <p>
        {label1?.slice(0, 2)}{" "}
        <span className=" text-ink-text/60">{label1?.slice(2)}</span>
      </p>

      <span>{label2}</span>
    </div>
  );
}
