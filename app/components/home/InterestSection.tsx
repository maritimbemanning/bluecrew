"use client";

import { useState } from "react";
import Link from "next/link";
import { sx } from "@/app/lib/styles";
import { useCsrf } from "@/app/lib/hooks/useCsrf";

// Analytics types
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

type State = "idle" | "submitting" | "success" | "error";

export function InterestSection() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  // CSRF protection
  const { token: csrfToken, refresh: refreshCsrf } = useCsrf();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("[InterestSection] Form submitted - onSubmit called");

    setError(null);
    setState("submitting");
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot - use obscure name that autofill won't recognize
    const honeypotValue = fd.get("website_url_confirm");
    if (typeof honeypotValue === "string" && honeypotValue.trim()) {
      console.log("[InterestSection] Honeypot triggered - likely bot");
      setState("success");
      form.reset();
      return;
    }

    // Check CSRF token
    console.log("[InterestSection] CSRF token status:", { csrfToken, loading: !csrfToken });

    if (!csrfToken) {
      console.error("[InterestSection] No CSRF token available!");
      setError("Vennligst vent mens siden laster inn, og prøv igjen.");
      setState("error");
      return;
    }

    const payload = {
      ...Object.fromEntries(fd.entries()),
      csrf_token: csrfToken,
    };

    console.log("[InterestSection] Sending payload to API...");

    try {
      console.log("[InterestSection] About to call fetch...");
      const res = await fetch("/api/submit-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("[InterestSection] Fetch completed, status:", res.status);

      if (res.ok) {
        console.log("[InterestSection] Success! Resetting form...");
        setState("success");
        form.reset();
        try {
          if (typeof window !== "undefined" && window.plausible) {
            window.plausible("Interest Submitted", {
              props: { form: "candidate_interest" },
            });
          }
          // Track to Google Ads (Candidate Lead Conversion)
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "conversion", {
              send_to: "AW-17715214678/YYYYYY", // 👈 Erstatt YYYYYY med conversion label for kandidater
              value: 0.5,
              currency: "NOK",
              transaction_id: `candidate_${Date.now()}`,
            });
          }
        } catch {}
      } else {
        console.log("[InterestSection] API returned error status:", res.status);
        const data = await res.json().catch(() => ({}));
        console.log("[InterestSection] Error response data:", data);
        setError(data?.error || "Noe gikk galt. Prøv igjen senere.");
        setState("error");
        refreshCsrf(); // Get new CSRF token after failed attempt
      }
    } catch (fetchError) {
      // THIS WAS MISSING! Catches network errors, CORS issues, etc.
      console.error("[InterestSection] Fetch failed with error:", fetchError);
      setError("Nettverksfeil. Sjekk internett og prøv igjen.");
      setState("error");
      refreshCsrf();
    }
  }

  return (
    <section style={sx.section} aria-labelledby="interest-heading">
      <div style={sx.wrapNarrow}>
        <h2 id="interest-heading" style={sx.h2}>
          Meld interesse – bemanning i maritim sektor
        </h2>
        <p style={sx.leadSmall}>
          Vi er sjøfolk som bygger Bluecrew – et godkjent bemanningsforetak for
          hele den maritime sektoren. Meld interesse uforpliktende, så tar vi
          kontakt når vi har oppdrag som passer din erfaring.
        </p>

        <form onSubmit={onSubmit} style={sx.form}>
          {/* Honeypot: off-screen text input for bots; hidden from assistive tech */}
          <input
            name="website_url_confirm"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            title=""
            style={sx.honeypot}
          />

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
              <option>Akvatekniker m/fagbrev</option>
              <option>Annet maritimt</option>
            </select>
          </label>
          <label style={sx.label}>
            <span>Region *</span>
            <select name="region" required style={sx.input}>
              <option value="">Velg region</option>
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
            <input
              name="start_from"
              placeholder="F.eks. snarest, uke 45"
              style={sx.input}
            />
          </label>
          <label style={{ ...sx.label, gridColumn: "1 / -1" }}>
            <span>Sertifikater (valgfritt)</span>
            <input
              name="certificates"
              placeholder="F.eks. D5L, HSE-kurs, STCW"
              style={sx.input}
            />
          </label>
          <label style={{ ...sx.label, gridColumn: "1 / -1" }}>
            <span>Tilleggsinfo (valgfritt)</span>
            <textarea
              name="notes"
              rows={3}
              style={{ ...sx.input, height: 90 }}
            />
          </label>

          <label
            style={{
              ...sx.label,
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "20px 1fr",
              alignItems: "start",
              gap: 10,
            }}
          >
            <input name="consent" type="checkbox" required />
            <span style={{ fontSize: 14 }}>
              Jeg samtykker til at Bluecrew behandler mine opplysninger for å
              vurdere meg for fremtidige maritime oppdrag og kontakte meg når
              noe passer. Jeg kan når som helst trekke samtykket tilbake.{" "}
              <Link href="/personvern">Les personvernerklæringen</Link>.
            </span>
          </label>

          {error ? <div style={sx.formError}>{error}</div> : null}

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              disabled={state === "submitting"}
              style={sx.btnSecondary}
            >
              {state === "submitting" ? "Sender…" : "Meld interesse"}
            </button>
            {state === "success" ? (
              <div style={sx.ok}>
                Takk! Vi har sendt en bekreftelse på e‑post og tar kontakt når
                noe passer.
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

export default InterestSection;
