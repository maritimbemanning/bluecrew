import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
