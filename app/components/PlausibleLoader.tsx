"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent, CONSENT_COOKIE } from "../lib/consent";

export default function PlausibleLoader() {
  const [enabled, setEnabled] = useState(false);
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    const c = getConsent();
    setEnabled(!!c?.analytics);

    const onChange = () => {
      const cc = getConsent();
      setEnabled(!!cc?.analytics);
    };
    window.addEventListener("bc:consent", onChange);
    return () => window.removeEventListener("bc:consent", onChange);
  }, []);

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
