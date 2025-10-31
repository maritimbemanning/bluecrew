"use client";

import Link from "next/link";
import Image from "next/image";
import { FocusEvent, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./SiteLayout.css";
import { createPortal } from "react-dom";
import { CONTACT_POINTS, SOCIAL_LINKS } from "../lib/constants";
import { sx } from "../lib/styles";
import { FloatingPhone } from "./FloatingPhone";

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
    href: "/jobbsoker/guides",
    label: "Karriere",
    key: "karriere",
    children: [
      { href: "/jobbsoker/guides/hvordan-bli-skipsforer", label: "Hvordan bli skipsfører" },
      { href: "/jobbsoker/guides/hvordan-bli-matros", label: "Hvordan bli matros" },
      { href: "/jobbsoker/guides/hvordan-bli-maskinoffiser", label: "Hvordan bli maskinoffiser" },
      { href: "/jobbsoker/guides/lonnsguide-maritime-stillinger", label: "Lønnsguide maritime stillinger" },
      { href: "/jobbsoker/guides", label: "Se alle sertifikatkrav" },
    ],
  },
  {
    href: "/jobbsoker",
    label: "Finn jobb",
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

export function SiteLayout({ children, active }: { children: ReactNode; active?: string }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);
  const shouldIgnoreOverlay = useRef(false);
  const [canPortal, setCanPortal] = useState(false);

  const openMobileMenu = useCallback(() => {
    shouldIgnoreOverlay.current = true;
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    shouldIgnoreOverlay.current = false;
    setMobileMenuOpen(false);
    setOpenKey(null);
  }, []);

  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 768px)");

    const applyMatches = (matches: boolean) => {
      setIsMobile(matches);
      if (!matches) {
        closeMobileMenu();
      }
    };

    applyMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      applyMatches(event.matches);
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener);
      return () => {
        media.removeEventListener("change", listener);
      };
    }

    media.addListener(listener);
    return () => {
      media.removeListener(listener);
    };
  }, [closeMobileMenu]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isMobile) {
      document.body.style.removeProperty("overflow");
      return;
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen || typeof document === "undefined") return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileMenu, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    closeButtonRef.current?.focus();
  }, [mobileMenuOpen]);

  // Trap focus inside the mobile sheet while it's open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const sheet = mobileSheetRef.current;
    if (!sheet) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(sheet.querySelectorAll(focusableSelector)) as HTMLElement[];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Tab") return;
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    sheet.addEventListener("keydown", handleKeyDown);

    return () => {
      sheet.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setCanPortal(typeof document !== "undefined");

    return () => {
      setCanPortal(false);
    };
  }, []);

  const scheduleClose = () => {
    cancelClose();
    closeTimeout.current = setTimeout(() => {
      setOpenKey(null);
      closeTimeout.current = null;
    }, 400);
  };

  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  const handleBlur = (key: string, event: FocusEvent<Element>) => {
    const next = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(next)) {
      cancelClose();
      setOpenKey((prev) => (prev === key ? null : prev));
    }
  };

  // Helpers for keyboard navigation inside dropdowns
  const getMenuItems = (key: string) => {
    if (typeof document === "undefined") return [] as HTMLElement[];
    return Array.from(document.querySelectorAll(`#${key}-submenu [role='menuitem']`)) as HTMLElement[];
  };

  const focusMenuItem = (key: string, index: number) => {
    const items = getMenuItems(key);
    if (!items || items.length === 0) return;
    const idx = Math.max(0, Math.min(index, items.length - 1));
    items[idx].focus();
  };

  return (
    <div style={sx.page}>
      <header style={sx.topbar} aria-hidden={mobileMenuOpen}>
        <div style={{ ...sx.wrap, ...(isMobile ? sx.wrapMobile : {}) }}>
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}
            aria-label="Bluecrew – bemanning til sjøs"
          >
            <Image 
              src="/icons/fulllogo.jpg" 
              alt="Bluecrew logo" 
              width={180} 
              height={50} 
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          <nav style={{ ...sx.nav, ...(isMobile ? { display: "none" } : {}) }} aria-label="Hovedmeny">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              const hasChildren = !!item.children?.length;
              const isOpen = openKey === item.key;

              if (!hasChildren) {
                if (item.accent) {
                  return (
                    <Link key={item.key} href={item.href} style={sx.btnContact}>
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    style={{ ...(item.accent ? { ...sx.navLink, ...sx.navLinkAccent } : sx.navLink), ...(isActive && !item.accent ? sx.navLinkActive : {}) }}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div 
                  key={item.key} 
                  style={sx.navItem} 
                  className="navItem"
                  onMouseEnter={() => { 
                    cancelClose(); 
                    setOpenKey(item.key); 
                  }} 
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    onFocus={() => { cancelClose(); setOpenKey(item.key); setFocusedKey(item.key); }}
                    onBlur={(event) => { setFocusedKey(null); handleBlur(item.key, event); }}
                    className={`navTriggerButton ${focusedKey === item.key ? "focusVisible" : ""}`}
                    style={isActive ? sx.navLinkActive : undefined}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" style={sx.navCaret}>▾</span>
                  </Link>

                  {/* Always render dropdown: CSS hover/focus shows it even if JS fails */}
                  <div 
                    style={sx.navDropdown}
                    className="navDropdown"
                    data-open={isOpen ? "true" : "false"}
                    aria-hidden={!isOpen}
                    onMouseEnter={cancelClose} 
                    onMouseLeave={scheduleClose}
                  >
                      <ul
                        id={`${item.key}-submenu`}
                        role="menu"
                        style={{ listStyle: "none", margin: 0, padding: 0 }}
                        aria-label={`${item.label} undermeny`}
                        onKeyDown={(e: KeyboardEvent<HTMLUListElement>) => {
                          const items = getMenuItems(item.key);
                          if (!items.length) return;
                          const idx = items.indexOf(document.activeElement as HTMLElement);
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            focusMenuItem(item.key, (idx + 1) % items.length);
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            focusMenuItem(item.key, (idx - 1 + items.length) % items.length);
                          } else if (e.key === "Home") {
                            e.preventDefault();
                            focusMenuItem(item.key, 0);
                          } else if (e.key === "End") {
                            e.preventDefault();
                            focusMenuItem(item.key, items.length - 1);
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            setOpenKey(null);
                            const trigger = document.querySelector(`[aria-controls='${item.key}-submenu']`) as HTMLElement | null;
                            trigger?.focus();
                          }
                        }}
                      >
                        <li>
                          <Link href={item.href} style={{ ...sx.navDropdownLink, fontWeight: 800 }} className="dropdownLink" role="menuitem" onClick={() => setOpenKey(null)} tabIndex={-1}>
                            {item.label}
                          </Link>
                        </li>
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} style={sx.navDropdownLink} className="dropdownLink" role="menuitem" onClick={() => setOpenKey(null)} tabIndex={-1}>
                              {child.label}
                              {child.description && <span style={sx.navDropdownDescription}>{child.description}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                  </div>
                </div>
              );
            })}
          </nav>          {/* Mobile menu trigger */}
          <div style={{ display: isMobile ? "block" : "none" }}>
            <button 
              type="button" 
              onClick={openMobileMenu} 
              aria-label="Åpne meny" 
              className="navTriggerButton"
              style={{
                padding: "12px 20px",
                minHeight: "44px",
                minWidth: "64px",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Meny
            </button>
          </div>

          {/* Mobile sheet (portal when available) */}
          {mobileMenuOpen && (
            canPortal && typeof document !== "undefined" ? createPortal(
              <div
                style={sx.mobileSheetOverlay}
                onClick={closeMobileMenu}
              >
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mobile-nav-title"
                  id="mobile-nav"
                  ref={mobileSheetRef}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  style={sx.mobileSheet}
                >
                  <div style={sx.mobileSheetHeader}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Image 
                        src="/icons/fulllogo.jpg" 
                        alt="Bluecrew logo" 
                        width={160} 
                        height={45} 
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <button type="button" onClick={closeMobileMenu} style={sx.mobileClose} aria-label="Lukk meny" ref={closeButtonRef}>
                      Lukk
                    </button>
                  </div>
                  <ul style={sx.mobileNav}>
                    {NAV_ITEMS.map((item) => {
                      const isActive = active === item.key;
                      const hasChildren = !!item.children?.length;
                      return (
                        <li key={item.key} style={sx.mobileNavItem}>
                          <Link
                            href={item.href}
                            style={{ ...sx.mobileNavLink, ...(item.accent ? sx.mobileNavLinkAccent : {}), ...(isActive ? sx.mobileNavLinkActive : {}) }}
                            className="mobileLink"
                            onClick={() => {
                              closeMobileMenu();
                            }}
                          >
                            {item.label}
                          </Link>
                          {hasChildren && (
                            <ul style={sx.mobileChildList}>
                              {item.children!.map((child) => (
                                <li key={child.href}>
                                  <Link href={child.href} style={sx.mobileChildLink} className="mobileLink" onClick={() => closeMobileMenu()}>
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>,
              document.body
            ) : (
              <div
                style={sx.mobileSheetOverlay}
                onClick={closeMobileMenu}
              >
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mobile-nav-title"
                  id="mobile-nav"
                  ref={mobileSheetRef}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  style={sx.mobileSheet}
                >
                  <div style={sx.mobileSheetHeader}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Image 
                        src="/icons/fulllogo.jpg" 
                        alt="Bluecrew logo" 
                        width={160} 
                        height={45} 
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <button type="button" onClick={closeMobileMenu} style={sx.mobileClose} aria-label="Lukk meny" ref={closeButtonRef}>
                      Lukk
                    </button>
                  </div>
                  <ul style={sx.mobileNav}>
                    {NAV_ITEMS.map((item) => (
                      <li key={item.key} style={sx.mobileNavItem}>
                        <Link href={item.href} style={{ ...sx.mobileNavLink, ...(item.accent ? sx.mobileNavLinkAccent : {}) }} className="mobileLink" onClick={() => closeMobileMenu()}>
                          {item.label}
                        </Link>
                        {item.children && (
                          <ul style={sx.mobileChildList}>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} style={sx.mobileChildLink} className="mobileLink" onClick={() => closeMobileMenu()}>
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </header>

      <main style={sx.main} aria-hidden={mobileMenuOpen}>
        {children}
      </main>

      <FloatingPhone />

      <footer style={sx.footer} aria-hidden={mobileMenuOpen}>
        <div style={sx.footerWrap}>
          <div style={isMobile ? sx.footerGridMobile : sx.footerGrid}>
            <div>
              <h2 style={sx.footerHeading}>Om oss</h2>
              <p style={sx.footerText}>
                Bluecrew AS leverer sertifisert mannskap til havbruk, fiskeri og spesialfartøy. Vi er sjøfolk som bygger team
                sammen med kundene våre.
              </p>
              <Link href="/om-oss" style={sx.footerLink}>
                Bli kjent med teamet vårt
              </Link>
            </div>
            <div>
              <h2 style={sx.footerHeading}>Karriereguider</h2>
              <ul style={sx.footerList}>
                <li style={sx.footerListItem}>
                  <Link href="/jobbsoker/guides" style={sx.footerLink}>
                    Maritime sertifikater
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/jobbsoker/guides/hvordan-bli-skipsforer" style={sx.footerLink}>
                    Hvordan bli skipsfører
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/jobbsoker/guides/hvordan-bli-matros" style={sx.footerLink}>
                    Hvordan bli matros
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/jobbsoker/guides/hvordan-bli-maskinoffiser" style={sx.footerLink}>
                    Hvordan bli maskinoffiser
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/jobbsoker/guides/lonnsguide-maritime-stillinger" style={sx.footerLink}>
                    Lønnsguide 2025
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 style={sx.footerHeading}>Kontakt</h2>
              <ul style={sx.footerList}>
                {CONTACT_POINTS.map((point) => (
                  <li key={point.label} style={sx.footerListItem}>
                    <span style={{ display: "block", fontSize: 12, opacity: 0.7, letterSpacing: "0.08em", textTransform: "uppercase" }}>
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
              <h2 style={sx.footerHeading}>Følg oss</h2>
              <div style={sx.footerSocials}>
                {SOCIAL_LINKS.map((social) => (
                  <Link key={social.href} href={social.href} style={sx.footerSocialLink} target="_blank" rel="noreferrer" aria-label={`${social.label} - ${social.description}`}>
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 style={sx.footerHeading}>Retningslinjer & adresse</h2>
              <ul style={sx.footerList}>
                <li style={sx.footerListItem}>
                  <Link href="/personvern" style={sx.footerLink}>
                    Personvern
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/vilkar" style={sx.footerLink}>
                    Vilkår
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/vilkar/bemanning" style={sx.footerLink}>
                    Arbeidsvilkår bemanning
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/cookies" style={sx.footerLink}>
                    Informasjonskapsler
                  </Link>
                </li>
              </ul>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 14, color: "rgba(226,232,240,0.7)", fontWeight: 700 }}>Adresse</div>
                <div style={{ fontSize: 15, color: "#e2e8f0", marginTop: 6 }}>Østenbekkveien 43, 9403 Harstad</div>
                <div style={{ fontSize: 13, color: "rgba(226,232,240,0.6)", marginTop: 6 }}>Org.nr: 936 321 194</div>
              </div>
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(34, 197, 94, 0.1)", borderRadius: 10, border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600, lineHeight: 1.4 }}>
                  Godkjent bemanningsforetak (AML-registrert)
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link href="/faq" style={{ ...sx.btnGhost, display: "inline-flex", alignItems: "center" }}>
              Vanlige spørsmål
            </Link>
          </div>

          <div style={sx.footerLegal}>
          © {new Date().getFullYear()} Bluecrew AS (Org.nr: 936463843). Alle rettigheter forbeholdt.
          <br />
          <Link href="/personvern" style={sx.footerLink}>
            Personvern
          </Link>{" "}
          og{" "}
          <Link href="/vilkar" style={sx.footerLink}>
            Vilkår
          </Link>
          .
          </div>

          <div
            style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid rgba(226,232,240,0.25)",
              textAlign: "center",
              color: "rgba(226,232,240,0.65)",
              fontSize: 14,
            }}
          >
            Nettsiden og IT-tjenesten er levert av{" "}
            <Link
              href="https://didriksson.no"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Didriksson Digital (åpnes i ny fane)"
              className="watermarkLink"
              style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}
            >
              Didriksson Digital
              <span aria-hidden="true" style={{ verticalAlign: "super", fontSize: 10, marginLeft: 2, opacity: 0.85 }}>
                ®
              </span>
              <span aria-hidden="true" className="watermarkLinkIcon">
                ↗
              </span>
              <span className="sr-only"> (åpnes i ny fane)</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
