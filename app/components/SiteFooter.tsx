"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0B1F3A",
        color: "rgba(255,255,255,0.85)",
        marginTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gap: 32,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={36} />
            <div>
              <div style={{ fontWeight: 800, letterSpacing: "-0.01em" }}>Bluecrew AS</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>Organisasjonsnummer 933 939 007</div>
            </div>
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Østenbekkveien 43, 9403 Harstad
            <br />
            Bemanning til havbruk, fiskeri og servicefartøy over hele landet.
          </p>
        </div>
        <div>
          <h3 style={{ fontSize: 16, margin: "0 0 12px", color: "#fff" }}>Kontakt</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
            <li>
              <a href="tel:+4741380800" style={linkStyle}>
                +47 41 38 08 00
              </a>
            </li>
            <li>
              <a href="mailto:post@bluecrew.no" style={linkStyle}>
                post@bluecrew.no
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: 16, margin: "0 0 12px", color: "#fff" }}>Snarveier</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
            <li>
              <Link href="/tjenester" style={linkStyle}>
                Tjenester
              </Link>
            </li>
            <li>
              <Link href="/om-oss" style={linkStyle}>
                Om oss
              </Link>
            </li>
            <li>
              <Link href="/kandidat" style={linkStyle}>
                Registrer kandidat
              </Link>
            </li>
            <li>
              <Link href="/bemanningsbehov" style={linkStyle}>
                Meld inn bemanningsbehov
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", textAlign: "center" }}>
        © {year} Bluecrew AS. Alle rettigheter forbeholdt.
      </div>
    </footer>
  );
}

const linkStyle: CSSProperties = {
  color: "rgba(255,255,255,0.86)",
  textDecoration: "none",
  fontSize: 15,
};
