import Image from "next/image";
import { Braces, Database, KeyRound } from "lucide-react";
import { getProjectImages, isMobileProject } from "./projectMedia";

export default function ProjectPreview({
  project,
  large = false,
  preload = false,
}) {
  const images = getProjectImages(project);
  if (isMobileProject(project) && images.length) {
    return (
      <div
        className={`project-mobile-preview ${large ? "project-mobile-preview-large" : ""}`}
      >
        {images.slice(0, large ? 3 : 2).map((src, index) => (
          <div className="project-phone" key={src}>
            <Image
              src={src}
              alt={`${project.title} ${src.split("/").pop().split(".")[0].replaceAll("-", " ")} screen`}
              fill
              preload={preload && index === 0}
              sizes={
                large
                  ? "(max-width: 600px) 30vw, 190px"
                  : "(max-width: 600px) 40vw, 150px"
              }
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
    );
  }
  if (images.length) {
    return (
      <div
        className={`project-web-preview ${large ? "project-web-preview-large" : ""}`}
      >
        <div className="project-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <span className="project-browser-title">{project.title}</span>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Image
            src={images[0]}
            alt={`${project.title} interface preview`}
            fill
            preload={preload}
            sizes={
              large
                ? "(max-width: 850px) 90vw, 780px"
                : "(max-width: 600px) 90vw, 390px"
            }
            className={
              project.coverFit === "contain"
                ? "object-contain"
                : "object-cover object-top"
            }
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`project-api-preview ${large ? "project-api-preview-large" : ""}`}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Braces size={15} /> REST API
      </div>
      <div className="my-5 flex items-center gap-3 text-sm">
        <span className="rounded-lg border border-border px-3 py-2">
          Client
        </span>
        <span className="flex-1 border-t border-dashed border-border-strong" />
        <span className="rounded-lg border border-brand/30 bg-brand-soft px-3 py-2 text-brand">
          Express
        </span>
        <span className="flex-1 border-t border-dashed border-border-strong" />
        <Database size={22} className="text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground">Tours · Users · Reviews</p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <KeyRound size={12} /> JWT authentication
        </span>
        <span>MongoDB</span>
      </div>
    </div>
  );
}
