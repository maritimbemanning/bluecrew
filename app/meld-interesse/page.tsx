import type { Metadata } from "next";
import InterestSection from "@/app/components/home/InterestSection";
import ShareRow from "@/app/components/ShareRow";
import SiteLayout from "@/app/components/SiteLayout";

export const metadata: Metadata = {
  title: "Meld interesse – Bluecrew",
  description:
    "Er du sjømann, matros, maskinist eller skipper? Meld interesse uforpliktende, så kontakter vi deg når vi har oppdrag som passer.",
  alternates: {
    canonical: "/meld-interesse",
  },
  openGraph: {
    title: "Meld interesse – Bluecrew",
    description:
      "Bygd av sjøfolk – for sjøfolk. Meld interesse uforpliktende så tar vi kontakt når et oppdrag passer din erfaring.",
    url: "https://bluecrew.no/meld-interesse",
    type: "website",
  },
};

export default function MeldInteressePage() {
  // Bevisst minimalistisk landingsside som gjenbruker InterestSection (samme skjema som på forsiden)
  return (
    <SiteLayout>
      <InterestSection />
      <ShareRow />
    </SiteLayout>
  );
}
