"use client";

import Link from "next/link";
import {
  PointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CONTACT_POINTS, SOCIAL_LINKS } from "../lib/constants";
import { sx } from "../lib/styles";
import "./site-layout.css";

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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <nav
            className="site-nav"
            style={isMobile ? { display: "none" } : undefined}
            aria-label="Hovedmeny"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;

              if (!item.children?.length) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={[
                      item.accent ? "cta-button cta-button--secondary site-nav__cta" : "site-nav__link",
                      !item.accent && isActive ? "site-nav__link--active" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              }

              return <NavDropdown key={item.key} item={item} isActive={isActive} />;
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
            <div style={sx.footerColumn}>
              <div style={sx.footerHeading}>Bluecrew</div>
              <p style={sx.footerText}>
                Sertifisert maritim bemanning til havbruk, fiskeri og servicefartøy. Vi setter sammen erfarne team som løser
                kritiske oppgaver på sjøen.
              </p>
              <Link href="/om-oss" className="footer-link">
                Møt teamet vårt
              </Link>
            </div>
            <div style={sx.footerColumn}>
              <div style={sx.footerHeading}>Kontakt oss</div>
              <ul style={sx.footerList}>
                {CONTACT_POINTS.map((point) => (
                  <li key={point.label} style={sx.footerListItem}>
                    <span style={sx.footerListLabel}>{point.label}</span>
                    {point.href ? (
                      <Link href={point.href} className="footer-link">
                        {point.value}
                      </Link>
                    ) : (
                      <span>{point.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div style={sx.footerColumn}>
              <div style={sx.footerHeading}>Snarveier</div>
              <ul style={sx.footerListStack}>
                <li>
                  <ul style={sx.footerList}>
                    <li style={sx.footerListItem}>
                      <Link href="/jobbsoker" className="footer-link">
                        Jobbsøker
                      </Link>
                    </li>
                    <li style={sx.footerListItem}>
                      <Link href="/kunde" className="footer-link">
                        Kunde
                      </Link>
                    </li>
                    <li style={sx.footerListItem}>
                      <Link href="/faq" className="footer-link">
                        Vanlige spørsmål
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <div style={sx.footerSubheading}>Retningslinjer</div>
                  <ul style={sx.footerList}>
                    <li style={sx.footerListItem}>
                      <Link href="/personvern" className="footer-link">
                        Personvern og GDPR
                      </Link>
                    </li>
                    <li style={sx.footerListItem}>
                      <Link href="/vilkar" className="footer-link">
                        Vilkår for kandidater
                      </Link>
                    </li>
                    <li style={sx.footerListItem}>
                      <Link href="/cookies" className="footer-link">
                        Informasjonskapsler
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div style={sx.footerColumn}>
              <div style={sx.footerHeading}>Følg oss</div>
              <div style={sx.footerSocials}>
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    className="footer-link footer-link--social"
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
              <div style={sx.footerMeta}>
                Østenbekkveien 43
                <br />9403 Harstad
                <br />Org.nr: 936 321 194
              </div>
            </div>
          </div>
          <div style={sx.footerCta}>
            <Link href="/faq" className="cta-button cta-button--ghost">
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

type NavDropdownProps = {
  item: NavItem;
  isActive: boolean;
};

function NavDropdown({ item, isActive }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonId = useId();
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  const menuItems: NavChild[] = [
    { href: item.href, label: `Gå til ${item.label}` },
    ...(item.children ?? []),
  ];

  return (
    <div className={`site-nav__menu${open ? " site-nav__menu--open" : ""}`}>
      <button
        type="button"
        ref={buttonRef}
        className={["site-nav__trigger", isActive ? "site-nav__link--active" : null].filter(Boolean).join(" ")}
        aria-expanded={open}
        aria-controls={menuId}
        id={buttonId}
        onClick={handleToggle}
      >
        {item.label}
        <span aria-hidden="true" className="site-nav__caret">
          ▾
        </span>
      </button>
      {open && (
        <div
          ref={menuRef}
          className="site-nav__dropdown"
          role="menu"
          aria-labelledby={buttonId}
          id={menuId}
        >
          {menuItems.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="site-nav__dropdownLink"
              role="menuitem"
              onClick={handleLinkClick}
            >
              <span className="site-nav__dropdownLabel">{child.label}</span>
              {child.description && <span className="site-nav__dropdownDescription">{child.description}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
