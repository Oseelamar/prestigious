import sizes from "./image-sizes.json";
import { BASE } from "./base-path";

type Entry = { width: number; height: number; w1: number };

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const name = src.match(/images\/(.+)@2x\.webp$/)?.[1];
  const entry = name ? (sizes as Record<string, Entry>)[name] : undefined;
  if (!entry) return `${BASE}${src}?w=${width}`;
  // A little under 2x density is fine on phones, and saves most of the bytes.
  const useSmall = width <= entry.w1 * 1.3;
  // One URL per file, so a photo used at two sizes is only downloaded once.
  return useSmall ? `${BASE}${src.replace("@2x", "@1x")}?w=${entry.w1}` : `${BASE}${src}?w=${entry.width}`;
}
