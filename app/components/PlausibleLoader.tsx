"use client";

import Script from "next/script";

export default function PlausibleLoader() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  // Plausible is privacy-friendly and doesn't require consent in EU
  // It doesn't use cookies or track personal data
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
