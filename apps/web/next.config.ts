import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pin the workspace root: a stray lockfile higher up (e.g. in $HOME) otherwise
  // makes Turbopack watch that whole tree and exhaust process limits.
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
