import type { CSSProperties } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const headerStyles = {
  topbar: {
    width: "100%",
    borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
    background: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(12px)",
    position: "sticky" as const,
    top: 0,
    zIndex: 20,
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
  },
  wrap: {
    margin: "0 auto",
    width: "min(1100px, 92vw)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    padding: "18px 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    textDecoration: "none",
    color: "inherit",
  },
  logoBox: {
    display: "flex",
    flexDirection: "column" as const,
    lineHeight: 1.1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "0.02em",
    color: "#0B1F3A",
  },
  logoTag: {
    fontSize: 12,
    color: "#2563EB",
    textTransform: "uppercase" as const,
    letterSpacing: "0.28em",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  navLink: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1E293B",
    textDecoration: "none",
    letterSpacing: "0.01em",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
    color: "#F8FAFC",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 13,
    boxShadow: "0 10px 20px rgba(15, 23, 42, 0.18)",
  },
  ctaSecondary: {
    background: "#1D4ED8",
    color: "#F8FAFC",
    boxShadow: "0 10px 20px rgba(29, 78, 216, 0.2)",
  },
};

type SiteHeaderProps = {
  showCtas?: boolean;
};

export default function SiteHeader({ showCtas = true }: SiteHeaderProps) {
  return (
    <header style={headerStyles.topbar}>
      <div style={headerStyles.wrap}>
        <Link href="/" style={headerStyles.brand} aria-label="Bluecrew hjem">
          <Logo size={36} />
          <span style={headerStyles.logoBox as CSSProperties}>
            <span style={headerStyles.logoText}>Bluecrew</span>
            <span style={headerStyles.logoTag}>Bemanning til sjøs</span>
          </span>
        </Link>
        <nav style={headerStyles.nav} aria-label="Hovedmeny">
          <Link href="/#tjenester" style={headerStyles.navLink}>
            Tjenester
          </Link>
          <Link href="/#kandidat" style={headerStyles.navLink}>
            Kandidater
          </Link>
          <Link href="/#kunde" style={headerStyles.navLink}>
            Kunder
          </Link>
          <Link href="/#om" style={headerStyles.navLink}>
            Om oss
          </Link>
          <Link href="/#kontakt" style={headerStyles.navLink}>
            Kontakt
          </Link>
        </nav>
        {showCtas ? (
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/#kandidat" style={headerStyles.cta}>
              Registrer kandidat
            </Link>
            <Link
              href="/#kunde"
              style={{ ...headerStyles.cta, ...headerStyles.ctaSecondary }}
            >
              Meld inn behov
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
