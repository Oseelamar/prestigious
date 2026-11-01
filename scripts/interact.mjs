// Exercises the form, accordions, nav and motion in a real browser.
import { chromium } from "playwright";
const b = await chromium.launch();
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errors = []; p.on("console", (m) => m.type() === "error" && errors.push(m.text())); p.on("pageerror", (e) => errors.push(String(e)));
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
console.log("motion class:", await p.evaluate(() => document.documentElement.className.includes("motion")));
const r = p.locator("main > section").nth(1);
console.log("below-fold opacity before:", await r.evaluate((e) => getComputedStyle(e).opacity));
await r.scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
console.log("after scroll:", await r.evaluate((e) => getComputedStyle(e).opacity));
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
// Nav dropdown by keyboard
const assoc = p.getByRole("button", { name: "Associations" });
await assoc.focus(); await p.keyboard.press("Enter");
console.log("dropdown expanded:", await assoc.getAttribute("aria-expanded"), "| link visible:", await p.getByRole("link", { name: "HOA management" }).first().isVisible());
await p.keyboard.press("Escape");
console.log("after Esc:", await assoc.getAttribute("aria-expanded"));
// Skip link first in tab order
await p.reload({ waitUntil: "networkidle" }); await p.keyboard.press("Tab");
console.log("first tab stop:", await p.evaluate(() => document.activeElement.textContent));
const ring = await p.evaluate(() => { const c = getComputedStyle(document.activeElement); return `${c.outlineWidth} ${c.outlineColor} ${c.outlineOffset}`; });
console.log("focus ring:", ring);
// FAQ
const q = p.getByRole("button", { name: "What areas do you serve?" });
console.log("FAQ first open:", await q.getAttribute("aria-expanded"));
await p.getByRole("button", { name: "How much does management cost?" }).click();
console.log("FAQ after click:", await q.getAttribute("aria-expanded"), await p.getByRole("button", { name: "How much does management cost?" }).getAttribute("aria-expanded"));
// Form: empty, bad email, then valid
const submit = p.getByRole("button", { name: "Request my proposal" });
await submit.click();
console.log("errors shown:", await p.locator("form [id$=-e]").count(), "| focus on:", await p.evaluate(() => document.activeElement.name), "| invalid attr:", await p.locator("#f-full-name").getAttribute("aria-invalid"));
await p.fill("#f-full-name", "Test Person"); await p.fill("#f-email", "nope"); await p.fill("#f-phone", "5615550100");
await p.selectOption("#f-your-role", "Board member"); await p.selectOption("#f-property-type", "HOA");
await p.fill("#f-community-or-property-name", "Test Community"); await p.selectOption("#f-city", "Lantana");
await submit.click();
console.log("email error:", await p.locator("#f-email-e").textContent());
await p.fill("#f-email", "test@example.com");
const reqs = []; p.on("request", (q) => q.method() === "POST" && reqs.push(q.url()));
await submit.click(); await p.waitForTimeout(500);
console.log("success:", await p.getByRole("status").textContent({ timeout: 3000 }), "| POST requests:", reqs.length);
console.log("console errors:", errors.length ? errors : "none");
await p.close();
// Mobile menu
p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
const menu = p.getByRole("button", { name: "Menu", exact: true });
await menu.click();
console.log("mobile menu:", await p.getByRole("button", { name: "Close" }).getAttribute("aria-expanded"), "| fills screen:", await p.locator("#mobile-menu").evaluate((e) => Math.round(e.getBoundingClientRect().bottom) === innerHeight));
const small = await p.evaluate(() => [...document.querySelectorAll("#mobile-menu a, nav button")].filter((e) => e.getBoundingClientRect().height < 44 && e.getBoundingClientRect().height > 0).map((e) => e.textContent.slice(0, 30)));
console.log("small tap targets in menu:", small);
await p.getByRole("button", { name: "Close" }).click();
const tiny = await p.evaluate(() => [...document.querySelectorAll("a, button, select, input, textarea")].filter((e) => { const r = e.getBoundingClientRect(); return r.height > 0 && r.height < 44 && getComputedStyle(e).display !== "inline"; }).map((e) => `${e.tagName} ${e.textContent.trim().slice(0, 30)} ${Math.round(e.getBoundingClientRect().height)}`));
console.log("tap targets under 44px on mobile:", tiny.length ? tiny : "none");
await b.close();
