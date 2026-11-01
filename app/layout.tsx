import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { field } from "@/lib/copy";
import { asset } from "@/lib/base-path";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

// Bundled rather than loaded from /public, so the URL carries the basePath and
// the preload tag is emitted for us.
const kalice = localFont({
  src: [
    { path: "../public/fonts/Kalice-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Kalice-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-kalice",
  display: "swap",
});

const title = field("SEO", "Page title");
const description = field("SEO", "Meta description");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: asset("/images/og-hero.jpg"), width: 1200, height: 630 }],
  },
};

const motionScript = `if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion");setTimeout(function(){if(!window.__siteMotion)document.documentElement.classList.remove("motion")},3000)}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable} ${kalice.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
