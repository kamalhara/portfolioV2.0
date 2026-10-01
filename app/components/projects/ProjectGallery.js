"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { getProjectImages, isMobileProject } from "./projectMedia";

export default function ProjectGallery({ project }) {
  const images = getProjectImages(project);
  const mobile = isMobileProject(project);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const touchStart = useRef(null);
  const swiped = useRef(false);
  const move = (step) =>
    setActive((current) => (current + step + images.length) % images.length);
  const label = (index) =>
    `${project.title} ${images[index].split("/").pop().split(".")[0].replaceAll("-", " ")} preview`;

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      element.close();
    };
  }, [open]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  };
  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 50) {
      move(distance < 0 ? 1 : -1);
      swiped.current = true;
    }
    touchStart.current = null;
  };

  if (!images.length) return null;
  return (
    <div onKeyDown={onKeyDown}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}{" "}
          <span className="ml-2">
            {mobile ? "App screens" : "Interface preview"}
          </span>
        </p>
        {images.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              className="project-icon-button"
              aria-label="Previous screenshot"
              onClick={() => move(-1)}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="project-icon-button"
              aria-label="Next screenshot"
              onClick={() => move(1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          if (swiped.current) {
            swiped.current = false;
            return;
          }
          setOpen(true);
        }}
        onTouchStart={(event) => {
          swiped.current = false;
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
        aria-label={`Enlarge screenshot ${active + 1} of ${project.title}`}
        className={`project-gallery-stage ${mobile ? "project-gallery-stage-mobile" : ""}`}
      >
        <span
          className={`relative block h-full ${mobile ? "aspect-[9/19.5] overflow-hidden rounded-[22px] border-4 border-border-strong bg-muted" : "w-full"}`}
        >
          <Image
            src={images[active]}
            alt={label(active)}
            fill
            sizes={mobile ? "240px" : "(max-width: 850px) 90vw, 800px"}
            className="object-contain"
            data-scroll-reveal="visible"
          />
        </span>
        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-border bg-background/90 px-2.5 py-1.5 text-[11px]">
          <Maximize2 size={12} /> Expand
        </span>
      </button>
      {images.length > 1 && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-2"
          aria-label="Screenshot thumbnails"
        >
          {images.map((src, index) => (
            <button
              type="button"
              aria-label={`Show screenshot ${index + 1}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              key={src}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border ${active === index ? "border-brand bg-brand-soft" : "border-border bg-card"}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1"
                data-scroll-reveal="visible"
              />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        className="project-gallery-dialog"
        data-click-sound="backdrop"
        aria-label={`${project.title} screenshot viewer`}
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <div
            className="project-gallery-viewer"
            onTouchStart={(event) => {
              touchStart.current = event.touches[0].clientX;
            }}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <p className="text-sm">
                {project.title}{" "}
                <span className="ml-2 text-xs text-muted-foreground">
                  {active + 1} / {images.length}
                </span>
              </p>
              <button
                type="button"
                className="project-icon-button"
                aria-label="Close screenshot viewer"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative m-3 h-[min(72dvh,750px)]">
              <Image
                src={images[active]}
                alt={label(active)}
                fill
                sizes="(max-width: 900px) 95vw, 1100px"
                className="object-contain"
                data-scroll-reveal="visible"
              />
            </div>
            {images.length > 1 && (
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs"
                  onClick={() => move(-1)}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-[10px] text-muted-foreground">
                  Arrow keys or swipe
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs"
                  onClick={() => move(1)}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
