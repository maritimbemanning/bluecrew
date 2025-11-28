import { Metadata } from "next";
import SiteLayout from "./components/SiteLayout";
import { Hero } from "./components/home/Hero";
import { TrustSection } from "./components/home/TrustSection";
import { ServiceCards } from "./components/home/ServiceCards";
import { JobsHighlight } from "./components/home/JobsHighlight";
import { AktueltSection } from "./components/home/AktueltSection";
import { ContactSection } from "./components/home/ContactSection";
import { InterestSection } from "./components/home/InterestSection";

export const metadata: Metadata = {
  title: "Maritim bemanning til havbruk, fiskeri og offshore",
  description:
    "Trenger du maritimt mannskap? Bluecrew leverer STCW-sertifiserte kapteiner, styrmenn og matroser til havbruk, fiskeri og offshore. Kontakt oss i dag!",
  keywords: [
    "maritim bemanning",
    "havbruk bemanning",
    "fiskeri bemanning",
    "brønnbåt mannskap",
    "offshore bemanning Norge",
    "STCW mannskap",
    "dekksoffiser",
    "maskinoffiser",
    "maritime stillinger",
    "fartøy bemanning Norge",
    "servicefartøy bemanning",
    "service vessel manning",
  ],
  openGraph: {
    title: "Bluecrew AS - Maritim bemanning i Norge",
    description:
      "Trenger du maritimt mannskap? Bluecrew leverer STCW-sertifiserte kapteiner, styrmenn og matroser til havbruk, fiskeri og offshore.",
    type: "website",
    url: "https://bluecrew.no",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <SiteLayout active="home">
      <Hero />
      <TrustSection />
      <ServiceCards />
      <JobsHighlight />
      <AktueltSection />
      <InterestSection />
      <ContactSection />
    </SiteLayout>
  );
}
