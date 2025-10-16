"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const WORK_CATEGORIES = [
  "Servicefartøy mannskap",
  "Havbruk",
  "Fiskeri",
  "Midlertidig",
  "Annet",
];

export default function BemanningsbehovPage() {
  return (
    <Suspense fallback={<div />}>
      <BemanningsbehovContent />
    </Suspense>
  );
}

function BemanningsbehovContent() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");

  return (
    <div style={styles.page}>
      <SiteHeader />
      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <p style={styles.heroPill}>Meld inn bemanningsbehov</p>
            <h1 style={styles.heroTitle}>Rett mannskap til havbruk, fiskeri og servicefartøy</h1>
            <p style={styles.heroText}>
              Fortell oss om fartøyet, krav til sertifiseringer og når du trenger folk om bord. Vi svarer raskt med aktuelle
              kandidater.
            </p>
            <div style={styles.heroLinks}>
              <Link href="/kandidat" style={styles.heroLink}>
                Registrer kandidat i stedet
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.formSection}>
          <div style={styles.formWrap}>
            <h2 style={styles.formTitle}>Forespørsel om bemanning</h2>
            <p style={styles.formIntro}>
              Fyll ut feltene under, så kontakter vi deg for å avklare detaljer og presentere kandidater som matcher.
            </p>
            {sent === "client" ? (
              <div style={styles.success} role="status">
                Takk! Vi tar kontakt så snart som mulig.
              </div>
            ) : (
              <form action="/api/submit-client" method="POST" style={styles.form} noValidate>
                <Input label="Selskap" name="company" required />
                <Input label="Organisasjonsnummer" name="orgnr" />
                <Input label="Kontaktperson" name="contact" required />
                <Input label="E-post" name="c_email" type="email" required />
                <Input label="Telefon" name="c_phone" required />
                <Input label="Lokasjon/område" name="location" />
                <Select label="Type behov" name="need_type" options={WORK_CATEGORIES} placeholder="Velg område" />
                <Input label="Oppstartsdato" name="start_date" type="date" />
                <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />
                <Textarea label="Krav til sertifikater, erfaring eller turnus" name="requirements" rows={3} full />
                <Textarea label="Andre kommentarer" name="notes" rows={3} full />
                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={styles.submitBtn}>
                    Send forespørsel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `${name}-field`;
  return (
    <label style={styles.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input id={id} name={name} type={type} required={required} style={styles.input} />
    </label>
  );
}

function Textarea({ label, name, rows = 4, full }: { label: string; name: string; rows?: number; full?: boolean }) {
  const id = `${name}-field`;
  return (
    <label style={{ ...styles.label, gridColumn: full ? "1 / -1" : undefined }} htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} name={name} rows={rows} style={{ ...styles.input, height: rows * 24 }} />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  const id = `${name}-field`;
  return (
    <label style={styles.label} htmlFor={id}>
      <span>{label}</span>
      <select id={id} name={name} style={styles.input}>
        <option value="">{placeholder ?? "Velg"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    background: "#F8FAFC",
    color: "#0F172A",
    minHeight: "100vh",
  },
  main: {
    paddingBottom: 80,
  },
  hero: {
    background: "linear-gradient(135deg, #0B1F3A 0%, #1D4ED8 100%)",
    color: "#fff",
    padding: "96px 0 72px",
  },
  heroInner: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
    display: "grid",
    gap: 16,
  },
  heroPill: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.18)",
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heroTitle: {
    margin: 0,
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "-0.01em",
  },
  heroText: {
    margin: 0,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.88)",
  },
  heroLinks: {
    display: "flex",
    justifyContent: "center",
    marginTop: 8,
  },
  heroLink: {
    color: "#C7D2FE",
    textDecoration: "none",
    fontWeight: 600,
  },
  formSection: {
    padding: "72px 0",
  },
  formWrap: {
    maxWidth: 840,
    margin: "0 auto",
    padding: "0 24px",
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
    border: "1px solid #E2E8F0",
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: "32px 24px 12px",
    color: "#0B1F3A",
  },
  formIntro: {
    margin: "0 24px 24px",
    color: "#475569",
    lineHeight: 1.6,
  },
  success: {
    margin: "0 24px 32px",
    padding: "18px 20px",
    borderRadius: 14,
    background: "#DBEAFE",
    color: "#1D4ED8",
    fontWeight: 600,
  },
  form: {
    display: "grid",
    gap: 18,
    padding: "0 24px 36px",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: "#0B1F3A",
  },
  input: {
    borderRadius: 12,
    border: "1px solid #CBD5F5",
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: "inherit",
    color: "#0F172A",
    background: "#fff",
  },
  submitBtn: {
    width: "100%",
    borderRadius: 14,
    padding: "14px 20px",
    background: "linear-gradient(135deg, #2563EB, #3B82F6)",
    color: "#fff",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 16px 32px rgba(37,99,235,0.25)",
  },
};
