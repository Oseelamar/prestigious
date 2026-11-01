import fs from "node:fs";
import path from "node:path";

// All page copy lives in content/homepage-copy.md. This reads it, fills the [brackets]
// from PLACEHOLDER CONTENT, and hands components the words unchanged.
type Item = { text: string; children: string[] };

const md = fs.readFileSync(path.join(process.cwd(), "content/homepage-copy.md"), "utf8");

const sections: Record<string, Item[]> = {};
let current: Item[] = [];
for (const line of md.split("\n")) {
  const heading = line.match(/^#{1,2} (.+)$/);
  if (heading) {
    current = sections[heading[1].trim()] = [];
  } else if (line.startsWith("  - ")) {
    current[current.length - 1]?.children.push(line.slice(4).trim());
  } else if (line.startsWith("- ")) {
    current.push({ text: line.slice(2).trim(), children: [] });
  }
}

const placeholder = (key: string) => {
  const item = sections["PLACEHOLDER CONTENT"].find((i) => i.text.startsWith(`${key}: `));
  if (!item) throw new Error(`Missing placeholder: ${key}`);
  return item.text.slice(key.length + 2);
};

const firmNumber = placeholder("Firm license").match(/#\S+/)![0];
const classDate = placeholder("Next LCAM class").split(" · ")[0].replace(/^Starts /, "");

const brackets: Record<string, string> = {
  "[XX]": placeholder("[XX] communities managed"),
  "[X,XXX]": placeholder("[X,XXX] homes and units"),
  "[#]": firmNumber,
  "[Firm license]": firmNumber,
  "[date]": classDate,
  "[Condo compliance]": placeholder("Condo compliance"),
  "[Handover timeline]": placeholder("Handover timeline"),
  "[Portal features]": placeholder("Portal features"),
  "[After-hours line]": placeholder("After-hours line"),
  "[Office hours]": placeholder("Office hours"),
  "[Next LCAM class]": placeholder("Next LCAM class"),
};

const fill = (text: string) =>
  Object.entries(brackets)
    .reduce((t, [k, v]) => t.split(k).join(v), text)
    .replace(/\.\./g, ".");

/** Value of a "Key: value" line in a section. */
export function field(section: string, key: string) {
  const item = sections[section]?.find((i) => i.text.startsWith(`${key}: `));
  if (!item) throw new Error(`Missing copy: ${section} / ${key}`);
  return fill(item.text.slice(key.length + 2));
}

/** Nested lines under a key, e.g. the frustration rows and form fields. */
export const children = (section: string, keyStart: string) =>
  (sections[section]?.find((i) => i.text.startsWith(keyStart))?.children ?? []).map(fill);

/** Every top-level line of a section, as written. */
export const lines = (section: string) => (sections[section] ?? []).map((i) => fill(i.text));

export const split = (value: string, by = " · ") => value.split(by).map((s) => s.trim());

/** "Body text. Link: Label" */
export function withLink(value: string) {
  const [body, link] = value.split(/\s*Link: /);
  return { body, link };
}

export const label = (key: string) => field("INTERFACE LABELS", key);

export type NavEntry = { label: string; items: string[] };

export const mainMenu: NavEntry[] = split(field("TOP BAR AND NAVIGATION", "Main menu")).map((entry) => {
  const m = entry.match(/^(.*?) \((.*)\)$/);
  return m ? { label: m[1], items: m[2].split(", ") } : { label: entry, items: [] };
});

export const announcement = () => {
  const key = lines("TOP BAR AND NAVIGATION").find((l) => l.startsWith("Announcement bar"))!;
  const text = key.slice(key.indexOf("): ") + 3);
  const cta = "Reserve a seat";
  return { text: text.replace(cta, "").trim(), cta };
};

export const cities = field("SERVICE AREA", "Body")
  .match(/communities in (.*?)\. Not/)![1]
  .split(/, | and /);

export const testimonials = [1, 2, 3].map((n) => {
  const m = placeholder(`Testimonial ${n}`).match(/^"(.*)" (.*?), (.*)$/)!;
  return { quote: m[1], name: m[2], detail: m[3] };
});

export const results = [1, 2, 3].map((n) => {
  const m = placeholder(`Result ${n}`).match(/^(.*?)(?:, (.*?))?: (.*)$/)!;
  const extra = split(field("RESULT CARDS", `Result ${n}`)).map((p) => p.split(": "));
  return {
    community: m[1],
    city: m[2],
    text: m[3],
    figure: extra[0][1],
    rowLabel: extra[1][0],
    rowValue: extra[1][1],
  };
});

export const team = split(placeholder("Team")).map((p) => {
  const i = p.indexOf(", ");
  return { name: p.slice(0, i), role: p.slice(i + 2) };
});

export type FormField = {
  name: string;
  label: string;
  type: string;
  options: string[];
  required: boolean;
};

export const formFields: FormField[] = children("FINAL CALL TO ACTION AND FORM", "Fields").map((line) => {
  const m = line.match(/^(.*?) \((.*)\)$/)!;
  const required = !/optional/.test(m[2]);
  const spec = m[2].replace(/[,;] optional$/, "");
  let type = spec;
  let options: string[] = [];
  if (spec.startsWith("dropdown of the eight")) {
    type = "dropdown";
    options = [...cities, "Other"];
  } else if (spec.startsWith("dropdown:")) {
    type = "dropdown";
    options = spec.slice(10).split(", ");
  }
  const name = m[1].toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");
  return { name, label: m[1], type, options, required };
});
