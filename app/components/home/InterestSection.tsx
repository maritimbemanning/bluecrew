"use client";

import { useState } from "react";
import Link from "next/link";
import { sx } from "@/app/lib/styles";

type State = "idle" | "submitting" | "success" | "error";

export function InterestSection() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setState("submitting");
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot
    if (typeof fd.get("company") === "string" && (fd.get("company") as string).trim()) {
      setState("success");
      form.reset();
      return;
    }

    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/submit-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setState("success");
      form.reset();
      try {
        if (typeof window !== "undefined" && (window as any).plausible) {
          (window as any).plausible("Interest Submitted", { props: { form: "candidate_interest" } });
        }
      } catch {}
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Noe gikk galt. Prøv igjen senere.");
      setState("error");
    }
  }

  return (
    <section style={sx.section} aria-labelledby="interest-heading">
      <div style={sx.wrapNarrow}>
        <h2 id="interest-heading" style={sx.h2}>Meld interesse – bemanning i maritim sektor</h2>
        <p style={sx.leadSmall}>
          Vi er sjøfolk som bygger Bluecrew – et godkjent bemanningsforetak for hele den maritime sektoren. Meld interesse
          uforpliktende, så tar vi kontakt når vi har oppdrag som passer din erfaring.
        </p>

        <form onSubmit={onSubmit} style={sx.form}>
          {/* Honeypot */}
          <input name="company" type="text" autoComplete="off" tabIndex={-1} style={sx.honeypot} />

          <label style={sx.label}>
            <span>Fullt navn *</span>
            <input name="name" required style={sx.input} />
          </label>
          <label style={sx.label}>
            <span>E‑post *</span>
            <input name="email" type="email" required style={sx.input} />
          </label>
          <label style={sx.label}>
            <span>Telefon</span>
            <input name="phone" inputMode="tel" style={sx.input} />
          </label>
          <label style={sx.label}>
            <span>Rolle / stilling *</span>
            <select name="role" required style={sx.input}>
              <option value="">Velg</option>
              <option>Skipper / kyst</option>
              <option>Styrmann</option>
              <option>Maskinist</option>
              <option>Matros</option>
              <option>Dekksarbeider</option>
              <option>Lærling</option>
              <option>Annet maritimt</option>
            </select>
          </label>
          <label style={sx.label}>
            <span>Region</span>
            <select name="region" style={sx.input}>
              <option>Ikke spesifisert</option>
              <option>Nord-Norge</option>
              <option>Midt-Norge</option>
              <option>Vestlandet</option>
              <option>Østlandet</option>
              <option>Svalbard</option>
            </select>
          </label>
          <label style={sx.label}>
            <span>Erfaring (år)</span>
            <input name="experience" type="number" min={0} style={sx.input} />
          </label>
          <label style={{ ...sx.label, gridColumn: "1 / -1" }}>
            <span>Oppstart (valgfritt)</span>
            <input name="start_from" placeholder="F.eks. snarest, uke 45" style={sx.input} />
          </label>
          <label style={{ ...sx.label, gridColumn: "1 / -1" }}>
            <span>Sertifikater (valgfritt)</span>
            <input name="certificates" placeholder="F.eks. D5L, HSE-kurs, STCW" style={sx.input} />
          </label>
          <label style={{ ...sx.label, gridColumn: "1 / -1" }}>
            <span>Tilleggsinfo (valgfritt)</span>
            <textarea name="notes" rows={3} style={{ ...sx.input, height: 90 }} />
          </label>

          <label style={{ ...sx.label, gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "20px 1fr", alignItems: "start", gap: 10 }}>
            <input name="consent" type="checkbox" required />
            <span style={{ fontSize: 14 }}>
              Jeg samtykker til at Bluecrew behandler mine opplysninger for å vurdere meg for fremtidige maritime oppdrag og
              kontakte meg når noe passer. Jeg kan når som helst trekke samtykket tilbake. <Link href="/personvern">Les personvernerklæringen</Link>.
            </span>
          </label>

          {error ? (
            <div style={sx.formError}>{error}</div>
          ) : null}

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "center" }}>
            <button type="submit" disabled={state === "submitting"} style={sx.btnSecondary}>
              {state === "submitting" ? "Sender…" : "Meld interesse"}
            </button>
            {state === "success" ? (
              <div style={sx.ok}>Takk! Vi har sendt en bekreftelse på e‑post og tar kontakt når noe passer.</div>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

export default InterestSection;
