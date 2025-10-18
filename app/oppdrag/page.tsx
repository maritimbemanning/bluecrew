import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { STCW_MODULES } from "../lib/constants";
import { sx } from "../lib/styles";

const ASSIGNMENT_GROUPS = [
  {
    title: "Havbruk og service",
    description:
      "Oppdrag på lokaliteter, brønnbåter og arbeidsfartøy hvor fleksibilitet og tett samarbeid med drift står sentralt.",
    points: ["Drift av merder og fôringssystemer", "Dekksoperasjoner, ROV og fortøyning", "Turnuser fra enkeltskift til faste lag"],
  },
  {
    title: "Fiskeri og logistikk",
    description:
      "Sesongtopper og faste ruter krever mannskap som er klare når fangsten eller lasten skal inn. Vi følger opp hele reisen.",
    points: ["Skippere, styrmenn og fabrikkpersonell", "Kombinasjon av kyst- og havgående fartøy", "Planlagte rotasjoner og forlengelser"],
  },
  {
    title: "Offshore støtte og beredskap",
    description:
      "Til oppdrag hvor sikkerhet og dokumentasjon er avgjørende stiller vi med personell som kjenner kravene.",
    points: ["Slepe-, beredskaps- og inspeksjonsfartøy", "Tekniske spesialister og HSE-ressurser", "Mobilisering på kort varsel"],
  },
];

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Oppdrag med lønn over tariff og tydelige rammer</h1>
          <p style={sx.leadSmall}>
            Bluecrew kobler deg med oppdrag der innsats og resultat belønnes. Vi jobber med seriøse arbeidsgivere som tilbyr
            lønn over tariff, gode forhold om bord og rom for videre utvikling.
          </p>
          <div style={{ marginTop: 32, display: "grid", gap: 24 }}>
            {ASSIGNMENT_GROUPS.map((group) => (
              <article key={group.title} style={sx.featureCard}>
                <h2 style={{ ...sx.featureTitle, fontSize: 22 }}>{group.title}</h2>
                <p style={sx.featureText}>{group.description}</p>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, color: "#334155", lineHeight: 1.6 }}>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div style={sx.privacyBox}>
            <strong>Dokumentasjon vi hjelper deg med:</strong>
            <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
              {STCW_MODULES.map((module) => (
                <li key={module}>{module}</li>
              ))}
              <li>Gyldig helseattest, sikkerhetskort og relevante spesialsertifikater</li>
            </ul>
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/register-candidate" style={sx.btnMain}>
              Registrer deg nå
            </Link>
            <Link href="/faq" style={sx.btnGhost}>
              Vanlige spørsmål
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
