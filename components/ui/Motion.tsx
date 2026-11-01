"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __siteMotion?: boolean;
  }
}

/** Counts a figure like "18,000+" up from zero, keeping whatever sits around it. */
function countUp(el: HTMLElement) {
  const m = el.textContent?.match(/^(\D*)([\d,]+)(.*)$/);
  if (!m) return;
  const [, before, digits, after] = m;
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target) || target === 0) return;
  const grouped = digits.includes(",");
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / 900);
    // Ease out, so it slows into the real figure rather than stopping dead.
    const value = Math.round(target * (1 - (1 - t) ** 3));
    el.textContent = before + (grouped ? value.toLocaleString("en-US") : String(value)) + after;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Fades each [data-reveal] section in once, the first time it enters the viewport. */
export default function Motion() {
  useEffect(() => {
    window.__siteMotion = true;
    const animate = document.documentElement.classList.contains("motion");
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

    // The figures in the proof strip. One observer, and each one runs once.
    const counts = document.querySelectorAll<HTMLElement>("[data-count]");
    let counter: IntersectionObserver | undefined;
    if (animate && counts.length) {
      counter = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            counter!.unobserve(entry.target);
            countUp(entry.target as HTMLElement);
          }
        },
        { threshold: 0.6 },
      );
      counts.forEach((el) => counter!.observe(el));
    }

    // The hero photograph drifts under its scrim. One rAF-throttled handler,
    // and it only does work while the hero is still on screen.
    const hero = document.querySelector<HTMLElement>("[data-hero-photo]");
    let heroWatcher: IntersectionObserver | undefined;
    let onScroll: (() => void) | undefined;
    if (animate && hero) {
      let queued = false;
      let onScreen = true;
      const apply = () => {
        queued = false;
        const p = Math.min(1, window.scrollY / window.innerHeight);
        hero.style.transform = p ? `translate3d(0, ${(p * 4).toFixed(2)}%, 0) scale(${(1 + p * 0.07).toFixed(4)})` : "";
      };
      onScroll = () => {
        if (!onScreen || queued) return;
        queued = true;
        requestAnimationFrame(apply);
      };
      heroWatcher = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) onScroll!();
      });
      heroWatcher.observe(hero);
      window.addEventListener("scroll", onScroll, { passive: true });
      // The opening scale animation owns the transform until it is done.
      hero.addEventListener("animationend", apply, { once: true });
    }

    return () => {
      io.disconnect();
      counter?.disconnect();
      heroWatcher?.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
