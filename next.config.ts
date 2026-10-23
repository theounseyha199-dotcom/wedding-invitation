import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Share crawlers must receive complete card metadata in the initial <head>.
  htmlLimitedBots: /.*/,
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
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
