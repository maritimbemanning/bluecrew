"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK_OPTIONS } from "../lib/formOptions";
import { sx } from "../styles";

const CLIENT_POINTS = [
  {
    icon: "⚙️",
    title: "Tilpasset rotasjonsplan",
    text: "Vi planlegger skift og beredskap sammen med deg slik at fartøyet alltid er bemannet.",
  },
  {
    icon: "🧾",
    title: "Full dokumentasjon",
    text: "Du får oversikt over sertifikater, referanser og tilgjengelighet på kandidatene du vurderer.",
  },
  {
    icon: "📡",
    title: "Rask respons",
    text: "Akutt behov? Vi mobiliserer nettverket vårt og følger deg opp til oppdraget er i gang.",
  },
];

export default function ClientPage() {
  return (
    <Suspense fallback={<div />}> 
      <ClientPageContent />
    </Suspense>
  );
}

function ClientPageContent() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");

  return (
    <main style={sx.page}>
      <SiteHeader current="bemanning" />

      <section style={{ ...sx.hero, paddingBottom: 32 }}>
        <div
          style={{
            ...sx.heroWrap,
            textAlign: "left",
            maxWidth: 720,
          }}
        >
          <div style={sx.heroPill}>For rederi og operatør</div>
          <h1 style={sx.h1}>Meld inn bemanningsbehov</h1>
          <p style={{ ...sx.h1Sub, marginLeft: 0, marginRight: 0 }}>
            Beskriv oppdraget, så finner vi kandidater med riktig kompetanse,
            sertifikater og tilgjengelighet.
          </p>
          <div style={{ ...sx.pillList, justifyContent: "flex-start", marginTop: 24 }}>
            <span style={sx.pill}>Servicefartøy, havbruk og fiskeri</span>
            <span style={sx.pill}>Verifisert kompetanse</span>
            <span style={sx.pill}>Enkel kommunikasjon</span>
          </div>
          <div style={{ marginTop: 24 }}>
            <Link
              href="/kandidat"
              style={{
                ...sx.btnMain,
                background: "#fff",
                color: "#0B1F3A",
                borderColor: "#0B1F3A",
                boxShadow: "0 6px 18px rgba(2,6,23,0.08)",
              }}
            >
              Se hvordan vi følger opp kandidatene
            </Link>
          </div>
        </div>
      </section>

      <section style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Oppdragsforespørsel</h2>
          <p style={sx.muted}>
            Beskriv behovet kort – vi matcher kvalifiserte kandidater etter kompetanse,
            tilgjengelighet og lokasjon.
          </p>

          {sent === "client" ? (
            <div style={sx.ok} role="status">
              Takk! Forespørselen er sendt inn.
            </div>
          ) : (
            <form action="/api/submit-client" method="POST" style={sx.form} noValidate>
              <Input label="Selskap" name="company" required />
              <Input label="Kontaktperson" name="contact" required />
              <Input label="E-post" name="c_email" type="email" required />
              <Input label="Telefon" name="c_phone" required />
              <Input label="Lokasjon/område" name="location" />
              <Select
                label="Type behov"
                name="need_type"
                options={Object.keys(WORK_OPTIONS)}
                placeholder="Velg"
              />
              <Textarea
                label="Kort beskrivelse av oppdraget"
                name="desc"
                rows={4}
                full
              />
              <Textarea
                label="Kvalifikasjoner eller sertifikater som kreves"
                name="requirements"
                rows={4}
                full
              />
              <Input label="Ønsket oppstart" name="start_date" type="date" />
              <div style={{ gridColumn: "1 / -1" }}>
                <button type="submit" style={sx.btnMain}>
                  Send forespørsel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={sx.h2}>Hvorfor kunder velger oss</h2>
            <p style={sx.muted}>
              Vi leverer på tid, kvalitet og kommunikasjon – uansett om det er enkeltskift
              eller bemanning av hele fartøy.
            </p>
          </div>

          <div style={sx.featureGrid}>
            {CLIENT_POINTS.map((item) => (
              <article key={item.title} style={sx.featureCard}>
                <div style={sx.featureIcon} aria-hidden="true">
                  {item.icon}
                </div>
                <h3 style={sx.featureTitle}>{item.title}</h3>
                <p style={sx.featureText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Trenger du noe ekstra?</h2>
          <p style={sx.muted}>
            Ta kontakt om du trenger bistand til beredskapspool, ekstra kurs eller
            prosjektspesifikk dokumentasjon.
          </p>
          <Link href="mailto:isak@bluecrew.no" style={{ ...sx.btnMain, display: "inline-block" }}>
            Kontakt Bluecrew
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
