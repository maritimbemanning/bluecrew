import Link from "next/link";
import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section className="section section--alt">
        <div className="container container--narrow">
          <h1 className="heading-xl">Jobb til sjøs med Bluecrew</h1>
          <p className="text-lead text-lead--sm">
            Vi tilbyr oppdrag for sjøfolk som ønsker forutsigbarhet, ordnede forhold og utvikling. Som en del av Bluecrew får du
            tett dialog med ledere som selv har stått i skiftet og vet hvordan hverdagen om bord er.
          </p>
          <div className="content-stack mt-section">
            <div className="content-card">
              <h2 className="heading-lg">Dette kan du forvente</h2>
              <ul className="content-list">
                <li>Lønn over tariff der innsats og ansvar belønnes.</li>
                <li>Oppdrag innen havbruk, fiskeri, service-, logistikk- og spesialfartøy.</li>
                <li>Oppfølging før, under og etter oppdrag fra bemanningsledere med sjøerfaring.</li>
              </ul>
            </div>
            <div className="content-card content-card--dark">
              <h3 className="heading-lg">Sertifikater og kompetanse</h3>
              <p className="text-lead text-lead--sm">
                Vi hjelper deg med å holde orden på STCW, helseattest og andre kurskrav. Fortell oss hvor du står i dag, så finner
                vi oppdrag og utviklingsmuligheter som matcher nivået ditt.
              </p>
            </div>
          </div>
          <div className="cluster-wrap mt-section">
            <Link href="/jobbsoker/registrer" className="cta-button cta-button--primary">
              Registrer deg
            </Link>
            <Link href="/jobbsoker/oppdrag" className="cta-button cta-button--secondary">
              Se hvilke oppdrag vi tilbyr
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
