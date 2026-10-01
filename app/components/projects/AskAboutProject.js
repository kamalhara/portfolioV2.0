"use client";

import { MessageCircle } from "lucide-react";
import { askAboutProject } from "@/app/lib/assistantEvents";

export default function AskAboutProject({ title }) {
  return (
    <button
      type="button"
      className="project-action ui-press"
      aria-haspopup="dialog"
      onClick={(event) => askAboutProject(title, event.currentTarget)}
    >
      <MessageCircle size={14} aria-hidden="true" />
      Ask about this project
    </button>
  );
}
