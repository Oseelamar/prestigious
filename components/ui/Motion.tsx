"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __siteMotion?: boolean;
  }
}

/** Fades each [data-reveal] section in once, the first time it enters the viewport. */
export default function Motion() {
  useEffect(() => {
    window.__siteMotion = true;
    const targets = document.querySelectorAll("[data-reveal], [data-float-root]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
