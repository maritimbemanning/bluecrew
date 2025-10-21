import SiteLayout from "../components/SiteLayout";

const ui = {
  hero: {
    position: "relative" as const,
    padding: "64px 0 32px",
    background: "linear-gradient(180deg, rgba(2,6,23,0.02), rgba(2,6,23,0))",
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
  section: { padding: "16px 0 64px" },
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
  p: {
    margin: "8px 0 0 0",
    color: "#334155",
    fontSize: 15.5,
    lineHeight: 1.8,
  },
  ul: {
    margin: "10px 0 0 0",
    paddingLeft: 20,
    lineHeight: 1.8,
    color: "#334155",
    fontSize: 15.5,
  },
  a: {
    color: "#0ea5e9",
    textDecoration: "none",
    borderBottom: "1px dashed rgba(14,165,233,0.35)",
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
  footer: { marginTop: 22, fontSize: 13, color: "#64748b" },
  "@media(min-width: 960px)": { grid: { gridTemplateColumns: "1fr 1fr" } },
};

export default function TermsPage() {
  return (
    <SiteLayout active="personvern">
      <header style={ui.hero}>
        <div style={ui.wrap}>
          <h1 style={ui.h1}>Brukervilkår</h1>
          <p style={ui.lead}>
            Disse vilkårene regulerer din bruk av bluecrew.no. Ved å bruke nettstedet aksepterer du vilkårene.
          </p>
          <div style={ui.badgeRow}>
            <span style={ui.badge}>Oppdatert: {new Date().toLocaleDateString("no-NO")}</span>
            <span style={ui.badge}>Bluecrew AS · Org.nr: 936 321 194</span>
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
              <h2 style={ui.h2}>Innhold og tilgjengelighet</h2>
              <p style={ui.p}>
                Vi tilstreber korrekt informasjon og høy oppetid, men kan ikke garantere fullstendighet, feilfrihet eller
                kontinuerlig tilgjengelighet. Innhold kan oppdateres uten varsel.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Ansvarsbegrensning</h2>
              <p style={ui.p}>
                Bluecrew er ikke ansvarlig for indirekte tap, følgeskader eller tapt fortjeneste som følge av bruk eller
                manglende tilgang til nettstedet. Dette påvirker ikke ansvar som ikke kan begrenses etter gjeldende lov.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Immaterielle rettigheter</h2>
              <p style={ui.p}>
                Alt innhold på nettstedet, inkludert tekst, grafikk og logoer, tilhører Bluecrew eller lisensgivere og
                er beskyttet av opphavsrett. Innhold kan ikke kopieres, endres eller distribueres uten skriftlig samtykke.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Lenker til tredjepart</h2>
              <p style={ui.p}>
                Nettstedet kan inneholde lenker til eksterne sider. Vi er ikke ansvarlige for innholdet eller praksisen
                til tredjeparts nettsteder.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Personvern</h2>
              <p style={ui.p}>
                Behandling av personopplysninger er beskrevet i vår{" "}
                <a href="/personvern" style={ui.a}>personvernerklæring</a>. Du kan endre samtykkevalg på{" "}
                <a href="/cookies" style={ui.a}>cookies-siden</a>.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Endringer i vilkårene</h2>
              <p style={ui.p}>
                Vi kan oppdatere vilkårene ved behov. Dato for siste oppdatering fremgår øverst på siden. Vesentlige
                endringer kunngjøres på nettsiden.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Kontakt</h2>
              <p style={ui.p}>
                Spørsmål om vilkår? Kontakt oss på{" "}
                <a href="mailto:isak@bluecrew.no" style={ui.a}>isak@bluecrew.no</a>.
              </p>
            </section>
          </div>

          <div style={ui.footer}>© {new Date().getFullYear()} Bluecrew AS – Brukervilkår</div>
        </div>
      </main>
    </SiteLayout>
  );
}
