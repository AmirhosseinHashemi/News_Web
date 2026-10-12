import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      // فقط برای دموی صفحه دیزاین سیستم
      { protocol: "https", hostname: "picsum.photos" },
      // وقتی دامنه فضای ذخیره‌سازی مشخص شد:
      // { protocol: "https", hostname: "files.rahgh.ir" },
    ],
  },
};

export default nextConfig;
