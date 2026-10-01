"use client";

import { useEffect } from "react";

const revealSelector = [
  "#main-content > *",
  "#projects > ul > li",
  "#stack > div > div",
  "#main > header",
  "#main > ul > li",
  "#main > a",
  "#main article > header",
  "#main article > figure",
  "#main article > section:not(#features)",
  "#main article #features > h2",
  "#main article #features > .project-section-kicker",
  "#main article section li",
  "#main article section img",
  "#main article > a",
].join(", ");

export default function ScrollReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.IntersectionObserver
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.scrollReveal = "visible";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    function watchNewContent() {
      for (const element of document.querySelectorAll(revealSelector)) {
        if (element.hasAttribute("data-scroll-reveal")) continue;

        const bounds = element.getBoundingClientRect();
        const visible =
          bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;
        element.dataset.scrollReveal = visible ? "visible" : "pending";
        if (!visible) observer.observe(element);
      }

      document.documentElement.classList.add("motion-ready");
    }

    watchNewContent();
    const mutations = new MutationObserver(watchNewContent);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
