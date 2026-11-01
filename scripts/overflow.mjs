// Lists elements that stick out past the right edge at the given widths.
import { chromium } from "playwright";
const b = await chromium.launch();
for (const width of (process.argv[2] ?? "768,1024").split(",").map(Number)) {
  const p = await b.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const out = await p.evaluate(() => [...document.querySelectorAll("body *")].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width && r.right > innerWidth + 1 && !e.closest(".snap-row") && !e.closest("footer");
  }).slice(0, 8).map((e) => `${e.tagName} ${String(e.className).slice(0, 70)} right=${Math.round(e.getBoundingClientRect().right)}`));
  console.log(width, out);
  await p.close();
}
await b.close();
