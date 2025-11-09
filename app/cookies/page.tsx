"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { clearConsent, getConsent, setConsent, type ConsentPrefs } from "../lib/consent";

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
  tableWrap: { overflowX: "auto" as const, marginTop: 10 },
  table: {
    width: "100%",
    borderCollapse: "separate" as const,
    borderSpacing: 0,
    fontSize: 14.5,
  },
  th: {
    textAlign: "left" as const,
    padding: "10px 12px",
    color: "#0f172a",
    borderBottom: "1px solid rgba(2,6,23,0.08)",
    background: "rgba(2,6,23,0.03)",
  },
  td: {
    padding: "10px 12px",
    color: "#334155",
    borderBottom: "1px solid rgba(2,6,23,0.06)",
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
  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
    marginTop: 12,
  },
  btnPrimary: {
    appearance: "none" as const,
    border: 0,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
    boxShadow: "0 6px 16px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
    cursor: "pointer",
  },
  btnGhost: {
    appearance: "none" as const,
    border: "1px solid rgba(2,6,23,0.12)",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    background: "white",
    color: "#0f172a",
    cursor: "pointer",
  },
  a: {
    color: "#007eb6",
    textDecoration: "none",
    borderBottom: "1px dashed rgba(14,165,233,0.35)",
  },
  footer: { marginTop: 22, fontSize: 13, color: "#475569" },
  "@media(min-width: 960px)": { grid: { gridTemplateColumns: "1fr 1fr" } },
};

export default function CookiesPage() {
  const [current, setCurrent] = useState<ConsentPrefs | null>(null);

  useEffect(() => {
    setCurrent(getConsent());
  }, []);

  function applyPrefs(p: ConsentPrefs) {
    setConsent(p);
    setCurrent(p);
    // Informer eventuelle lyttere (PlausibleLoader/CookieBanner)
    window.dispatchEvent(new Event("bc:consent"));
  }

  function resetConsent() {
    // Slett cookie og reload for å trigge banner på nytt
    clearConsent();
    window.location.reload();
  }

  return (
    <SiteLayout active="personvern">
      <header style={ui.hero}>
        <div style={ui.wrap}>
          <h1 style={ui.h1}>Informasjonskapsler (cookies)</h1>
          <p style={ui.lead}>
            Her finner du hvilke informasjonskapsler vi bruker, hva de gjør og hvordan du kan endre samtykket ditt.
          </p>
          <div style={ui.badgeRow}>
            <span style={ui.badge}>Oppdatert: {new Date().toLocaleDateString("no-NO")}</span>
            <span style={ui.badge}>Samtykke: {current ? (current.analytics ? "Statistikk PÅ" : "Kun nødvendige") : "Ikke valgt"}</span>
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
              <h2 style={ui.h2}>Kategorier</h2>
              <ul style={ui.ul}>
                <li>
                  <strong>Nødvendige</strong>: kreves for at nettstedet skal fungere (f.eks. samtykkevalg). Disse kan
                  ikke skrus av.
                </li>
                <li>
                  <strong>Statistikk</strong>: hjelper oss å forstå bruken av nettsiden (Plausible). Kun med samtykke.
                </li>
              </ul>

              <div style={ui.actions}>
                <button
                  type="button"
                  style={ui.btnPrimary}
                  onClick={() =>
                    applyPrefs({ necessary: true, analytics: true, marketing: false })
                  }
                >
                  Godta statistikk
                </button>
                <button
                  type="button"
                  style={ui.btnGhost}
                  onClick={() =>
                    applyPrefs({ necessary: true, analytics: false, marketing: false })
                  }
                >
                  Kun nødvendige
                </button>
                <button type="button" style={ui.btnGhost} onClick={resetConsent}>
                  Tilbakestill og vis banner
                </button>
              </div>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Kapsler vi setter</h2>
              <div style={ui.tableWrap}>
                <table style={ui.table} aria-label="Oversikt over cookies">
                  <thead>
                    <tr>
                      <th style={ui.th}>Navn</th>
                      <th style={ui.th}>Leverandør</th>
                      <th style={ui.th}>Formål</th>
                      <th style={ui.th}>Varighet</th>
                      <th style={ui.th}>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={ui.td}>bc_cookie_consent</td>
                      <td style={ui.td}>Bluecrew</td>
                      <td style={ui.td}>Lagrer dine samtykkevalg</td>
                      <td style={ui.td}>Inntil 6 måneder</td>
                      <td style={ui.td}>Nødvendig</td>
                    </tr>
                    <tr>
                      <td style={ui.td}>plausible_* (kun ved samtykke)</td>
                      <td style={ui.td}>Plausible</td>
                      <td style={ui.td}>
                        Statistikk (aggregert trafikkmåling). Se{" "}
                        <Link href="https://plausible.io/data-policy" style={ui.a} target="_blank">
                          data policy
                        </Link>.
                      </td>
                      <td style={ui.td}>Se leverandør</td>
                      <td style={ui.td}>Statistikk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={ui.p}>
                For øvrig informasjon om behandling av personopplysninger, se{" "}
                <Link href="/personvern" style={ui.a}>personvernerklæringen</Link>.
              </p>
            </section>
          </div>

          <div style={ui.footer}>
            © {new Date().getFullYear()} Bluecrew AS – Cookies
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}

