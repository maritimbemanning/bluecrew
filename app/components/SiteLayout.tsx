"use client";

import Link from "next/link";
import {
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./SiteLayout.css";
import { createPortal } from "react-dom";
import { CONTACT_POINTS, SOCIAL_LINKS } from "../lib/constants";
import { sx } from "../lib/styles";
import { FloatingPhone } from "./FloatingPhone";
import { clearConsent } from "../lib/consent";

type NavChild = { href: string; label: string; description?: string };
type NavItem = {
  href: string;
  label: string;
  key: string;
  accent?: boolean;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/jobbsoker",
    label: "Finn jobb",
    key: "jobbsoker",
    children: [
      { href: "/jobbsoker/registrer", label: "Registrer deg" },
      { href: "/jobbsoker/oppdrag", label: "Ledige oppdrag" },
      { href: "/faq", label: "Vanlige spørsmål" },
    ],
  },
  {
    href: "/kunde",
    label: "For bedrifter",
    key: "kunde",
    children: [
      { href: "/kunde/registrer-behov", label: "Registrer behov" },
      { href: "/kunde/bemanning", label: "Bemanning" },
      { href: "/kunde/rekruttering", label: "Rekruttering" },
    ],
  },
  {
    href: "/karriere/guides",
    label: "Karriere",
    key: "karriere",
    children: [
      {
        href: "/karriere/guides/hvordan-bli-skipsforer",
        label: "Bli skipsfører",
      },
      { href: "/karriere/guides/hvordan-bli-matros", label: "Bli matros" },
      {
        href: "/karriere/guides/hvordan-bli-maskinoffiser",
        label: "Bli maskinoffiser",
      },
      { href: "/karriere/guides", label: "Sertifikatkrav" },
    ],
  },
  {
    href: "/lonn",
    label: "Lønn",
    key: "lonn",
    children: [
      {
        href: "/karriere/guides/lonnsguide-maritime-stillinger",
        label: "Lønnsguide",
      },
      { href: "/lonn/kalkulator", label: "Kalkulator" },
      { href: "/lonn/kaptein", label: "Kaptein" },
      { href: "/lonn/styrmann", label: "Styrmann" },
      { href: "/lonn/matros", label: "Matros" },
      { href: "/lonn/maskinoffiser", label: "Maskinoffiser" },
      { href: "/lonn/dekksoffiser", label: "Dekksoffiser" },
    ],
  },
  { href: "/om-oss", label: "Om oss", key: "om-oss" },
  { href: "/kontakt", label: "Kontakt", key: "kontakt" },
];

export function SiteLayout({
  children,
  active,
}: {
  children: ReactNode;
  active?: string;
}) {
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

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      sheet.querySelectorAll(focusableSelector)
    ) as HTMLElement[];
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
    }, 200);
  };

  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  const handleBlur = (key: string, event: FocusEvent<Element>) => {
    const next = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(next)) {
      cancelClose();
      setOpenKey((prev) => (prev === key ? null : prev));
    }
  };

  const handleOpenCookieSettings = useCallback(() => {
    try {
      // Clear consent and reload to show the banner again
      clearConsent();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch {
      // no-op
    }
  }, []);

  return (
    <div style={sx.page}>
      <header style={sx.topbar} aria-hidden={mobileMenuOpen}>
        <div style={{ ...sx.wrap, ...(isMobile ? sx.wrapMobile : {}) }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              textDecoration: "none",
              color: "inherit",
            }}
            aria-label="Bluecrew – bemanning til sjøs"
          >
            <div style={sx.brandMark}>
              <span style={sx.brandWordmark}>Bluecrew</span>
              <span style={sx.brandSlogan}>Bemanning til sjøs</span>
            </div>
          </Link>
          {/* Desktop navigation - med dropdowns */}
          <nav
            style={{
              ...sx.nav,
              gap: 24,
              ...(isMobile ? { display: "none" } : {}),
            }}
            aria-label="Hovedmeny"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              const hasChildren = !!item.children?.length;
              const isOpen = openKey === item.key;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="navLink"
                    style={{
                      ...sx.navLink,
                      ...(isActive ? sx.navLinkActive : {}),
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
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenKey(item.key);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-controls={`${item.key}-submenu`}
                    onClick={() =>
                      setOpenKey((prev) =>
                        prev === item.key ? null : item.key
                      )
                    }
                    onFocus={() => {
                      cancelClose();
                      setOpenKey(item.key);
                      setFocusedKey(item.key);
                    }}
                    onBlur={(event) => {
                      setFocusedKey(null);
                      handleBlur(item.key, event);
                    }}
                    className={`navTriggerButton ${focusedKey === item.key ? "focusVisible" : ""}`}
                    style={{ ...(isActive ? sx.navLinkActive : undefined) }}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" style={sx.navCaret}>
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={sx.navDropdown}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <ul
                        id={`${item.key}-submenu`}
                        role="menu"
                        style={{ listStyle: "none", margin: 0, padding: 0 }}
                        aria-label={`${item.label} undermeny`}
                      >
                        <li>
                          <Link
                            href={item.href}
                            style={{ ...sx.navDropdownLink, fontWeight: 800 }}
                            className="dropdownLink"
                            role="menuitem"
                            onClick={() => setOpenKey(null)}
                            tabIndex={-1}
                          >
                            {item.label}
                          </Link>
                        </li>
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              style={sx.navDropdownLink}
                              className="dropdownLink"
                              role="menuitem"
                              onClick={() => setOpenKey(null)}
                              tabIndex={-1}
                            >
                              {child.label}
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

          {/* Desktop-only right cluster: Registrer deg + Vipps */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link
                href="/meld-interesse"
                style={{
                  padding: "10px 24px",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#fff",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onClick={() => {
                  const plausible = (
                    window as typeof window & {
                      plausible?: (
                        e: string,
                        o?: { props?: Record<string, unknown> }
                      ) => void;
                    }
                  ).plausible;
                  if (typeof plausible === "function") {
                    plausible("CTA Click", {
                      props: { location: "header", cta: "Registrer deg" },
                    });
                  }
                }}
              >
                Registrer deg
              </Link>
              <Link
                href="/api/vipps/start"
                style={{
                  padding: "10px 16px",
                  background: "#FF5B24",
                  color: "#fff",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 12px rgba(255, 91, 36, 0.3)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                title="Verifiser med Vipps"
              >
                <img
                  src="/icons/vipps-logo.jpeg"
                  alt="Vipps"
                  width="20"
                  height="20"
                  style={{ borderRadius: 4 }}
                />
                Vipps
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <div style={{ display: isMobile ? "block" : "none" }}>
            <button
              type="button"
              onClick={openMobileMenu}
              aria-label="Åpne meny"
              aria-controls="mobile-nav"
              aria-expanded={mobileMenuOpen}
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
          {mobileMenuOpen &&
            (canPortal && typeof document !== "undefined" ? (
              createPortal(
                <div style={sx.mobileSheetOverlay} onClick={closeMobileMenu}>
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div style={sx.brandMarkMobile}>
                          <span
                            style={sx.brandWordmarkMobile}
                            id="mobile-nav-title"
                          >
                            Bluecrew
                          </span>
                          <span style={sx.brandSloganMobile}>
                            Bemanning til sjøs
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={closeMobileMenu}
                        style={sx.mobileClose}
                        aria-label="Lukk meny"
                        ref={closeButtonRef}
                      >
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
                              style={{
                                ...sx.mobileNavLink,
                                ...(isActive ? sx.mobileNavLinkActive : {}),
                              }}
                              className="mobileLink"
                              onClick={() => closeMobileMenu()}
                            >
                              {item.label}
                            </Link>
                            {hasChildren && (
                              <ul style={sx.mobileChildList}>
                                {item.children!.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      style={sx.mobileChildLink}
                                      className="mobileLink"
                                      onClick={() => closeMobileMenu()}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                      <li style={{ ...sx.mobileNavItem, marginTop: 16 }}>
                        <Link
                          href="/meld-interesse"
                          style={{
                            ...sx.mobileNavLink,
                            background:
                              "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            padding: "14px 20px",
                            borderRadius: 12,
                            textAlign: "center",
                          }}
                          className="mobileLink"
                          onClick={() => closeMobileMenu()}
                        >
                          Registrer deg
                        </Link>
                      </li>
                      <li style={{ ...sx.mobileNavItem, marginTop: 8 }}>
                        <Link
                          href="/api/vipps/start"
                          style={{
                            ...sx.mobileNavLink,
                            background: "#FF5B24",
                            color: "#fff",
                            fontWeight: 700,
                            padding: "14px 20px",
                            borderRadius: 12,
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                          }}
                          className="mobileLink"
                          onClick={() => closeMobileMenu()}
                        >
                          <img
                            src="/icons/vipps-logo.jpeg"
                            alt="Vipps"
                            width="24"
                            height="24"
                            style={{ borderRadius: 4 }}
                          />
                          Verifiser med Vipps
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>,
                document.body
              )
            ) : (
              <div style={sx.mobileSheetOverlay} onClick={closeMobileMenu}>
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
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div style={sx.brandMarkMobile}>
                        <span
                          style={sx.brandWordmarkMobile}
                          id="mobile-nav-title"
                        >
                          Bluecrew
                        </span>
                        <span style={sx.brandSloganMobile}>
                          Bemanning til sjøs
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={closeMobileMenu}
                      style={sx.mobileClose}
                      aria-label="Lukk meny"
                      ref={closeButtonRef}
                    >
                      Lukk
                    </button>
                  </div>
                  <ul style={sx.mobileNav}>
                    {NAV_ITEMS.map((item) => (
                      <li key={item.key} style={sx.mobileNavItem}>
                        <Link
                          href={item.href}
                          style={sx.mobileNavLink}
                          className="mobileLink"
                          onClick={() => closeMobileMenu()}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <ul style={sx.mobileChildList}>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  style={sx.mobileChildLink}
                                  className="mobileLink"
                                  onClick={() => closeMobileMenu()}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                    <li style={{ ...sx.mobileNavItem, marginTop: 16 }}>
                      <Link
                        href="/meld-interesse"
                        style={{
                          ...sx.mobileNavLink,
                          background:
                            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "#fff",
                          fontWeight: 700,
                          padding: "14px 20px",
                          borderRadius: 12,
                          textAlign: "center",
                        }}
                        className="mobileLink"
                        onClick={() => closeMobileMenu()}
                      >
                        Registrer deg
                      </Link>
                    </li>
                    <li style={{ ...sx.mobileNavItem, marginTop: 8 }}>
                      <Link
                        href="/api/vipps/start"
                        style={{
                          ...sx.mobileNavLink,
                          background: "#FF5B24",
                          color: "#fff",
                          fontWeight: 700,
                          padding: "14px 20px",
                          borderRadius: 12,
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                        className="mobileLink"
                        onClick={() => closeMobileMenu()}
                      >
                        <img
                          src="/icons/vipps-logo.jpeg"
                          alt="Vipps"
                          width="24"
                          height="24"
                          style={{ borderRadius: 4 }}
                        />
                        Verifiser med Vipps
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
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
                Bluecrew AS leverer sertifisert mannskap til havbruk, fiskeri og
                spesialfartøy. Vi er sjøfolk som bygger team sammen med kundene
                våre.
              </p>
              <Link href="/om-oss" style={sx.footerLink}>
                Bli kjent med teamet vårt
              </Link>
            </div>
            <div>
              <h2 style={sx.footerHeading}>Karriereguider</h2>
              <ul style={sx.footerList}>
                <li style={sx.footerListItem}>
                  <Link href="/karriere/guides" style={sx.footerLink}>
                    Maritime sertifikater
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link
                    href="/karriere/guides/hvordan-bli-skipsforer"
                    style={sx.footerLink}
                  >
                    Hvordan bli skipsfører
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link
                    href="/karriere/guides/hvordan-bli-matros"
                    style={sx.footerLink}
                  >
                    Hvordan bli matros
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link
                    href="/karriere/guides/hvordan-bli-maskinoffiser"
                    style={sx.footerLink}
                  >
                    Hvordan bli maskinoffiser
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link
                    href="/karriere/guides/lonnsguide-maritime-stillinger"
                    style={sx.footerLink}
                  >
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
                    <span
                      style={{
                        display: "block",
                        fontSize: 12,
                        opacity: 0.7,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                      }}
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
              <h2 style={sx.footerHeading}>Følg oss</h2>
              <div style={sx.footerSocials}>
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    style={sx.footerSocialLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} – ${social.description}`}
                  >
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 style={sx.footerHeading}>Retningslinjer & adresse</h2>
              <ul style={sx.footerList}>
                <li style={sx.footerListItem}>
                  <Link href="/api/vipps/start" style={sx.footerLink}>
                    Verifiser med Vipps
                  </Link>
                </li>
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
                <li style={sx.footerListItem}>
                  <button
                    type="button"
                    onClick={handleOpenCookieSettings}
                    style={{
                      ...sx.footerLink,
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                    aria-label="Åpne cookie-innstillinger"
                  >
                    Cookie-innstillinger
                  </button>
                </li>
              </ul>
              <div style={{ marginTop: 12 }}>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(226,232,240,0.7)",
                    fontWeight: 700,
                  }}
                >
                  Adresse
                </div>
                <div style={{ fontSize: 15, color: "#e2e8f0", marginTop: 6 }}>
                  Ervikveien 110, 9402 Harstad
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(226,232,240,0.6)",
                    marginTop: 6,
                  }}
                >
                  Org.nr: 936 321 194
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link
              href="/faq"
              style={{
                ...sx.btnGhost,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Vanlige spørsmål
            </Link>
          </div>

          <div style={sx.footerLegal}>
            © {new Date().getFullYear()} Bluecrew AS – Effektiv bemanning til
            sjøs. Vi følger GDPR, norsk personopplysningslov og veiledning fra
            Datatilsynet i all behandling av kandidatdata.
          </div>
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid rgba(226,232,240,0.15)",
              textAlign: "center",
              fontSize: 13,
              color: "rgba(226,232,240,0.7)",
            }}
          >
            Nettside levert av{" "}
            <a
              href="https://didriksson.no"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(226,232,240,0.9)",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(226,232,240,0.9)")
              }
            >
              Didriksson Digital
            </a>{" "}
            — Programvareutvikling og raske nettsider
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
