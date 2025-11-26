import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ledige stillinger – Maritime jobber i Norge",
  description:
    "Se ledige stillinger innen maritim sektor. Jobber for kapteiner, styrmenn, maskinister, matroser og annet maritimt personell. Søk direkte hos Bluecrew.",
  keywords: [
    "ledige stillinger",
    "maritime jobber",
    "sjøfart karriere",
    "kaptein jobb",
    "matros stilling",
    "maskinoffiser ledig",
    "maritim rekruttering Norge",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/stillinger",
  },
  openGraph: {
    title: "Ledige stillinger – Maritime jobber | Bluecrew",
    description:
      "Utforsk ledige maritime stillinger i Norge. Bluecrew formidler kvalifisert mannskap til havbruk, servicefartøy og offshore.",
    type: "website",
  },
};

export default function StillingerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
