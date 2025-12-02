import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      // Ensure /favicon.ico always resolves (some crawlers expect this exact path)
      { source: "/favicon.ico", destination: "/icon.png" },
    ];
  },
  async redirects() {
    return [
      { source: "/sentry-example-page", destination: "/", permanent: true },
      { source: "/api/sentry-example-api", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
