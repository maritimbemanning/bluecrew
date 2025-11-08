import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrer deg som jobbsøker - Bluecrew AS",
  description:
    "Registrer deg som jobbsøker og få tilgang til ledige maritime oppdrag. Verifiser med Vipps og fyll ut profilen din.",
  keywords: [
    "registrer jobbsøker",
    "maritim jobb søknad",
    "STCW jobb",
    "offshore jobb",
    "havbruk jobb",
    "registrering kandidat",
    "vipps verifisering",
  ],
  openGraph: {
    title: "Registrer deg som jobbsøker | Bluecrew AS",
    description: "Registrer deg og få tilgang til maritime oppdrag. Verifiser med Vipps.",
    type: "website",
  },
  alternates: {
    canonical: "/jobbsoker/registrer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
