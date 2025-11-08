import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrer bemanningsbehov - Bluecrew AS",
  description:
    "Registrer ditt bemanningsbehov til havbruk, servicefartøy eller offshore. Vi svarer innen 24 timer med forslag til kvalifiserte kandidater.",
  keywords: [
    "registrer bemanningsbehov",
    "bestill bemanning",
    "maritime stillinger",
    "bemanning forespørsel",
    "mannskap bestilling",
    "maritim rekruttering",
  ],
  openGraph: {
    title: "Registrer bemanningsbehov | Bluecrew AS",
    description: "Registrer ditt bemanningsbehov - vi svarer raskt med kvalifiserte kandidater.",
    type: "website",
  },
  alternates: {
    canonical: "/kunde/registrer-behov",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
