import type { NextConfig } from "next";

const baseConfig: NextConfig = {
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

export default async function loadConfig(): Promise<NextConfig> {
  try {
    const { createVanillaExtractPlugin } = await import("@vanilla-extract/next-plugin");
    const withVanillaExtract = createVanillaExtractPlugin();
    const configWithVanilla = withVanillaExtract(baseConfig);

    // Return config without Sentry wrapper
    return configWithVanilla;
  } catch {
    console.warn("@vanilla-extract/next-plugin not found — running without vanilla-extract integration.");

    // Return base config
    return baseConfig;
  }
}
