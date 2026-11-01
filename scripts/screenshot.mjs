// Screenshots every section at the given widths into /screenshots.
// Usage: node scripts/screenshot.mjs [width,width] [full]
import fs from "node:fs";
import { chromium } from "playwright";

const widths = (process.argv[2] ?? "1440,390").split(",").map(Number);
const mode = process.argv[3] ?? "sections";
const url = process.env.URL ?? "http://localhost:3000";
fs.mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 900 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    await document.fonts.ready;
  });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, win: innerWidth }));
  console.log(width, "overflow:", overflow, "console errors:", errors.length ? errors : "none");
  if (mode === "full") {
    await page.screenshot({ path: `screenshots/full-${width}.png`, fullPage: true });
  } else {
    const sections = await page.$$("main > section, main > div, footer, body [data-shot]");
    let i = 0;
    for (const s of sections) {
      i++;
      await s.screenshot({ path: `screenshots/${width}-${String(i).padStart(2, "0")}.png` });
    }
    console.log(width, "sections:", i);
  }
  await page.close();
}
await browser.close();
