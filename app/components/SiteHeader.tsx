import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const navLinkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.92)",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 600,
};

export function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(11, 31, 58, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Link
          href="/"
          aria-label="Bluecrew AS hjem"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
        >
          <Logo size={30} />
          <span style={{ display: "grid", color: "#E2E8F0" }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em" }}>Bluecrew AS</span>
            <span style={{ fontSize: 12, opacity: 0.9 }}>Maritim bemanning & rekruttering</span>
          </span>
        </Link>

        <nav aria-label="Hovedmeny" style={{ display: "flex", gap: 20, marginLeft: "auto", alignItems: "center" }}>
          <Link href="/kandidat" style={navLinkStyle}>
            Kandidat
          </Link>
          <Link href="/kunde" style={navLinkStyle}>
            Kunde
          </Link>
          <Link href="/om-oss" style={navLinkStyle}>
            Om oss
          </Link>
          <Link href="/kontakt" style={navLinkStyle}>
            Kontakt
          </Link>
        </nav>

        <Link
          href="/kunde"
          style={{
            marginLeft: 12,
            padding: "8px 16px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #38BDF8, #0EA5E9)",
            color: "#0B1F3A",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            boxShadow: "0 10px 24px rgba(14,165,233,0.25)",
          }}
        >
          Bestill mannskap
        </Link>
      </div>
    </header>
  );
}
