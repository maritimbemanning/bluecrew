import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

const DELIVERY_POINTS = [
  {
    title: "Heldekkende bemanningspartner",
    text: "Vi tar ansvar for planlegging, kontrakter, oppfølging og avløsere slik at du kan holde fokus på operasjonen.",
  },
  {
    title: "Tilpasset alle fartøystyper",
    text: "Fra oppdrett og servicefartøy til logistikk, beredskap og offshore: vi matcher riktig kompetanse og sertifikater.",
  },
  {
    title: "Rask mobilisering",
    text: "Vårt nettverk av erfarne sjøfolk gjør det mulig å bemanne på kort varsel når driften krever det.",
  },
];

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Bemanning til sjøs – levert av folk som kjenner skiftet</h1>
          <p style={sx.leadSmall}>
            Vi bemanner hele den maritime sektoren med operativt erfarent personell. Oppdragene spenner fra enkeltstående vakter
            til komplette team som følger fartøyet gjennom sesongen.
          </p>
          <div style={sx.featureGrid}>
            {DELIVERY_POINTS.map((point) => (
              <article key={point.title} style={sx.featureCard}>
                <h2 style={{ ...sx.featureTitle, fontSize: 20 }}>{point.title}</h2>
                <p style={sx.featureText}>{point.text}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/kunde" style={sx.btnMain}>
              Meld inn bemanningsbehov
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
