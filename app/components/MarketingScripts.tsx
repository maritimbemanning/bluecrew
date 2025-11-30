"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent } from "../lib/consent";

/**
 * Loads Google Ads (gtag.js) and Meta Pixel only when user has given marketing consent.
 * GDPR-compliant: no tracking without explicit opt-in.
 *
 * Google Ads ID: AW-17731534362
 * Meta Pixel ID: 1367183524887510
 */
export default function MarketingScripts() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = getConsent();
      setHasConsent(consent?.marketing === true);
    };

    checkConsent();

    // Listen for consent changes
    window.addEventListener("bc:consent", checkConsent);
    return () => window.removeEventListener("bc:consent", checkConsent);
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      {/* Google Ads (gtag.js) - only with marketing consent */}
      <Script
        id="gtag-js"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=AW-17731534362"
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17731534362');
          `,
        }}
      />

      {/* Meta Pixel - only with marketing consent */}
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1367183524887510');
            fbq('track', 'PageView');
          `,
        }}
      />

    </>
  );
}
