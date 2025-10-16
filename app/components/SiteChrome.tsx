'use client';

import Link from "next/link";
import { sx } from "../styles";

type CurrentPage = "home" | "kandidat" | "bemanning" | undefined;

const NAV_ITEMS = [
  { key: "services", href: "/#tjenester", label: "Tjenester", match: "home" as const },
  { key: "about", href: "/#om-oss", label: "Om oss", match: "home" as const },
  { key: "candidate", href: "/kandidat", label: "Kandidat", match: "kandidat" as const },
  { key: "client", href: "/bemanningsbehov", label: "Kunde", match: "bemanning" as const },
  { key: "contact", href: "/#kontakt", label: "Kontakt", match: "home" as const },
];

export function SiteHeader({ current }: { current?: CurrentPage }) {
  return (
    <header style={sx.topbar}>
      <div style={sx.wrap}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "inherit",
          }}
          aria-label="Bluecrew hjem"
        >
          <Logo size={28} />
          <div style={sx.logoBox}>
            <div style={sx.logoText}>Bluecrew</div>
            <div style={sx.logoTag}>Bluecrew AS</div>
          </div>
        </Link>

        <nav style={sx.nav} aria-label="Hovedmeny">
          {NAV_ITEMS.map((item) => {
            const isActive = current === item.match && item.match !== "home";
            return (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  ...sx.navLink,
                  ...(isActive
                    ? { borderBottom: "2px solid #fff", paddingBottom: 4, color: "#fff" }
                    : null),
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer style={sx.footer}>
      <div style={sx.wrapNarrow}>
        © {new Date().getFullYear()} Bluecrew AS — Bemanning til sjøs
      </div>
    </footer>
  );
}

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Bluecrew logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" fill="#0B1F3A" />
      <path
        d="M10 36c6 0 9-6 16-6s10 6 16 6 10-6 12-6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10 44c6 0 9-6 16-6s10 6 16 6 10-6 12-6"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
