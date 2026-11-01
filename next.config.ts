import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>/, so the deploy workflow sets
// this and every absolute asset path is written through lib/base-path.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  devIndicators: false,
  images: {
    // Serves the graded 1x and 2x WebP files from public/images as they are.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 160, 240, 320, 400],
    qualities: [75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
