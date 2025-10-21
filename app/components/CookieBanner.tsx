"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, type ConsentPrefs } from "../lib/consent";

/**
 * Elegant, responsivt cookie-banner (glassmorphism + shadow)
 * - Flyter nederst, sentrert på desktop, fullbredde på mobil
 * - Tydelig typografi og knapper
 * - "Tilpass" for å velge statistikk
 */

const ui = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    pointerEvents: "none" as const,
    zIndex: 40,
  },
  sheetWrap: {
    position: "fixed" as const,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    zIndex: 50,
    pointerEvents: "none" as const,
  },
  sheet: {
    width: "100%",
    maxWidth: 840,
    borderRadius: 16,
    backdropFilter: "saturate(140%) blur(10px)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.9))",
    boxShadow:
      "0 30px 60px rgba(2,6,23,0.2), 0 12px 24px rgba(2,6,23,0.15), 0 2px 6px rgba(2,6,23,0.1)",
    border: "1px solid rgba(2,6,23,0.06)",
    pointerEvents: "auto" as const,
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
    padding: 20,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background:
      "radial-gradient(100% 100% at 30% 30%, #38bdf8 0%, #0ea5e9 100%)",
    boxShadow: "0 0 0 6px rgba(56,189,248,0.15)",
    flex: "0 0 auto",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: ".02em",
    color: "#0f172a",
  },
  text: {
    fontSize: 14.5,
    lineHeight: 1.7,
    color: "#334155",
  },
  link: {
    color: "#0ea5e9",
    textDecoration: "none",
    borderBottom: "1px dashed rgba(14,165,233,0.35)",
  },
  prefs: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    background: "rgba(2,6,23,0.03)",
    border: "1px solid rgba(2,6,23,0.06)",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#0f172a",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
    justifyContent: "flex-end",
  },
  btnPrimary: {
    appearance: "none" as const,
    border: "0",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    background:
      "linear-gradient(180deg, #0ea5e9, #0284c7)",
    boxShadow:
      "0 6px 16px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
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
  btnLink: {
    appearance: "none" as const,
    border: "0",
    background: "transparent",
    color: "#0ea5e9",
    padding: "10px 8px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  // simple responsive adjustment
  "@media(min-width: 720px)": {
    inner: {
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
    },
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const c = getConsent();
    if (!c) setVisible(true);
    else setPrefs(c);
  }, []);

  function acceptAll() {
    const next: ConsentPrefs = { necessary: true, analytics: true, marketing: false };
    setConsent(next);
    setPrefs(next);
    setVisible(false);
    window.dispatchEvent(new Event("bc:consent"));
  }

  function acceptNecessary() {
    const next: ConsentPrefs = { necessary: true, analytics: false, marketing: false };
    setConsent(next);
    setPrefs(next);
    setVisible(false);
    window.dispatchEvent(new Event("bc:consent"));
  }

  function saveCustom() {
    const next: ConsentPrefs = { necessary: true, analytics: prefs.analytics, marketing: false };
    setConsent(next);
    setPrefs(next);
    setCustomize(false);
    setVisible(false);
    window.dispatchEvent(new Event("bc:consent"));
  }

  if (!visible) return null;

  return (
    <>
      <div style={ui.overlay} aria-hidden="true" />
      <div style={ui.sheetWrap}>
        <div style={ui.sheet} role="dialog" aria-modal="true" aria-label="Informasjonskapsler">
          <div
            style={{
              ...ui.inner,
              ...(typeof window !== "undefined" && window.innerWidth >= 720 ? ui["@media(min-width: 720px)"].inner : {}),
            }}
          >
            <div>
              <div style={ui.titleRow}>
                <span style={ui.dot} />
                <div style={ui.title}>Vi bruker informasjonskapsler</div>
              </div>
              <p style={{ ...ui.text, marginTop: 8 }}>
                Vi bruker nødvendige cookies for at nettstedet skal fungere, og statistikk-cookies (Plausible) for å
                forbedre tjenesten. Les mer i{" "}
                <Link href="/personvern" style={ui.link}>personvernerklæringen</Link> og{" "}
                <Link href="/cookies" style={ui.link}>cookie-siden</Link>.
              </p>

              {customize && (
                <div style={ui.prefs}>
                  <label style={ui.toggle}>
                    <input type="checkbox" checked readOnly /> Nødvendige (alltid på)
                  </label>
                  <label style={ui.toggle}>
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                    />
                    Statistikk (Plausible)
                  </label>
                </div>
              )}
            </div>

            <div style={ui.actions}>
              {!customize ? (
                <>
                  <button type="button" style={ui.btnPrimary} onClick={acceptAll}>Godta alle</button>
                  <button type="button" style={ui.btnGhost} onClick={acceptNecessary}>Kun nødvendige</button>
                  <button type="button" style={ui.btnLink} onClick={() => setCustomize(true)}>Tilpass</button>
                </>
              ) : (
                <>
                  <button type="button" style={ui.btnPrimary} onClick={saveCustom}>Lagre valg</button>
                  <button type="button" style={ui.btnGhost} onClick={() => setCustomize(false)}>Avbryt</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
