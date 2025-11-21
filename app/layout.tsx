import type { Metadata } from "next";
import "./globals.css";
import "../styles/global.css";
import CookieBanner from "./components/CookieBanner";
import PlausibleLoader from "./components/PlausibleLoader";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import BreadcrumbsSchema from "./components/BreadcrumbsSchema";

const title = "Bluecrew AS – Maritim bemanning i Norge";
const description =
  "Bemanning av kvalifisert maritimt mannskap. STCW‑sertifiserte kapteiner, styrmenn, matroser og maskinoffiserer til havbruk, servicefartøy og offshore.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";
const logoPath = "/logo.png"; // exists in /public
const logoUrl = `${siteUrl}${logoPath}`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Bluecrew AS",
  },
  description,
  keywords: [
    "maritim bemanning",
    "servicefartøy bemanning",
    "havbruk bemanning",
    "brønnbåt mannskap",
    "offshore bemanning",
    "STCW sertifisert",
    "maritime stillinger Norge",
    "bemanning Norge",
    "dekksoffiser",
    "maskinoffiser",
    "maritime vikarer",
    "fartøy bemanning Norge",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no"
  ),
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://bluecrew.no",
    siteName: "Bluecrew AS",
    title,
    description,
    images: [
      {
        url: "/hero/maritime-hero.jpeg",
        width: 1920,
        height: 1080,
        alt: "Bluecrew AS - Profesjonell maritim bemanning i Norge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero/maritime-hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bluecrew AS",
    alternateName: "Bluecrew",
    url: siteUrl,
    logo: logoUrl,
    description:
      "Maritim bemanningsleverandør i Norge. Leverer kvalifisert mannskap til havbruk, servicefartøy og offshore over hele landet.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ervikveien 110",
      addressLocality: "Harstad",
      postalCode: "9402",
      addressRegion: "Troms",
      addressCountry: "NO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+47-923-28-850",
      contactType: "customer service",
      areaServed: "NO",
      availableLanguage: ["Norwegian", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/bluecrewas",
      "https://www.facebook.com/profile.php?id=61582845493676",
      "https://www.instagram.com/bluecrew.no/",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bluecrew.no/#organization",
    name: "Bluecrew AS",
    image: logoUrl,
    telephone: "+47-923-28-850",
    email: "post@bluecrew.no",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ervikveien 110",
      addressLocality: "Harstad",
      postalCode: "9402",
      addressRegion: "Troms",
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "68.7985",
      longitude: "16.5415",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "Bluecrew AS",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="no">
      <head>
        {/* Fallback title for static scanners (Next.js will override when metadata is applied) */}
        <title>Bluecrew AS – Maritim bemanning i Norge</title>
        {/* Explicit favicon links to help Google pick up site icon in SERP */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        {/* Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17731534362"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17731534362');
            `,
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <BreadcrumbsSchema />
      </head>
      <body>
        {children}
        <CookieBanner />
        <PlausibleLoader />
        <SpeedInsights />
      </body>
    </html>
  );
}
