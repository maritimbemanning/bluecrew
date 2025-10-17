import React from "react";
import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export const dynamic = "force-dynamic";

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    text: "Erfarne skippere, styrmenn og matroser til service- og arbeidsbåter.",
  },
  {
    icon: "🐟",
    title: "Havbruk",
    text: "Operativt personell og akvateknikere med sertifiseringer til oppdrettsanlegg.",
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    text: "Bemanning til kyst- og havfiskefartøy, både faste og sesongbaserte oppdrag.",
  },
];

const BENEFITS = [
  {
    title: "Maritim spesialist",
    text: "Bluecrew AS er grunnlagt av sjøfolk. Vi vet hvilke sertifikater og hvilken erfaring som kreves om bord.",
  },
  {
    title: "Trygge leveranser",
    text: "Vi verifiserer kompetanse, referanser og tilgjengelighet før kandidatene presenteres.",
  },
  {
    title: "Rask respons",
    text: "Kort vei fra forespørsel til mobilisert mannskap – vi holder dialogen tett gjennom hele oppdraget.",
  },
];

const HIGHLIGHTS = [
  {
    heading: "Registrer deg som kandidat",
    body: "Fortell oss om erfaringen din og last opp CV. Du blir kontaktet når vi har et treff.",
    href: "/kandidat",
    label: "Gå til kandidatportalen",
  },
  {
    heading: "Bestill kvalifisert mannskap",
    body: "Beskriv behovet ditt – vi matcher sertifiserte sjøfolk til fartøyet eller anlegget ditt.",
    href: "/kunde",
    label: "Send forespørsel",
  },
  {
    heading: "Lær mer om oss",
    body: "Les mer om historien vår, hvordan vi jobber og hvordan vi ivaretar personvern.",
    href: "/om-oss",
    label: "Om Bluecrew AS",
  },
];

export default function Page() {
  return (
    <main style={styles.page}>
      <SiteHeader />

      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.heroPill}>Bemanning • Havbruk • Fiskeri • Servicefartøy</span>
          <h1 style={styles.heroTitle}>Mannskap til sjøs – levert av Bluecrew AS</h1>
          <p style={styles.heroLead}>
            Vi bemanner servicefartøy, oppdrettsanlegg og fiskeflåten med sertifiserte sjøfolk. Rett kompetanse, på rett sted,
            til rett tid.
          </p>
          <div style={styles.heroActions}>
            <Link href="/kandidat" style={styles.heroPrimary}>
              Registrer kandidatprofil
            </Link>
            <Link href="/kunde" style={styles.heroSecondary}>
              Meld inn bemanningsbehov
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.sectionLight}>
        <div style={styles.wrap}>
          <h2 style={styles.sectionTitle}>Våre hovedområder</h2>
          <div style={styles.cardGrid}>
            {SERVICES.map((service) => (
              <article key={service.title} style={styles.card}>
                <div style={styles.cardIcon}>{service.icon}</div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardText}>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.wrap}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={styles.sectionTitle}>Derfor velger man Bluecrew</h2>
            <p style={styles.sectionLead}>
              Vi kombinerer maritim erfaring med strukturert rekrutteringsarbeid. Resultatet er trygge leveranser for både mannskap
              og rederi.
            </p>
          </div>
          <div style={styles.benefitGrid}>
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} style={styles.benefitCard}>
                <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                <p style={styles.benefitText}>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sectionLight}>
        <div style={styles.wrap}>
          <h2 style={styles.sectionTitle}>Gå videre</h2>
          <div style={styles.highlightGrid}>
            {HIGHLIGHTS.map((item) => (
              <article key={item.heading} style={styles.highlightCard}>
                <h3 style={styles.highlightTitle}>{item.heading}</h3>
                <p style={styles.highlightText}>{item.body}</p>
                <Link href={item.href} style={styles.highlightLink}>
                  {item.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.wrap}>
          <div style={styles.contactPreview}>
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={styles.sectionTitle}>Klar for å ta kontakt?</h2>
              <p style={styles.sectionLead}>
                Vi holder til i Østenbekkveien 43 og leverer bemanning i hele Norge. Ta kontakt så finner vi et opplegg som passer
                dere.
              </p>
            </div>
            <Link href="/kontakt" style={styles.heroPrimary}>
              Kontakt Bluecrew AS
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#F8FAFC",
    color: "#0F172A",
  },
  wrap: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "0 20px",
  },
  hero: {
    padding: "96px 0 72px",
    background: "linear-gradient(180deg, #0B1F3A 0%, #0F2B52 45%, #0B1F3A 100%)",
    color: "#E2E8F0",
  },
  heroInner: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 20px",
    textAlign: "center",
    display: "grid",
    gap: 20,
  },
  heroPill: {
    display: "inline-block",
    margin: "0 auto",
    padding: "6px 16px",
    borderRadius: 999,
    background: "rgba(15, 118, 255, 0.16)",
    color: "#F8FAFC",
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: 42,
    lineHeight: 1.1,
    margin: 0,
    fontWeight: 800,
    letterSpacing: "-0.015em",
  },
  heroLead: {
    fontSize: 18,
    maxWidth: 720,
    margin: "0 auto",
    color: "rgba(226,232,240,0.88)",
  },
  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  heroPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 22px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
    background: "linear-gradient(135deg, #38BDF8, #0EA5E9)",
    color: "#0B1F3A",
    boxShadow: "0 16px 40px rgba(14,165,233,0.32)",
  },
  heroSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 22px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    color: "#E2E8F0",
    background: "rgba(15,23,42,0.4)",
  },
  sectionLight: {
    padding: "72px 0",
  },
  sectionAlt: {
    padding: "72px 0",
    background: "#EEF2F7",
  },
  sectionTitle: {
    margin: "0 0 28px",
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    color: "#0F172A",
    textAlign: "left",
  },
  sectionLead: {
    margin: 0,
    fontSize: 17,
    color: "#334155",
    lineHeight: 1.6,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  card: {
    display: "grid",
    gap: 12,
    padding: 24,
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #E2E8F0",
    boxShadow: "0 10px 32px rgba(15,23,42,0.08)",
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  cardText: {
    margin: 0,
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.6,
  },
  benefitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
  },
  benefitCard: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #E2E8F0",
    padding: 22,
    boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
    display: "grid",
    gap: 10,
  },
  benefitTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  benefitText: {
    margin: 0,
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.6,
  },
  highlightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 18,
  },
  highlightCard: {
    background: "#0B1F3A",
    color: "#E2E8F0",
    borderRadius: 18,
    padding: 26,
    display: "grid",
    gap: 14,
    boxShadow: "0 16px 36px rgba(11,31,58,0.35)",
  },
  highlightTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },
  highlightText: {
    margin: 0,
    fontSize: 15,
    color: "rgba(226,232,240,0.85)",
    lineHeight: 1.6,
  },
  highlightLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    borderRadius: 999,
    textDecoration: "none",
    color: "#0B1F3A",
    background: "#F8FAFC",
    fontWeight: 700,
    fontSize: 14,
  },
  contactPreview: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: 32,
    borderRadius: 20,
    background: "#fff",
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
  },
};
