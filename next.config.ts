import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → deployable on GitHub Pages (or any static host)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
