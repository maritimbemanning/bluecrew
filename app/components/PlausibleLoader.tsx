"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent } from "../lib/consent";

export default function PlausibleLoader() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const [enabled, setEnabled] = useState(false);

  // Only load Plausible when user has given analytics consent
  useEffect(() => {
    if (!domain) return;
    const c = getConsent();
    setEnabled(Boolean(c?.analytics));

    const onConsent = () => {
      const next = getConsent();
      setEnabled(Boolean(next?.analytics));
    };
    window.addEventListener("bc:consent", onConsent);
    return () => window.removeEventListener("bc:consent", onConsent);
  }, [domain]);

  if (!domain || !enabled) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

