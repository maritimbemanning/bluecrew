"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function BreadcrumbsSchema() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);
  const items = parts.map((seg, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: segmentToTitle(seg),
    item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no"}/${parts.slice(0, i + 1).join("/")}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  } as const;

  return (
    <Script id="breadcrumbs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

function segmentToTitle(seg: string) {
  const map: Record<string, string> = {
    jobbsoker: "Jobbsøker",
    kunde: "Kunde",
    bemanning: "Bemanning",
    rekruttering: "Rekruttering",
    kontakt: "Kontakt",
    "om-oss": "Om oss",
    personvern: "Personvern",
    vilkar: "Vilkår",
    registrer: "Registrer",
    "registrer-behov": "Registrer behov",
    guides: "Guider",
  };
  return map[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

