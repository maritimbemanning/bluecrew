import type { CSSProperties } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const headerStyles = {
  topbar: {
    width: "100%",
    borderBottom: "1px solid #E2E8F0",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
    position: "sticky" as const,
    top: 0,
    zIndex: 20,
  },
  wrap: {
    margin: "0 auto",
    width: "min(1100px, 92vw)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "18px 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "inherit",
  },
  logoBox: {
    display: "grid",
    gap: 2,
    lineHeight: 1.1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "0.01em",
    color: "#0B1F3A",
  },
  logoTag: {
    fontSize: 13,
    color: "#334155",
    fontWeight: 600,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  navLink: {
    fontSize: 15,
    fontWeight: 600,
    color: "#0F172A",
    textDecoration: "none",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: 999,
    background: "#0B1F3A",
    color: "#fff",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 13,
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
          <Logo size={34} />
          <span style={headerStyles.logoBox as CSSProperties}>
            <span style={headerStyles.logoText}>Bluecrew</span>
            <span style={headerStyles.logoTag}>Bemanning til sjøs</span>
          </span>
        </Link>
        <nav style={headerStyles.nav} aria-label="Hovedmeny">
          <Link href="/#tjenester" style={headerStyles.navLink}>
            Tjenester
          </Link>
          <Link href="/#fordeler" style={headerStyles.navLink}>
            Derfor Bluecrew
          </Link>
          <Link href="/#neste" style={headerStyles.navLink}>
            Neste steg
          </Link>
          <Link href="/#kontakt" style={headerStyles.navLink}>
            Kontakt
          </Link>
        </nav>
        {showCtas ? (
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/kandidat" style={headerStyles.cta}>
              Registrer kandidat
            </Link>
            <Link href="/bemanningsbehov" style={{ ...headerStyles.cta, background: "#1D4ED8" }}>
              Meld inn behov
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
