import Link from "next/link";
import { ReactNode } from "react";
import { sx } from "../lib/styles";
import Logo from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Hjem", key: "home" },
  { href: "/kandidat", label: "Kandidat", key: "kandidat" },
  { href: "/kunde", label: "Kunde", key: "kunde" },
  { href: "/om-oss", label: "Om oss", key: "om-oss" },
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
            <Logo size={34} />
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
            <Link
              key="kontakt"
              href="/kontakt"
              style={{
                ...sx.navLink,
                ...(active === "kontakt" ? sx.navLinkActive : null),
                border: "1px solid rgba(148, 163, 184, 0.35)",
                padding: "8px 16px",
                borderRadius: 999,
                background: active === "kontakt" ? "rgba(56, 189, 248, 0.18)" : "rgba(15, 23, 42, 0.4)",
              }}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </header>

      <main style={sx.main}>{children}</main>

      <footer style={sx.footer}>
        <div style={sx.footerInner}>
          <div style={sx.footerCols}>
            <div style={sx.footerCol}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Logo size={32} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#f8fafc" }}>Bluecrew AS</div>
                  <div style={{ fontSize: 13, color: "rgba(226, 232, 240, 0.75)" }}>Bemanning til havbruk, fiskeri og servicefartøy</div>
                </div>
              </div>
              <p style={sx.footerText}>
                Vi drives av sjøfolk med operativ erfaring fra norsk kyst. Vi vet hvor kritisk det er at rett mannskap er på
                plass når været snur og produksjonen må gå.
              </p>
            </div>
            <div style={sx.footerCol}>
              <h3 style={sx.footerHeading}>Kontakt</h3>
              <ul style={sx.footerList}>
                <li>
                  <a href="mailto:isak@bluecrew.no" style={sx.footerLink}>
                    isak@bluecrew.no
                  </a>
                </li>
                <li>
                  <a href="tel:92328850" style={sx.footerLink}>
                    923 28 850
                  </a>
                </li>
                <li>
                  <span style={sx.footerText}>Østenbekkveien 43, 9011 Tromsø</span>
                </li>
              </ul>
            </div>
            <div style={sx.footerCol}>
              <h3 style={sx.footerHeading}>Snarveier</h3>
              <ul style={sx.footerList}>
                <li>
                  <Link href="/kandidat" style={sx.footerLink}>
                    Registrer kandidat
                  </Link>
                </li>
                <li>
                  <Link href="/kunde" style={sx.footerLink}>
                    Meld inn bemanningsbehov
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" style={sx.footerLink}>
                    Kontakt oss
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div style={sx.footerNote}>© {new Date().getFullYear()} Bluecrew AS. Org.nr: 936 321 194.</div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
