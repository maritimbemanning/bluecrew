import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informasjonskapsler (cookies) - Bluecrew AS",
  description:
    "Informasjon om hvordan Bluecrew bruker informasjonskapsler (cookies). Administrer dine samtykkevalg og personverninnstillinger.",
  keywords: [
    "cookies",
    "informasjonskapsler",
    "samtykke",
    "personvern",
    "GDPR",
    "cookie policy",
    "tracking",
  ],
  openGraph: {
    title: "Informasjonskapsler | Bluecrew AS",
    description: "Slik bruker vi cookies og hvordan du administrerer samtykke.",
    type: "website",
  },
  alternates: {
    canonical: "/cookies",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

