"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Forside" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kandidat", label: "Registrer kandidat" },
  { href: "/bemanningsbehov", label: "Bemanningsbehov" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(11, 31, 58, 0.96)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          color: "#fff",
        }}
      >
        <Link
          href="/"
          aria-label="Til forsiden"
          style={{ display: "flex", alignItems: "center", gap: 12, color: "inherit" }}
        >
          <Logo size={32} />
          <span style={{ fontWeight: 800, letterSpacing: "-0.01em" }}>Bluecrew AS</span>
        </Link>
        <nav style={{ marginLeft: "auto", display: "flex", gap: 18, flexWrap: "wrap" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: active ? "#60A5FA" : "rgba(255,255,255,0.86)",
                  textDecoration: "none",
                  fontWeight: active ? 700 : 600,
                  fontSize: 14,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
