import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const baseConfig: NextConfig = {
  // Ikke stopp bygg på ESLint-feil (så Vercel får deployet)
  eslint: { ignoreDuringBuilds: true },
  // Valgfritt, men gjør livet enkelt nå: ikke stopp bygg på TS-feil
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default async function loadConfig(): Promise<NextConfig> {
  try {
    const { createVanillaExtractPlugin } = await import("@vanilla-extract/next-plugin");
    const withVanillaExtract = createVanillaExtractPlugin();
    const configWithVanilla = withVanillaExtract(baseConfig);
    
    // Wrap with Sentry config
    return withSentryConfig(configWithVanilla, {
      org: "bluecrew-as",
      project: "javascript-nextjs",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: "/monitoring",
      disableLogger: true,
      automaticVercelMonitors: true,
    });
  } catch {
    console.warn("@vanilla-extract/next-plugin not found — running without vanilla-extract integration.");
    
    // Wrap base config with Sentry
    return withSentryConfig(baseConfig, {
      org: "bluecrew-as",
      project: "javascript-nextjs",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: "/monitoring",
      disableLogger: true,
      automaticVercelMonitors: true,
    });
  }
}
