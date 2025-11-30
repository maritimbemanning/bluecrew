import { Metadata } from "next";
import Script from "next/script";
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
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17731534362"
        strategy="afterInteractive"
      />
      <Script id="gads-init-home" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17731534362');
          gtag('config', 'G-T4LZ5PSGP9');
        `}
      </Script>
      <Script id="gads-conversion-home" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17731534362/WdQxCN7Fu8QbEJr8hodC',
            'value': 1.0,
            'currency': 'NOK'
          });
        `}
      </Script>
      <SiteLayout active="home">
      <Hero />
      <AktueltSection />
      <TrustSection />
      <ServiceCards />
      <JobsHighlight />
      <InterestSection />
      <ContactSection />
    </SiteLayout>
    </>
  );
}
