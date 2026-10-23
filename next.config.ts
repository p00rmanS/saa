import type { NextConfig } from "next";

// The site is deployed to GitHub Pages as a static export under /<repo>/.
// NEXT_PUBLIC_BASE_PATH is set only by the deploy workflow, so local dev and builds stay at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
