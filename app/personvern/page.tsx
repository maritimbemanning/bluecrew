import SiteLayout from "../components/SiteLayout";

/**
 * Ren, profesjonell personverns­side
 * - Stor hero med diskret gradient
 * - Innhold i "cards" for lesbarhet
 * - Tydelige overskrifter og spacing
 */

const ui = {
  hero: {
    position: "relative" as const,
    padding: "64px 0 32px",
    background:
      "linear-gradient(180deg, rgba(2,6,23,0.02), rgba(2,6,23,0))",
    overflow: "hidden" as const,
  },
  wrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    padding: "0 8px",
  },
  h1: {
    fontSize: 36,
    lineHeight: 1.2,
    letterSpacing: ".01em",
    fontWeight: 800,
    color: "#0f172a",
    margin: 0,
  },
  lead: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 1.7,
    color: "#334155",
    maxWidth: 820,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
    marginTop: 28,
  },
  card: {
    background: "white",
    borderRadius: 16,
    padding: 22,
    border: "1px solid rgba(2,6,23,0.06)",
    boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
  },
  h2: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: ".02em",
    color: "#0f172a",
    marginTop: 0,
    marginBottom: 8,
  },
  ul: {
    margin: "10px 0 0 0",
    paddingLeft: 20,
    lineHeight: 1.8,
    color: "#334155",
    fontSize: 15.5,
  },
  p: {
    margin: "8px 0 0 0",
    color: "#334155",
    fontSize: 15.5,
    lineHeight: 1.8,
  },
  a: {
    color: "#0ea5e9",
    textDecoration: "none",
    borderBottom: "1px dashed rgba(14,165,233,0.35)",
  },
  section: {
    padding: "16px 0 64px",
  },
  footer: {
    marginTop: 22,
    fontSize: 13,
    color: "#64748b",
  },
  badgeRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
    marginTop: 10,
  },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(2,6,23,0.05)",
    color: "#0f172a",
    border: "1px solid rgba(2,6,23,0.08)",
  },
  "@media(min-width: 960px)": {
    grid: { gridTemplateColumns: "1fr 1fr" },
  },
};

export default function PersonvernPage() {
  return (
    <SiteLayout active="personvern">
      <header style={ui.hero}>
        <div style={ui.wrap}>
          <h1 style={ui.h1}>Personvernerklæring</h1>
          <p style={ui.lead}>
            Slik behandler Bluecrew AS personopplysninger i forbindelse med kundehenvendelser, rekruttering og drift av
            nettstedet bluecrew.no.
          </p>
          <div style={ui.badgeRow}>
            <span style={ui.badge}>Oppdatert: {new Date().toLocaleDateString("no-NO")}</span>
            <span style={ui.badge}>Org.nr: 936 321 194</span>
            <span style={ui.badge}>Kontakt: isak@bluecrew.no</span>
          </div>
        </div>
      </header>

      <main style={ui.section}>
        <div
          style={{
            ...ui.wrap,
          }}
        >
          <div
            style={{
              ...ui.grid,
              ...(typeof window !== "undefined" && window.innerWidth >= 960
                ? ui["@media(min-width: 960px)"].grid
                : {}),
            }}
          >
            <section style={ui.card}>
              <h2 style={ui.h2}>Behandlingsansvarlig</h2>
              <p style={ui.p}>
                Bluecrew AS (Org.nr: 936 321 194), Østenbekkveien 43, 9403 Harstad. E-post:{" "}
                <a href="mailto:isak@bluecrew.no" style={ui.a}>isak@bluecrew.no</a>.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Formål og rettslig grunnlag</h2>
              <ul style={ui.ul}>
                <li>
                  <strong>Kundehenvendelser</strong>: besvare og følge opp behov for bemanning.
                  <em> Grunnlag:</em> berettiget interesse (GDPR art. 6(1)(f)).
                </li>
                <li>
                  <strong>Rekruttering/kandidater</strong>: vurdere kvalifikasjoner mot oppdrag og administrere
                  kandidatbase. <em>Grunnlag:</em> samtykke (art. 6(1)(a)) og/eller berettiget interesse (art. 6(1)(f)).
                </li>
                <li>
                  <strong>Nettstedsdrift og sikkerhet</strong>: feilsøking og misbruksforebygging. <em>Grunnlag:</em>{" "}
                  berettiget interesse (art. 6(1)(f)).
                </li>
                <li>
                  <strong>Statistikk</strong> (Plausible): anonym/aggregert trafikk. <em>Grunnlag:</em> samtykke via
                  banner (art. 6(1)(a)).
                </li>
              </ul>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Kategorier av opplysninger</h2>
              <ul style={ui.ul}>
                <li>Kunder: navn, e-post, telefon, virksomhet, lokasjon, beskrivelse av behov.</li>
                <li>
                  Kandidater: navn, kontaktinfo, bosted, kvalifikasjoner/sertifikater, CV (PDF) og eventuelle vedlegg.
                </li>
                <li>Tekniske data: IP, nettleser/klient, grunnleggende logger for feilsøking/sikkerhet.</li>
              </ul>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Lagringstider</h2>
              <ul style={ui.ul}>
                <li>Kundehenvendelser: normalt <strong>6–12 måneder</strong>.</li>
                <li>
                  Kandidatdata (inkl. CV/vedlegg): <strong>12–24 måneder</strong> fra siste aktivitet/samtykke.
                  Samtykke kan fornyes. Du kan be om sletting når som helst.
                </li>
                <li>Tekniske logger/rate-limit-data: normalt <strong>inntil 90 dager</strong>.</li>
              </ul>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Databehandlere</h2>
              <ul style={ui.ul}>
                <li><strong>Supabase</strong> – database og Storage (skjema og opplastede filer).</li>
                <li><strong>Resend</strong> – e-postvarsling ved innsendinger.</li>
                <li><strong>Upstash</strong> – Redis og rate-limiting.</li>
                <li><strong>Plausible</strong> – webanalyse (kun ved samtykke).</li>
              </ul>
              <p style={ui.p}>
                Vi har databehandleravtaler (DPA) og bruker lovlige overføringsgrunnlag ved eventuell behandling utenfor
                EØS (f.eks. EU Standard Contractual Clauses).
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Dine rettigheter</h2>
              <p style={ui.p}>
                Du har rett til innsyn, retting, sletting, begrensning, dataportabilitet og å protestere.
                Der behandling bygger på samtykke, kan dette trekkes tilbake ved å kontakte oss eller via cookie-banneret
                (statistikk). Du kan klage til{" "}
                <a href="https://www.datatilsynet.no/" style={ui.a}>Datatilsynet</a>.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Sikkerhet</h2>
              <p style={ui.p}>
                Vi benytter tilgangsstyring, kryptert overføring, rate-limiting og sikkerhets-headere. Opplastede filer
                lagres i Supabase Storage med begrenset tilgang.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Kontakt</h2>
              <p style={ui.p}>
                Spørsmål om personvern? Skriv til{" "}
                <a href="mailto:isak@bluecrew.no" style={ui.a}>isak@bluecrew.no</a>.
              </p>
            </section>
          </div>

          <div style={ui.footer}>
            © {new Date().getFullYear()} Bluecrew AS – Personvernerklæring
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
