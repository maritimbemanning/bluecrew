import Link from "next/link";
import { ReactNode } from "react";
import { CONTACT_POINTS } from "../lib/constants";
import { sx } from "../lib/styles";
import Logo from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Hjem", key: "home" },
  { href: "/kandidat", label: "Kandidat", key: "kandidat" },
  { href: "/kunde", label: "Kunde", key: "kunde" },
  { href: "/om-oss", label: "Om oss", key: "om-oss" },
  { href: "/kontakt", label: "Kontakt", key: "kontakt" },
];

export function SiteLayout({ children, active }: { children: ReactNode; active: string }) {
  return (
    <div style={sx.page}>
      <header style={sx.topbar}>
        <div style={sx.wrap}>
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}
            aria-label="Bluecrew forside"
          >
            <Logo size={40} />
            <div style={sx.logoBox}>
              <div style={sx.logoText}>Bluecrew Bemanning til sjøs</div>
              <div style={sx.logoTag}>Fra brygge til bro</div>
            </div>
          </Link>
          <nav style={sx.nav} aria-label="Hovedmeny">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  ...(item.key === "kontakt" ? { ...sx.navLink, ...sx.navLinkAccent } : sx.navLink),
                  ...(active === item.key && item.key !== "kontakt" ? sx.navLinkActive : {}),
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div style={sx.trustBand}>
        <div style={sx.trustRow}>
          <span>Lokalt eierskap</span>
          <span>Sjøfolk med operativ erfaring</span>
          <span>Bemanning for havbruk, fiskeri, service- og spesialfartøy</span>
        </div>
      </div>

      <main style={sx.main}>{children}</main>

      <footer style={sx.footer}>
        <div style={sx.footerWrap}>
          <div style={sx.footerGrid}>
            <div>
              <div style={sx.footerHeading}>Bluecrew AS</div>
              <p style={sx.footerText}>
                Vi leverer erfarne sjøfolk til hele den maritime næringen. Som tidligere mannskap kjenner vi tempoet og behovene
                langs norskekysten og offshorefelt.
              </p>
            </div>
            <div>
              <div style={sx.footerHeading}>Kontakt</div>
              <ul style={sx.footerList}>
                {CONTACT_POINTS.map((point) => (
                  <li key={point.label} style={sx.footerListItem}>
                    <span style={{ display: "block", fontSize: 12, opacity: 0.7, letterSpacing: ".08em", textTransform: "uppercase" }}>
                      {point.label}
                    </span>
                    {point.href ? (
                      <Link href={point.href} style={sx.footerLink}>
                        {point.value}
                      </Link>
                    ) : (
                      <span>{point.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={sx.footerHeading}>Adresse</div>
              <p style={sx.footerText}>
                Østenbekkveien 43
                <br />9403 Harstad
              </p>
              <p style={sx.footerText}>Org.nr: 936 321 194</p>
            </div>
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link href="/faq" style={{ ...sx.btnGhost, display: "inline-flex", alignItems: "center" }}>
              Vanlige spørsmål
            </Link>
          </div>
          <div style={sx.footerLegal}>© {new Date().getFullYear()} Bluecrew AS – Effektiv bemanning til sjøs</div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
