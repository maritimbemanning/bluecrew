"use client";

import Link from "next/link";
import { FocusEvent, PointerEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
  { href: "/jobbsoker/guides", label: "Karriere", key: "karriere" },
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

export function SiteLayout({ children, active, title }: { children: ReactNode; active?: string; title?: string }) {
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

    const handleKeyDown = (event: KeyboardEvent) => {
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

    const handleKeyDown = (event: KeyboardEvent) => {
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
    }, 200);
  };

  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  const handleBlur = (key: string) => (event: FocusEvent<HTMLElement>) => {
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
            <div style={sx.brandMark}>
              <span style={sx.brandWordmark}>Bluecrew</span>
              <span style={sx.brandSlogan}>Bemanning til sjøs</span>
            </div>
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
                <div key={item.key} style={sx.navItem} onMouseEnter={() => { cancelClose(); setOpenKey(item.key); }} onMouseLeave={scheduleClose}>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-controls={`${item.key}-submenu`}
                    onClick={() => setOpenKey((prev) => (prev === item.key ? null : item.key))}
                    onKeyDown={(e: any) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpenKey(item.key);
                        setTimeout(() => focusMenuItem(item.key, 0), 0);
                      }
                    }}
                    onFocus={() => { cancelClose(); setOpenKey(item.key); setFocusedKey(item.key); }}
                    onBlur={(e) => { setFocusedKey(null); handleBlur(item.key)(e as any); }}
                    className={`navTriggerButton ${focusedKey === item.key ? "focusVisible" : ""}`}
                    style={isActive ? sx.navLinkActive : undefined}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" style={sx.navCaret}>▾</span>
                  </button>

                  {isOpen && (
                    <div style={sx.navDropdown} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                        <ul
                          id={`${item.key}-submenu`}
                          role="menu"
                          style={{ listStyle: "none", margin: 0, padding: 0 }}
                          aria-label={`${item.label} undermeny`}
                          onKeyDown={(e: any) => {
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
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
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
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-nav-title"
                id="mobile-nav"
                ref={mobileSheetRef}
                onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                  event.stopPropagation();
                }}
                style={sx.mobileSheetOverlay}
              >
                <div style={sx.mobileSheetHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={sx.brandMarkMobile}>
                      <span style={sx.brandWordmarkMobile} id="mobile-nav-title">Bluecrew</span>
                      <span style={sx.brandSloganMobile}>Bemanning til sjøs</span>
                    </div>
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
              </div>,
              document.body
            ) : (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-nav-title"
                id="mobile-nav"
                ref={mobileSheetRef}
                onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                  event.stopPropagation();
                }}
                style={sx.mobileSheetOverlay}
              >
                <div style={sx.mobileSheetHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={sx.brandMarkMobile}>
                      <span style={sx.brandWordmarkMobile} id="mobile-nav-title">Bluecrew</span>
                      <span style={sx.brandSloganMobile}>Bemanning til sjøs</span>
                    </div>
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
              <h2 style={sx.footerHeading}>Følg oss</h2>
              <div style={sx.footerSocials}>
                {SOCIAL_LINKS.map((social) => (
                  <Link key={social.href} href={social.href} style={sx.footerSocialLink} target="_blank" rel="noreferrer" aria-label={`${social.label} – ${social.description}`}>
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
            </div>
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link href="/faq" style={{ ...sx.btnGhost, display: "inline-flex", alignItems: "center" }}>
              Vanlige spørsmål
            </Link>
          </div>

          {/* Newsletter signup - REMOVED for GDPR compliance */}
          {/* TODO: Implement proper newsletter with explicit consent checkbox, 
              privacy policy link, and backend storage before enabling */}

          <div style={sx.footerLegal}>
            © {new Date().getFullYear()} Bluecrew AS – Effektiv bemanning til sjøs. Vi følger GDPR, norsk personopplysningslov og veiledning fra Datatilsynet i all behandling av kandidatdata.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
