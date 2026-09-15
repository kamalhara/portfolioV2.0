"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import IPhoneFrame from "../ui/IPhoneFrame";

function ScreenshotGrid({ projectSlug, projectTitle, screenshots }) {
  return (
    <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:grid-cols-4 md:gap-8">
      {screenshots.map((src, index) => {
        const image = (
          <Image
            src={`/${src}`}
            alt={`${projectTitle} screen ${index + 1}`}
            width={400}
            height={800}
            className="h-auto w-full"
          />
        );

        return (
          <div
            key={src}
            className="transition-transform duration-300 ease-out hover:-translate-y-2"
          >
            {projectSlug === "spotus" ? (
              <IPhoneFrame>{image}</IPhoneFrame>
            ) : (
              <figure className="overflow-hidden border border-paper-border bg-bg-cream-light">
                {image}
              </figure>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectScreenshotGallery({
  projectSlug,
  projectTitle,
  screenshots,
}) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(
      screenshots.length - 1,
      Math.max(0, Math.round(progress * (screenshots.length - 1))),
    );
    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  });

  const showScreenshot = (index) => {
    const section = sectionRef.current;
    if (!section || screenshots.length < 2) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + (index / (screenshots.length - 1)) * travel,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  if (shouldReduceMotion) {
    return (
      <ScreenshotGrid
        projectSlug={projectSlug}
        projectTitle={projectTitle}
        screenshots={screenshots}
      />
    );
  }

  return (
    <>
      <div className="md:hidden">
        <ScreenshotGrid
          projectSlug={projectSlug}
          projectTitle={projectTitle}
          screenshots={screenshots}
        />
      </div>
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${Math.max(230, screenshots.length * 62)}vh` }}
      >
        <div className="sticky top-20 h-[calc(100vh-6rem)] min-h-150 overflow-hidden border border-paper-border bg-ink-text text-bg-cream">
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-bg-cream/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bg-cream/55">
            <span>Scroll to inspect</span>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(screenshots.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid h-full grid-cols-[7.5rem_minmax(0,1fr)_7.5rem] items-center gap-6 px-5 pt-14 lg:grid-cols-[10rem_minmax(0,1fr)_10rem] lg:gap-10 lg:px-8">
            <div className="flex flex-col gap-3" aria-label="Previous screens">
              {screenshots.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => showScreenshot(index)}
                  aria-label={`Show ${projectTitle} screen ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`relative h-[clamp(4.5rem,12vh,7.5rem)] overflow-hidden border transition-all duration-300 ${
                    index === activeIndex
                      ? "border-accent-orange opacity-100"
                      : "border-bg-cream/15 opacity-35 hover:border-bg-cream/50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={`/${src}`}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex h-[min(72vh,42rem)] items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={screenshots[activeIndex]}
                  initial={{ opacity: 0, rotate: 2.5, scale: 0.96, y: 28 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                  exit={{ opacity: 0, rotate: -2.5, scale: 0.97, y: -22 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex h-full max-h-165 items-center justify-center"
                >
                  {projectSlug === "spotus" ? (
                    <div className="w-[min(18rem,24vw)]">
                      <IPhoneFrame>
                        <Image
                          src={`/${screenshots[activeIndex]}`}
                          alt={`${projectTitle} screen ${activeIndex + 1}`}
                          width={400}
                          height={800}
                          className="h-auto w-full"
                        />
                      </IPhoneFrame>
                    </div>
                  ) : (
                    <div className="h-full overflow-hidden border border-bg-cream/20 bg-bg-cream-light shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                      <Image
                        src={`/${screenshots[activeIndex]}`}
                        alt={`${projectTitle} screen ${activeIndex + 1}`}
                        width={400}
                        height={800}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  )}
                </motion.figure>
              </AnimatePresence>
              <span
                aria-hidden="true"
                className="absolute font-serif text-[clamp(10rem,26vw,24rem)] italic leading-none text-bg-cream/[0.035]"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col-reverse gap-3" aria-hidden="true">
              {screenshots.map((src, index) => (
                <div
                  key={src}
                  className={`relative h-[clamp(4.5rem,12vh,7.5rem)] overflow-hidden border transition-all duration-300 ${
                    index === activeIndex
                      ? "border-accent-orange opacity-100"
                      : "border-bg-cream/15 opacity-25"
                  }`}
                >
                  <Image
                    src={`/${src}`}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
