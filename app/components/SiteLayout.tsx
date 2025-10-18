"use client";

import Link from "next/link";
import { FocusEvent, ReactNode, useState } from "react";
import { CONTACT_POINTS } from "../lib/constants";
import { sx } from "../lib/styles";
import Logo from "./Logo";

type NavChild = { href: string; label: string; description?: string };
type NavItem = {
  href: string;
  label: string;
  key: string;
  accent?: boolean;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Hjem", key: "home" },
  {
    href: "/jobbsoker",
    label: "Jobbsøker",
    key: "jobbsoker",
    children: [
      { href: "/jobbsoker/registrer", label: "Registrer deg" },
      { href: "/jobbsoker/oppdrag", label: "Oppdrag" },
      { href: "/faq", label: "Vanlige spørsmål" },
    ],
  },
  {
    href: "/kunde",
    label: "Kunde",
    key: "kunde",
    children: [
      { href: "/kunde/registrer-behov", label: "Registrer behov" },
      { href: "/kunde/bemanning", label: "Bemanning" },
      { href: "/kunde/rekruttering", label: "Rekruttering" },
      { href: "/kunde/hva-vi-hjelper-med", label: "Hva vi hjelper din bedrift med" },
      { href: "/kontakt", label: "Kontakt oss" },
    ],
  },
  { href: "/om-oss", label: "Om oss", key: "om-oss" },
  { href: "/kontakt", label: "Kontakt", key: "kontakt", accent: true },
];

export function SiteLayout({ children, active }: { children: ReactNode; active: string }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const closeMenu = () => setOpenKey(null);

  const handleBlur = (key: string) => (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(next)) {
      setOpenKey((prev) => (prev === key ? null : prev));
    }
  };

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
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              const hasChildren = !!item.children?.length;
              const isOpen = openKey === item.key;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    style={{
                      ...(item.accent ? { ...sx.navLink, ...sx.navLinkAccent } : sx.navLink),
                      ...(isActive && !item.accent ? sx.navLinkActive : {}),
                    }}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.key}
                  style={sx.navItem}
                  onMouseEnter={() => setOpenKey(item.key)}
                  onMouseLeave={closeMenu}
                  onFocus={() => setOpenKey(item.key)}
                  onBlur={handleBlur(item.key)}
                >
                  <Link
                    href={item.href}
                    style={{
                      ...sx.navTrigger,
                      ...(isActive ? sx.navLinkActive : {}),
                    }}
                  >
                    {item.label}
                    <span aria-hidden="true" style={sx.navCaret}>
                      ▾
                    </span>
                  </Link>
                  {isOpen && (
                    <div style={sx.navDropdown}>
                      {item.children!.map((child) => (
                        <Link key={child.href} href={child.href} style={sx.navDropdownLink}>
                          {child.label}
                          {child.description && <span style={sx.navDropdownDescription}>{child.description}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
                    <span
                      style={{ display: "block", fontSize: 12, opacity: 0.7, letterSpacing: ".08em", textTransform: "uppercase" }}
                    >
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
