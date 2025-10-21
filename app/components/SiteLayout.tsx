"use client";

import Link from "next/link";
import { FocusEvent, PointerEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONTACT_POINTS, SOCIAL_LINKS } from "../lib/constants";
import { sx } from "../lib/styles";

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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const shouldIgnoreOverlay = useRef(false);
  const [canPortal, setCanPortal] = useState(false);

  const openMobileMenu = useCallback(() => {
    shouldIgnoreOverlay.current = true;
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    shouldIgnoreOverlay.current = false;
    setMobileMenuOpen(false);
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

  const handleBlur = (key: string) => (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(next)) {
      cancelClose();
      setOpenKey((prev) => (prev === key ? null : prev));
    }
  };

  return (
    <div style={sx.page}>
      <header style={sx.topbar}>
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
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenKey(item.key);
                  }}
                  onMouseLeave={scheduleClose}
                  onFocus={() => {
                    cancelClose();
                    setOpenKey(item.key);
                  }}
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
                    <div style={sx.navDropdown} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
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
          {isMobile && (
            <>
              <button
                type="button"
                onClick={openMobileMenu}
                onPointerDown={() => {
                  shouldIgnoreOverlay.current = true;
                }}
                style={sx.mobileToggle}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                Meny
              </button>
              {mobileMenuOpen && (() => {
                const menu = (
                  <div
                    style={sx.mobileOverlay}
                    role="presentation"
                    onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                      if (event.target === event.currentTarget) {
                        if (shouldIgnoreOverlay.current) {
                          shouldIgnoreOverlay.current = false;
                          return;
                        }
                        closeMobileMenu();
                      }
                    }}
                  >
                    <div
                      style={sx.mobileSheet}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="mobile-nav-title"
                      id="mobile-nav"
                      onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                      }}
                    >
                      <div style={sx.mobileSheetHeader}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={sx.brandMarkMobile}>
                            <span style={sx.brandWordmarkMobile} id="mobile-nav-title">
                              Bluecrew
                            </span>
                            <span style={sx.brandSloganMobile}>Bemanning til sjøs</span>
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
                                  ...(item.accent ? sx.mobileNavLinkAccent : {}),
                                  ...(isActive ? sx.mobileNavLinkActive : {}),
                                }}
                                onClick={closeMobileMenu}
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
                                        onClick={closeMobileMenu}
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
                      </ul>
                    </div>
                  </div>
                );

                return canPortal && typeof document !== "undefined"
                  ? createPortal(menu, document.body)
                  : menu;
              })()}
            </>
          )}
        </div>
      </header>
      <main style={sx.main}>{children}</main>

      <footer style={sx.footer}>
        <div style={sx.footerWrap}>
          <div style={sx.footerGrid}>
            <div>
              <div style={sx.footerHeading}>Om oss</div>
              <p style={sx.footerText}>
                Bluecrew AS leverer sertifisert mannskap til havbruk, fiskeri og spesialfartøy. Vi er sjøfolk som bygger team
                sammen med kundene våre.
              </p>
              <Link href="/om-oss" style={sx.footerLink}>
                Bli kjent med teamet vårt
              </Link>
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
              <div style={sx.footerHeading}>Følg oss</div>
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
                    <span aria-hidden="true" style={sx.footerSocialIcon}>
                      in
                    </span>
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div style={sx.footerHeading}>Retningslinjer</div>
              <ul style={sx.footerList}>
                <li style={sx.footerListItem}>
                  <Link href="/personvern" style={sx.footerLink}>
                    Personvern og GDPR
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/vilkar" style={sx.footerLink}>
                    Vilkår for kandidater
                  </Link>
                </li>
                <li style={sx.footerListItem}>
                  <Link href="/cookies" style={sx.footerLink}>
                    Informasjonskapsler
                  </Link>
                </li>
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
          <div style={sx.footerLegal}>
            © {new Date().getFullYear()} Bluecrew AS – Effektiv bemanning til sjøs. Vi følger GDPR, norsk personopplysningslov
            og veiledning fra Datatilsynet i all behandling av kandidatdata.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
