"use client";

import Link from "next/link";
import { FocusEvent, PointerEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONTACT_POINTS, SOCIAL_LINKS } from "../lib/constants";
import buttons from "../styles/buttons.module.css";
import styles from "./SiteLayout.module.css";

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
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={`${styles.wrap} ${isMobile ? styles.wrapMobile : ""}`}>
          <Link href="/" className={styles.brandLink} aria-label="Bluecrew – bemanning til sjøs">
            <div className={styles.brandMark}>
              <span className={styles.brandWordmark}>Bluecrew</span>
              <span className={styles.brandSlogan}>Bemanning til sjøs</span>
            </div>
          </Link>
          <nav
            className={`${styles.nav} ${isMobile ? styles.navHidden : ""}`}
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
                    className={`${item.accent ? `${styles.navLink} ${styles.navLinkAccent}` : styles.navLink} ${
                      isActive && !item.accent ? styles.navLinkActive : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.key}
                  className={styles.navItem}
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
                    className={`${styles.navTrigger} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    {item.label}
                    <span aria-hidden="true" className={styles.navCaret}>
                      ▾
                    </span>
                  </Link>
                  {isOpen && (
                    <div
                      className={styles.navDropdown}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children!.map((child) => (
                        <Link key={child.href} href={child.href} className={styles.navDropdownLink}>
                          {child.label}
                          {child.description && (
                            <span className={styles.navDropdownDescription}>{child.description}</span>
                          )}
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
                className={styles.mobileToggle}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                Meny
              </button>
              {mobileMenuOpen && (() => {
                const menu = (
                  <div
                    className={styles.mobileOverlay}
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
                      className={styles.mobileSheet}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="mobile-nav-title"
                      id="mobile-nav"
                      onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                      }}
                    >
                      <div className={styles.mobileSheetHeader}>
                        <div className={styles.mobileBrandRow}>
                          <div className={styles.brandMarkMobile}>
                            <span className={styles.brandWordmarkMobile} id="mobile-nav-title">
                              Bluecrew
                            </span>
                            <span className={styles.brandSloganMobile}>Bemanning til sjøs</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={closeMobileMenu}
                          className={styles.mobileClose}
                          aria-label="Lukk meny"
                          ref={closeButtonRef}
                        >
                          Lukk
                        </button>
                      </div>
                      <ul className={styles.mobileNav}>
                        {NAV_ITEMS.map((item) => {
                          const isActive = active === item.key;
                          const hasChildren = !!item.children?.length;

                          return (
                            <li key={item.key} className={styles.mobileNavItem}>
                              <Link
                                href={item.href}
                                className={`${styles.mobileNavLink} ${item.accent ? styles.mobileNavLinkAccent : ""} ${
                                  isActive ? styles.mobileNavLinkActive : ""
                                }`}
                                onClick={closeMobileMenu}
                              >
                                {item.label}
                              </Link>
                              {hasChildren && (
                                <ul className={styles.mobileChildList}>
                                  {item.children!.map((child) => (
                                    <li key={child.href}>
                                      <Link href={child.href} className={styles.mobileChildLink} onClick={closeMobileMenu}>
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
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerWrap}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerHeading}>Om oss</div>
              <p className={styles.footerText}>
                Bluecrew AS leverer sertifisert mannskap til havbruk, fiskeri og spesialfartøy. Vi er sjøfolk som bygger team
                sammen med kundene våre.
              </p>
              <Link href="/om-oss" className={styles.footerLink}>
                Bli kjent med teamet vårt
              </Link>
            </div>
            <div>
              <div className={styles.footerHeading}>Kontakt</div>
              <ul className={styles.footerList}>
                {CONTACT_POINTS.map((point) => (
                  <li key={point.label} className={styles.footerListItem}>
                    <span className={styles.footerLabel}>
                      {point.label}
                    </span>
                    {point.href ? (
                      <Link href={point.href} className={styles.footerLink}>
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
              <div className={styles.footerHeading}>Følg oss</div>
              <div className={styles.footerSocials}>
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    className={styles.footerSocialLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} – ${social.description}`}
                  >
                    <span aria-hidden="true" className={styles.footerSocialIcon}>
                      in
                    </span>
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.footerHeading}>Retningslinjer</div>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <Link href="/personvern" className={styles.footerLink}>
                    Personvern og GDPR
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link href="/vilkar" className={styles.footerLink}>
                    Vilkår for kandidater
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link href="/cookies" className={styles.footerLink}>
                    Informasjonskapsler
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className={styles.footerHeading}>Adresse</div>
              <p className={styles.footerText}>
                Østenbekkveien 43
                <br />9403 Harstad
              </p>
              <p className={styles.footerText}>Org.nr: 936 321 194</p>
            </div>
          </div>
          <div className={styles.footerCta}>
            <Link href="/faq" className={buttons.btnGhost}>
              Vanlige spørsmål
            </Link>
          </div>
          <div className={styles.footerLegal}>
            © {new Date().getFullYear()} Bluecrew AS – Effektiv bemanning til sjøs. Vi følger GDPR, norsk personopplysningslov
            og veiledning fra Datatilsynet i all behandling av kandidatdata.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
