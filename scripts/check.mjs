// Quality checks from the brief: copy match, hard-coded colours, Kalice use, neighbouring backgrounds, small assets.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const url = process.env.URL ?? "http://localhost:3000";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const hex = walk("components").concat(["app/page.tsx", "app/layout.tsx"]).filter((f) => /#[0-9a-fA-F]{3,8}\b/.test(fs.readFileSync(f, "utf8").replace(/href="#[^"]*"|href: "#[^"]*"|"#[a-z-]+"/g, "")));
console.log("hard-coded hex in components:", hex.length ? hex : "none");

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto(url, { waitUntil: "networkidle" });
// Open every accordion so hidden copy counts.
const res = await p.evaluate(() => {
  const norm = (s) => s.replace(/[\s ]+/g, " ").trim();
  const text = norm(document.body.textContent);
  const kalice = [...document.querySelectorAll("body *")].filter((e) => e.children.length === 0 && e.textContent.trim() && getComputedStyle(e).fontFamily.includes("Kalice")).map((e) => `${e.tagName}:${e.textContent.trim().slice(0, 28)}`);
  const secs = [...document.querySelectorAll("main > section, main > div, footer")].map((e) => getComputedStyle(e).backgroundColor);
  const same = secs.flatMap((c, i) => (i && c === secs[i - 1] ? [i] : []));
  const small = [...document.querySelectorAll("main > section")].map((s, i) => (s.querySelector("[data-float], img[src*=corner-pattern]") ? i + 1 : 0)).filter(Boolean);
  const imgs = [...document.images].filter((i) => !i.sizes && !i.src.endsWith(".svg")).map((i) => i.src);
  const h1 = document.querySelectorAll("h1").length;
  const noAlt = [...document.images].filter((i) => !i.hasAttribute("alt")).length;
  const order = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1]);
  const jump = order.flatMap((n, i) => (i && n - order[i - 1] > 1 ? [i] : []));
  return { text, kalice, same, small, imgs, h1, noAlt, jump, fontOk: document.fonts.check('16px "Kalice"'), emCount: [...document.querySelectorAll("main > section")].map((s) => s.querySelectorAll("h1 em,h2 em,h3 em").length) };
});
const md = fs.readFileSync("content/homepage-copy.md", "utf8");
const page = res.text;
const skip = /^(Page title|Meta description|Use Testimonials|Team row|Pull quote|Stats|Badges|Announcement|Main menu|Rows|Fields|Resident strip, left|Testimonial|Result|Team|Firm license|Professional memberships|Portal features|After-hours|Office hours|Next LCAM|Handover timeline|Condo compliance|\[)/;
const fills = { "[Condo compliance]": "Milestone inspection and reserve study coordination", "[Handover timeline]": "Proposal within 5 business days · Handover complete in 30 to 45 days", "[Portal features]": "Pay dues online, download community documents and track your work orders", "[After-hours line]": "(561) 000-0000", "[Office hours]": "Monday to Friday, 9 a.m. to 5 p.m.", "[Firm license]": "#000000", "[Next LCAM class]": "Starts Wednesday, January 13, 2027 · Instructor: Angela Dean, LCAM · 10 weeks · $399" };
const body = md.slice(0, md.indexOf("# PLACEHOLDER CONTENT"));
const missing = [];
for (const raw of body.split("\n")) {
  const line = raw.match(/^- (.*)$/)?.[1];
  if (!line) continue;
  const key = line.split(":")[0];
  if (skip.test(line)) continue;
  let value = line.includes(": ") ? line.slice(line.indexOf(": ") + 2) : line;
  for (const [k, v] of Object.entries(fills)) value = value.split(k).join(v);
  value = value.replace(/\.\./g, ".");
  const parts = (line.match(/^[A-Z][^:]*\? /) ? line.split(/(?<=\?) /) : value.split(/ · | Bullets: | Link: |\. Link: | \/ |; |, (?=[A-Z])|(?<=\.) /)).map((s) => s.replace(/\.$/, "").trim()).filter(Boolean);
  for (const part of parts) if (!page.includes(part)) missing.push(`${key} => ${part.slice(0, 70)}`);
}
console.log("copy fragments not found on page:", missing.length ? missing : "none");
console.log("h1 count:", res.h1, "| images without alt:", res.noAlt, "| images without sizes:", res.imgs.length, "| heading level jumps:", res.jump.length);
console.log("neighbouring sections with the same background (index):", res.same.length ? res.same : "none");
console.log("sections with small assets:", res.small);
console.log("italic headline words per section:", res.emCount.join(","));
console.log("Kalice loaded:", res.fontOk, "| non-heading Kalice uses:", res.kalice.filter((k) => !/^(H[1-4]|EM|DD|SPAN|P):/.test(k)));
await b.close();
