import { Metadata } from "next";
import SiteLayout from "./components/SiteLayout";
import { Hero } from "./components/home/Hero";
import { TrustSection } from "./components/home/TrustSection";
import { ServiceCards } from "./components/home/ServiceCards";
import { JobsHighlight } from "./components/home/JobsHighlight";
import { ContactSection } from "./components/home/ContactSection";

export const metadata: Metadata = {
  title: "Maritim bemanning til havbruk, servicefartøy og offshore",
  description:
    "Erfarne mannskaper til havbruk, servicefartøy og offshore. Base i Nord-Norge med nasjonal dekning. STCW-sertifisert, rask oppstart, personlig oppfølging.",
  keywords: [
    "maritim bemanning",
    "servicefartøy bemanning",
    "havbruk bemanning",
    "brønnbåt mannskap",
    "offshore bemanning Nord-Norge",
    "STCW mannskap",
    "dekksoffiser",
    "maskinoffiser",
    "maritime stillinger Troms",
    "fartøy bemanning Harstad",
    "aquaculture crew",
    "service vessel manning",
  ],
  openGraph: {
    title: "Bluecrew AS - Maritim bemanning i Nord-Norge",
    description: "Erfarne mannskaper til havbruk, servicefartøy og offshore. STCW-sertifisert med rask oppstart.",
    type: "website",
    url: "https://bluecrew.no",
  },
};

export default function Page() {
  return (
    <SiteLayout active="home">
      <Hero />
      <TrustSection />
      <ServiceCards />
      <JobsHighlight />
      <ContactSection />
    </SiteLayout>
  );
}
