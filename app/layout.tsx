import type { Metadata } from "next";
import "./globals.css";
import "../styles/global.css";
import CookieBanner from "./components/CookieBanner";
import PlausibleLoader from "./components/PlausibleLoader";
import Script from "next/script";

const title = "Bluecrew AS – Maritim bemanning i Nord-Norge";
const description =
  "Profesjonell maritim bemanningsløsning. Erfarne STCW-sertifiserte mannskaper til havbruk, servicefartøy og offshore. Base i Nord-Norge med nasjonal dekning.";

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
    "maritime stillinger Nord-Norge",
    "bemanning Troms",
    "bemanning Finnmark",
    "dekksoffiser",
    "maskinoffiser",
    "maritime vikarer",
    "fartøy bemanning Norge",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no"),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icons/icononly_transparent_nobuffer.png", type: "image/png", sizes: "any" },
    ],
    apple: "/icons/icononly_transparent_nobuffer.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://bluecrew.no",
    siteName: "Bluecrew AS",
    title,
    description,
    images: [
      {
        url: "/hero/kaptein_skipper_lonn_bluecrew.jpg",
        width: 1200,
        height: 630,
        alt: "Bluecrew AS - Profesjonell maritim bemanning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero/kaptein_skipper_lonn_bluecrew.jpg"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bluecrew AS",
    alternateName: "Bluecrew",
    url: "https://bluecrew.no",
    logo: "https://bluecrew.no/logo.png",
    description: "Maritim bemanningsleverandør med base i Nord-Norge. Leverer kvalifisert mannskap til havbruk, servicefartøy og offshore.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Østenbekkveien 43",
      addressLocality: "Harstad",
      postalCode: "9403",
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
    image: "https://bluecrew.no/logo.png",
    telephone: "+47-923-28-850",
    email: "post@bluecrew.no",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Østenbekkveien 43",
      addressLocality: "Harstad",
      postalCode: "9403",
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

  return (
    <html lang="no">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <PlausibleLoader />
      </body>
    </html>
  );
}
