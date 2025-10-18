import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

const SEARCH_STEPS = [
  {
    title: "Analyse av behovet",
    text: "Vi kartlegger fartøy, drift og kultur før vi starter søket slik at kandidatene treffer på både kompetanse og personlighet.",
  },
  {
    title: "Målrettet headhunting",
    text: "Vi kontakter relevante kandidater fra vårt nettverk og markedet for øvrig, og kvalitetssikrer sertifikater og referanser.",
  },
  {
    title: "Oppfølging etter ansettelse",
    text: "Når kandidaten er om bord følger vi opp både deg og den nyansatte for å sikre at forventningene innfris.",
  },
];

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Rekruttering og headhunting av maritime nøkkelroller</h1>
          <p style={sx.leadSmall}>
            Når du trenger faste nøkkelpersoner, lederroller eller spesialkompetanse, gjennomfører vi hele prosessen – fra søk
            og seleksjon til signering og oppfølging.
          </p>
          <div style={sx.featureGrid}>
            {SEARCH_STEPS.map((step) => (
              <article key={step.title} style={sx.featureCard}>
                <h2 style={{ ...sx.featureTitle, fontSize: 20 }}>{step.title}</h2>
                <p style={sx.featureText}>{step.text}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/kontakt" style={sx.btnMain}>
              Book et rådgivermøte
            </Link>
            <Link href="/kunde" style={sx.btnGhost}>
              Registrer behov
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
