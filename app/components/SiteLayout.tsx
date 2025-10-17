import Link from "next/link";
import { ReactNode } from "react";
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
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
            aria-label="Bluecrew forside"
          >
            <Logo size={32} />
            <div style={sx.logoBox}>
              <div style={sx.logoText}>Bluecrew</div>
              <div style={sx.logoTag}>Maritim bemanning • Bluecrew AS</div>
            </div>
          </Link>
          <nav style={sx.nav} aria-label="Hovedmeny">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  ...sx.navLink,
                  ...(active === item.key ? sx.navLinkActive : null),
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main style={sx.main}>{children}</main>

      <footer style={sx.footer}>
        <div style={{ ...sx.wrapNarrow }}>
          <div style={sx.footerContent}>
            <div>© {new Date().getFullYear()} Bluecrew AS – Bemanning til sjøs</div>
            <div style={sx.footerContact}>
              <span>Østenbekkveien 43, 9011 Tromsø</span>
              <a href="tel:92328850" style={sx.footerLink}>
                923 28 850
              </a>
              <a href="mailto:isak@bluecrew.no" style={sx.footerLink}>
                isak@bluecrew.no
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
