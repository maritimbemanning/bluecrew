import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

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
      // Phase out interest form - redirect to job listings
      { source: "/meld-interesse", destination: "/stillinger", permanent: false },
    ];
  },
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Suppress source map upload logs in CI
  silent: true,

  // Upload source maps for better error tracking
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Hide source maps from users in production
  hideSourceMaps: true,

  // Tunnel Sentry events through your domain to avoid ad blockers
  // tunnelRoute: "/monitoring",

  // Disable Sentry during builds if no auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default async function loadConfig(): Promise<NextConfig> {
  try {
    const { createVanillaExtractPlugin } = await import("@vanilla-extract/next-plugin");
    const withVanillaExtract = createVanillaExtractPlugin();
    const configWithVanilla = withVanillaExtract(baseConfig);

    // Wrap with Sentry
    return withSentryConfig(configWithVanilla, sentryWebpackPluginOptions);
  } catch {
    console.warn("@vanilla-extract/next-plugin not found — running without vanilla-extract integration.");

    // Wrap base config with Sentry
    return withSentryConfig(baseConfig, sentryWebpackPluginOptions);
  }
}
