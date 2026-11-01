// Grades /assets-src into /public/images (WebP at 1x and 2x), builds the transparent
// cutouts and writes /assets-src/manifest.json. Run with: node scripts/process-assets.mjs
import fs from "node:fs";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/images";
const FILE = "https://www.figma.com/design/qA757iHHXwpvtMl6coTlGc?node-id=";
const MODEL = "gpt-image-2.5-flare";

const REALISM =
  "Documentary photograph, not a render. Shot on a full-frame camera with a 35mm lens at f/4, natural light only. True-to-life colour with a soft warm cast, gentle contrast, slightly muted greens and creamy highlights, fine film grain like Kodak Portra 400. Real-world imperfections: weathered stucco, uneven grass, small stains, utility boxes, parked cars. No HDR, no oversaturation, no glossy or plastic surfaces, no perfect symmetry, no lens flare, no text, signs, logos or watermarks.";
const PEOPLE =
  "Candid and mid-moment, not looking at the camera unless stated. Natural skin with visible pores and fine lines, no retouching, real everyday clothes. Relaxed hands with five fingers.";
const WALL = "standing in front of a plain warm off-white interior wall that fills the whole background, soft daylight from a large window to one side, nothing else visible behind him.";
const object = (o) => `A single ${o}, shot top-down on seamless warm cream paper (#F6EFE6), soft daylight from the upper left, a gentle natural shadow, crisp real-material detail, nothing else in frame. ${REALISM}`;

// w1/w2 are the 1x and 2x widths. Source files top out at 1536px, so 2x never upscales.
const assets = [
  { src: "01-hero", node: "2-6", w1: 768, w2: 1536, max: 450, prompt: `Two-storey Mediterranean Revival townhomes inside a gated community in Palm Beach County, Florida. Cream stucco, terracotta barrel-tile roofs, arched loggias, tall royal palms, a neatly edged lawn, one resident walking a dog far in the distance. Late-afternoon sun, long soft shadows, a pale hazy sky. Eye level from the street. Keep the lower-left third calm and slightly darker for a large headline. ${REALISM}` },
  { src: "02-boards-placeholder", node: "3-2", w1: 512, w2: 1024, prompt: `Four volunteer board members of a Florida condominium association, mixed ages from their 40s to their 70s and mixed backgrounds, around a clubhouse table with their community manager, reviewing printed financial reports. Smart-casual clothes, reading glasses, coffee cups, a binder. Window light from the left. Mid-conversation. ${REALISM} ${PEOPLE}` },
  { src: "03-residents-placeholder", node: "3-3", w1: 512, w2: 1024, prompt: `A woman in her 30s at the entrance of a low-rise condo building in Delray Beach, Florida, glancing at her phone while carrying a tote bag. Bright open shade, a stucco wall, a potted palm, mailboxes slightly out of focus. ${REALISM} ${PEOPLE}` },
  { src: "04-investors-placeholder", node: "3-4", w1: 512, w2: 1024, prompt: `A man in his 50s in the driveway of a single-storey stucco rental house in Lake Worth, Florida, holding a ring of keys and talking to someone out of frame. Soft overcast light, a slightly worn concrete driveway, a sea-grape hedge. ${REALISM} ${PEOPLE}` },
  { src: "05-lcam-placeholder", node: "3-5", w1: 512, w2: 1024, prompt: `An evening study scene at a kitchen table in a Florida apartment: an open laptop with its screen blurred and unreadable, a thick study book, flash cards, a highlighter and a mug. Warm lamp light mixed with blue dusk from the window. Only the student's hands in frame. ${REALISM} ${PEOPLE}` },
  { src: "06-hoa", node: "3-6", w1: 480, w2: 960, prompt: `A quiet residential street inside a South Florida HOA: single-family homes with barrel-tile roofs, sidewalks, sabal palms, lawn edges still damp from sprinklers. Early-morning light. ${REALISM}` },
  { src: "07-condo", node: "3-7", w1: 512, w2: 1024, prompt: `A mid-rise condominium in Boca Raton seen from its pool deck: white balconies with glass railings, lounge chairs, palms, late-day light and a little haze. Straight vertical lines. ${REALISM}` },
  { src: "08-investment", node: "3-8", w1: 640, w2: 1280, prompt: `A single-storey 1960s Florida ranch house with pale yellow stucco, white hurricane shutters, a carport and a mango tree. Clear morning light, a little peeling paint on the fascia. ${REALISM}` },
  { src: "09-keys-handover-placeholder", node: "3-9", w1: 768, w2: 1536, prompt: `Close-up of two hands passing a ring of brass keys across a wooden table, with a signed document (text unreadable) and a pen beside them. Soft window light, shallow depth of field, real skin texture. ${REALISM} ${PEOPLE}` },
  { src: "10-portal-placeholder", node: "3-10", w1: 512, w2: 1024, prompt: `A woman in her 60s on her condo balcony in Fort Lauderdale at golden hour, reading a message on her phone, with Intracoastal water and boats softly blurred behind her. ${REALISM} ${PEOPLE}` },
  { src: "11-testimonial-placeholder", node: "3-11", w1: 512, w2: 1024, prompt: `Head-and-shoulders portrait of a woman in her 60s with short grey hair. Laughing naturally in front of a plain warm off-white wall, soft daylight from a large window to one side. ${REALISM} ${PEOPLE}` },
  { src: "12-testimonial-placeholder", node: "3-12", w1: 512, w2: 1024, retries: 1, prompt: `Indoors, studio-simple. Head-and-shoulders portrait of a man in his 40s with a trimmed beard. Laughing naturally in front of a plain warm off-white interior wall that fills the whole background, soft daylight from a large window to one side, nothing else visible behind him. ${REALISM} ${PEOPLE}` },
  { src: "13-testimonial-placeholder", node: "3-13", w1: 512, w2: 1024, prompt: `Head-and-shoulders portrait of a woman in her 50s with curly hair. Laughing naturally in front of a plain warm off-white wall, soft daylight from a large window to one side. ${REALISM} ${PEOPLE}` },
  { src: "14-team-placeholder", node: "3-14", w1: 410, w2: 819, ratio: 0.8, retries: 1, prompt: `Indoors, studio-simple. Waist-up portrait of a man in his 30s, a community manager in a navy polo. Slight smile, looking at the camera, ${WALL} ${REALISM} ${PEOPLE}` },
  { src: "15-team-placeholder", node: "3-15", w1: 410, w2: 819, ratio: 0.8, prompt: `Waist-up portrait of a woman in her 40s, an accounting manager in a cream blouse. Slight smile, looking at the camera, same off-white wall and window light: a plain warm off-white wall, soft daylight from a large window to one side. ${REALISM} ${PEOPLE}` },
  { src: "16-team-placeholder", node: "3-16", w1: 410, w2: 819, ratio: 0.8, retries: 1, prompt: `Indoors, studio-simple. Waist-up portrait of a man in his 20s, a resident services coordinator. Slight smile, looking at the camera, ${WALL} ${REALISM} ${PEOPLE}` },
  // Objects: the What's included section sits on paper, not cream, so they are cut out.
  { src: "17-keys", node: "3-17", w1: 240, w2: 480, cut: "hard", prompt: object("ring of worn brass keys with a leather tag") },
  { src: "18-statement", node: "3-18", w1: 180, w2: 360, cut: "soft", prompt: object("folded monthly financial statement with a paper clip, numbers unreadable") },
  { src: "19-ledger", node: "3-19", w1: 180, w2: 360, cut: "soft", prompt: object("fountain pen resting on an open ledger") },
  { src: "20-envelopes", node: "3-20", w1: 180, w2: 360, cut: "soft", prompt: object("small stack of cream envelopes tied with twine") },
  { src: "21-frond", node: "3-21", w1: 180, w2: 360, cut: "soft", prompt: object("fresh green sabal palm frond") },
  { src: "22-seal", node: "3-22", w1: 280, w2: 560, cut: "seal", prompt: `Top-down photograph of a deep oxblood-maroon wax seal pressed onto heavy cream cotton paper. The impression shows a single palm frond crossed with a key, with no letters or numbers. Hard daylight, a crisp shadow, visible paper fibres and uneven wax edges. The seal sits slightly off-centre. ${REALISM}` },
  // Supplied by the client, not generated. Cropped to the 3:4 leadership frame,
  // which also takes the photographer's mark off the bottom-right corner.
  // Ungraded on purpose: it is a real portrait and keeps the tone it came with.
  { src: "24-angela-dean", w1: 400, w2: 800, raw: true, supplied: "Client-supplied photograph of Angela Dean.", crop: { left: 60, top: 0, width: 960, height: 1280 } },
  { src: "23-paper", node: "3-23", w1: 512, w2: 1024, retries: 1, noRealismBlock: true, prompt: "A flat, evenly lit scan of heavy cream cotton paper with faint fibres and no folds. The entire frame is only blank paper, filled edge to edge, with no objects, no scene and no buildings. True-to-life colour with a soft warm cast, gentle contrast, fine grain. No text, signs, logos or watermarks." },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Same grade on everything: late-afternoon light, the way the reference photography
// reads. A soft S-curve for contrast, then a per-channel slope/offset/power that
// warms the highlights to cream and holds the blue back, then saturation up.
const CONTRAST = 0.3;
const SLOPE = [1.045, 0.99, 0.905];
const OFFSET = [0.02, 0.004, 0];
const POWER = [0.965, 1, 1.045];
const SAT = 1.28;
// The darker a pixel, the further its hue travels to the brand red, so shadows
// settle on oxblood instead of the brown the warm highlights would otherwise imply.
const RED = [0x97, 0x35, 0x33];
const RED_Y = 0.2126 * RED[0] + 0.7152 * RED[1] + 0.0722 * RED[2];
const SHADOW_RED = 0.28;

// One 256-entry curve per channel: the S-curve and the slope/offset/power fold
// together, so the per-pixel pass below is three lookups.
const curves = [0, 1, 2].map((c) =>
  Uint8Array.from({ length: 256 }, (_, i) => {
    const x = i / 255;
    const s = x * x * (3 - 2 * x);
    const y = x + CONTRAST * (s - x);
    return Math.round(clamp01(clamp01(y * SLOPE[c] + OFFSET[c]) ** POWER[c]) * 255);
  }),
);

async function grade(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const stride = info.channels; // 4 when the source carries alpha; it is left alone
  for (let i = 0; i < data.length; i += stride) {
    let r = curves[0][data[i]], g = curves[1][data[i + 1]], b = curves[2][data[i + 2]];
    const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = Y + SAT * (r - Y);
    g = Y + SAT * (g - Y);
    b = Y + SAT * (b - Y);
    const d = 1 - Y / 255;
    const w = d * d * SHADOW_RED;
    const k = Y / RED_Y; // scale the red to this pixel's luma, so only hue moves
    r += w * (RED[0] * k - r);
    g += w * (RED[1] * k - g);
    b += w * (RED[2] * k - b);
    data[i] = clamp01(r / 255) * 255;
    data[i + 1] = clamp01(g / 255) * 255;
    data[i + 2] = clamp01(b / 255) * 255;
  }
  return sharp(data, { raw: info });
}
const smooth = (v, a, b) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };

// Paper colour taken from the four corners of the image.
function cornerColour(d, w, h) {
  const s = [0, 0, 0]; let n = 0;
  for (const [cx, cy] of [[0, 0], [w - 40, 0], [0, h - 40], [w - 40, h - 40]])
    for (let y = cy; y < cy + 40; y++) for (let x = cx; x < cx + 40; x++) {
      const i = (y * w + x) * 3; s[0] += d[i]; s[1] += d[i + 1]; s[2] += d[i + 2]; n++;
    }
  return s.map((v) => v / n);
}

// Keeps only the largest connected region and fills its holes. Used for the seal.
function largestRegion(mask, w, h) {
  const label = new Int32Array(w * h); let best = 0, bestN = 0, cur = 0;
  for (let p = 0; p < w * h; p++) {
    if (!mask[p] || label[p]) continue;
    cur++; let n = 0; const st = [p]; label[p] = cur;
    while (st.length) { const q = st.pop(); n++;
      for (const r of [q - 1, q + 1, q - w, q + w]) if (r >= 0 && r < w * h && mask[r] && !label[r]) { label[r] = cur; st.push(r); }
    }
    if (n > bestN) { bestN = n; best = cur; }
  }
  const out = new Uint8Array(w * h); const seen = new Uint8Array(w * h); const st = [];
  for (let p = 0; p < w * h; p++) { out[p] = label[p] === best ? 1 : 0; }
  for (let x = 0; x < w; x++) { st.push(x, (h - 1) * w + x); }
  for (let y = 0; y < h; y++) { st.push(y * w, y * w + w - 1); }
  while (st.length) { const q = st.pop(); if (q < 0 || q >= w * h || seen[q] || out[q]) continue; seen[q] = 1; st.push(q - 1, q + 1, q - w, q + w); }
  for (let p = 0; p < w * h; p++) if (!seen[p]) out[p] = 1;
  return out;
}

async function cutout(buffer, mode) {
  const { data, info } = await sharp(buffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const bg = cornerColour(data, w, h);
  const rgba = Buffer.alloc(w * h * 4);
  let mask = null;
  if (mode === "seal") {
    // Maroon wax against cream: red clearly above green and blue, and well below paper brightness.
    mask = new Uint8Array(w * h);
    for (let p = 0; p < w * h; p++) {
      const [r, g, b] = [data[p * 3], data[p * 3 + 1], data[p * 3 + 2]];
      mask[p] = r - g > 28 && (r + g + b) / 3 < 150 ? 1 : 0;
    }
    mask = largestRegion(mask, w, h);
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = y * w + x, i = p * 3, o = p * 4;
    const c = [data[i], data[i + 1], data[i + 2]];
    if (mode === "soft") {
      // Colour-to-alpha against the paper: keeps the real shadow, so the object sits on any light page.
      const a = clamp01(Math.max(...c.map((v, k) => (bg[k] - v) / bg[k])) - 0.04);
      const edge = Math.min(x, y, w - 1 - x, h - 1 - y) / 40;
      const alpha = a * smooth(a, 0.015, 0.07) * clamp01(edge);
      for (let k = 0; k < 3; k++) rgba[o + k] = a > 0.004 ? Math.max(0, Math.min(255, (c[k] - bg[k]) / (a + 0.04) + bg[k])) : c[k];
      rgba[o + 3] = alpha * 255;
    } else if (mode === "hard") {
      // Solid object with no shadow, for overlapping type. CSS adds the shadow back.
      const dist = Math.hypot(c[0] - bg[0], c[1] - bg[1], c[2] - bg[2]);
      const sat = Math.max(...c) - Math.min(...c);
      const bgSat = Math.max(...bg) - Math.min(...bg);
      rgba[o] = c[0]; rgba[o + 1] = c[1]; rgba[o + 2] = c[2];
      rgba[o + 3] = 255 * smooth(Math.max(sat - bgSat, 0) + dist * 0.25, 28, 46);
    } else {
      rgba[o] = c[0]; rgba[o + 1] = c[1]; rgba[o + 2] = c[2];
      rgba[o + 3] = mask[p] ? 255 : 0;
    }
  }
  // Soften the seal's mask edge slightly, then crop tight around whatever is left.
  let img = sharp(rgba, { raw: { width: w, height: h, channels: 4 } });
  if (mode === "seal") img = sharp(await img.png().toBuffer()).blur(0.6);
  return sharp(await img.png().toBuffer()).trim({ threshold: 2, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

async function encode(buffer, width, file, maxKB, alpha) {
  let quality = alpha ? 82 : 76, out;
  do {
    out = await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6, alphaQuality: 90 }).toBuffer();
    quality -= 4;
  } while (out.length > maxKB * 1024 && quality > 30);
  fs.writeFileSync(file, out);
  return { kb: Math.round(out.length / 1024), quality: quality + 4 };
}

fs.mkdirSync(OUT, { recursive: true });
const manifest = [];
const sizes = {};
for (const a of assets) {
  const srcFile = `${SRC}/${a.src}.png`;
  let img = sharp(srcFile);
  if (a.ratio) {
    const m = await sharp(srcFile).metadata();
    const width = Math.round(m.height * a.ratio);
    // Team 15 sits low in a taller frame, so crop from the top rather than the centre.
    img = img.extract({ left: Math.round((m.width - width) / 2), top: 0, width, height: m.height });
  }
  if (a.crop) img = img.extract(a.crop);
  let buf = await (a.raw ? img : await grade(img)).png().toBuffer();
  if (a.cut) buf = await cutout(buf, a.cut);
  const max = a.max ?? 250;
  const one = await encode(buf, a.w1, `${OUT}/${a.src}@1x.webp`, max, !!a.cut);
  const two = await encode(buf, a.w2, `${OUT}/${a.src}@2x.webp`, max, !!a.cut);
  const m = await sharp(`${OUT}/${a.src}@2x.webp`).metadata();
  sizes[a.src] = { width: m.width, height: m.height, w1: a.w1 };
  manifest.push({
    file: `${a.src}.png`,
    output: [`public/images/${a.src}@1x.webp`, `public/images/${a.src}@2x.webp`],
    ...(a.supplied
      ? { source: a.supplied }
      : { prompt: a.prompt, model: MODEL, retries: a.retries ?? 0, figma: FILE + a.node }),
    ...(a.raw ? { graded: false } : {}),
    ...(a.noRealismBlock ? { note: "Realism block removed after it produced a building instead of paper." } : {}),
    ...(a.cut ? { cutout: a.cut } : {}),
  });
  console.log(a.src.padEnd(32), `${one.kb}KB`.padStart(7), `${two.kb}KB`.padStart(7), `${m.width}x${m.height}`);
}
fs.writeFileSync(`${SRC}/manifest.json`, JSON.stringify({ figmaFile: FILE.split("?")[0], generations: 28, rejected: [{ file: "01-hero-test-sunburst.png", model: "gpt-image-2.5-sunburst", figma: FILE + "2-5" }], assets: manifest }, null, 2));
fs.writeFileSync("lib/image-sizes.json", JSON.stringify(sizes, null, 2));

// Open Graph image: crawlers want a plain JPEG.
await (await grade(sharp(`${SRC}/01-hero.png`).resize(1200, 630, { fit: "cover" }))).jpeg({ quality: 82 }).toFile(`${OUT}/og-hero.jpg`);
