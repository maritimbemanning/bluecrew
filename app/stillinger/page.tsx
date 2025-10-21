import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

const openings = [
  {
    title: "Skipper (D5) – Havbruk",
    location: "Nordland & Troms",
    type: "Innleie 4/2-turnus",
    description:
      "Søkere bør ha gyldig D5, sikkerhetskurs og erfaring fra serviceflåten. Oppdraget inkluderer koordinering av daglige operasjoner og støtte til mannskap.",
  },
  {
    title: "Matros – Servicefartøy",
    location: "Vestland",
    type: "Fast ansettelse",
    description:
      "Vi ser etter matroser med erfaring fra oppdrettsnæring eller logistikk. Arbeidet består av fortøyning, ankerhåndtering og støtte til teknisk team.",
  },
  {
    title: "Maskinist (M4) – Logistikk",
    location: "Trøndelag",
    type: "Innleie",
    description:
      "Drift av maskinrom på moderne logistikkfartøy. Stillingen krever oppdatert M4-sertifikat, helseattest og erfaring fra lignende fartøy.",
  },
];

export default function StillingerPage() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ display: "grid", gap: 24 }}>
            <div style={{ textAlign: "center" }}>
              <div style={sx.heroPill}>Ledige stillinger</div>
              <h1 style={sx.h1}>Finn ditt neste skift til sjøs</h1>
              <p style={sx.leadSmall}>
                Vi oppdaterer løpende med muligheter innen havbruk, fiskeri og spesialfartøy. Registrer deg, så matcher vi deg med oppdrag
                som passer din erfaring.
              </p>
            </div>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {openings.map((opening) => (
                <article key={opening.title} style={sx.cardService}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <h2 style={{ ...sx.cardTitle, margin: 0 }}>{opening.title}</h2>
                    <div style={{ fontSize: 14, color: "#475569", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>
                      {opening.location}
                    </div>
                    <div style={{ fontSize: 14, color: "#0ea5e9", fontWeight: 700 }}>{opening.type}</div>
                    <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>{opening.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Link href="/jobbsoker/registrer" style={sx.btnMain}>
                      Søknadsskjema
                    </Link>
                    <Link href="/kontakt" style={sx.btnGhost}>
                      Snakk med en rådgiver
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <p style={{ color: "#475569", fontSize: 15 }}>
                Fant du ikke et oppdrag som passer? Send oss en åpen søknad, så holder vi deg oppdatert på nye muligheter.
              </p>
              <Link href="/jobbsoker/registrer" style={sx.btnSecondary}>
                Registrer åpen søknad
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
