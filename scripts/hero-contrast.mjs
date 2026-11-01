// Worst-case contrast of hero text against the pixels actually behind it.
import { chromium } from "playwright";
import sharp from "sharp";
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const b = await chromium.launch();
for (const width of [1920, 1440, 1024, 768, 390]) {
  const p = await b.newPage({ viewport: { width, height: 1500 }, reducedMotion: "reduce" });
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const targets = await p.evaluate(() => {
    const h = document.querySelector("main > section");
    const base = h.getBoundingClientRect();
    return [...h.querySelectorAll("h1, p")].filter((e) => e.getBoundingClientRect().width && !e.closest("[data-float]")).map((e) => {
      const rg = document.createRange(); rg.selectNodeContents(e); const r = rg.getBoundingClientRect();
      return { t: e.textContent.slice(0, 22), x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height, c: getComputedStyle(e).color.match(/\d+/g).map(Number) };
    });
  });
  await p.addStyleTag({ content: "main > section .wrap { visibility: hidden !important; }" });
  const shot = await (await p.$("main > section")).screenshot();
  const { data, info } = await sharp(shot).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (const t of targets) {
    const lt = lum(...t.c); let worst = 99;
    for (let y = Math.max(0, Math.round(t.y)); y < Math.min(info.height, t.y + t.h); y += 2)
      for (let x = Math.max(0, Math.round(t.x)); x < Math.min(info.width, t.x + t.w); x += 2) {
        const i = (y * info.width + x) * 3; worst = Math.min(worst, ratio(lt, lum(data[i], data[i + 1], data[i + 2])));
      }
    console.log(width, t.t.padEnd(24), worst.toFixed(2));
  }
  await p.close();
}
await b.close();
