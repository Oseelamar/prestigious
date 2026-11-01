// Empty in dev and on a root host; "/prestigious" for the GitHub Pages build.
// next/image with a custom loader and plain href strings are both left alone by
// basePath, so anything pointing at /public has to go through this.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;
