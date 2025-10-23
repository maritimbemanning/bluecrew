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
    <div className="site-layout">
      <header className="site-layout__topbar">
        <div className={`site-layout__wrap${isMobile ? " site-layout__wrap--mobile" : ""}`}>
          <Link href="/" className="site-layout__brandLink" aria-label="Bluecrew – bemanning til sjøs">
            <div className="site-layout__brand">
              <span className="site-layout__brandWordmark">Bluecrew</span>
              <span className="site-layout__brandSlogan">Bemanning til sjøs</span>
            </div>
          </Link>
          <nav className={isMobile ? "site-nav site-nav--hidden" : "site-nav"} aria-label="Hovedmeny">
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
                className="site-layout__mobileToggle"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                Meny
              </button>
              {mobileMenuOpen && (() => {
                const menu = (
                  <div
                    className="site-layout__mobileOverlay"
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
                      className="site-layout__mobileSheet"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="mobile-nav-title"
                      id="mobile-nav"
                      onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                      }}
                    >
                      <div className="site-layout__mobileSheetHeader">
                        <div className="site-layout__mobileRow">
                          <div className="site-layout__brand site-layout__brand--compact">
                            <span className="site-layout__brandWordmark" id="mobile-nav-title">
                              Bluecrew
                            </span>
                            <span className="site-layout__brandSlogan">Bemanning til sjøs</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={closeMobileMenu}
                          className="site-layout__mobileClose"
                          aria-label="Lukk meny"
                          ref={closeButtonRef}
                        >
                          Lukk
                        </button>
                      </div>
                      <ul className="site-layout__mobileNav">
                        {NAV_ITEMS.map((item) => {
                          const isActive = active === item.key;
                          const hasChildren = !!item.children?.length;

                          return (
                            <li key={item.key} className="site-layout__mobileNavItem">
                              <Link
                                href={item.href}
                                className={[
                                  "site-layout__mobileNavLink",
                                  item.accent ? "site-layout__mobileNavLink--accent" : null,
                                  isActive ? "site-layout__mobileNavLink--active" : null,
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                onClick={closeMobileMenu}
                              >
                                {item.label}
                              </Link>
                              {hasChildren && (
                                <ul className="site-layout__mobileChildList">
                                  {item.children!.map((child) => (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        className="site-layout__mobileChildLink"
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
      <main className="site-layout__main">{children}</main>

      <footer className="site-layout__footer">
        <div className="site-layout__footerWrap">
          <div className="site-layout__footerGrid">
            <div className="site-layout__footerColumn">
              <div className="site-layout__footerHeading">Bluecrew</div>
              <p className="site-layout__footerText">
                Sertifisert maritim bemanning til havbruk, fiskeri og servicefartøy. Vi setter sammen erfarne team som løser
                kritiske oppgaver på sjøen.
              </p>
              <Link href="/om-oss" className="footer-link">
                Møt teamet vårt
              </Link>
            </div>
            <div className="site-layout__footerColumn">
              <div className="site-layout__footerHeading">Kontakt oss</div>
              <ul className="site-layout__footerList">
                {CONTACT_POINTS.map((point) => (
                  <li key={point.label} className="site-layout__footerListItem">
                    <span className="site-layout__footerListLabel">{point.label}</span>
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
            <div className="site-layout__footerColumn">
              <div className="site-layout__footerHeading">Snarveier</div>
              <ul className="site-layout__footerListStack">
                <li>
                  <ul className="site-layout__footerList">
                    <li className="site-layout__footerListItem">
                      <Link href="/jobbsoker" className="footer-link">
                        Jobbsøker
                      </Link>
                    </li>
                    <li className="site-layout__footerListItem">
                      <Link href="/kunde" className="footer-link">
                        Kunde
                      </Link>
                    </li>
                    <li className="site-layout__footerListItem">
                      <Link href="/faq" className="footer-link">
                        Vanlige spørsmål
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="site-layout__footerSubheading">Retningslinjer</div>
                  <ul className="site-layout__footerList">
                    <li className="site-layout__footerListItem">
                      <Link href="/personvern" className="footer-link">
                        Personvern og GDPR
                      </Link>
                    </li>
                    <li className="site-layout__footerListItem">
                      <Link href="/vilkar" className="footer-link">
                        Vilkår for kandidater
                      </Link>
                    </li>
                    <li className="site-layout__footerListItem">
                      <Link href="/cookies" className="footer-link">
                        Informasjonskapsler
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="site-layout__footerColumn">
              <div className="site-layout__footerHeading">Følg oss</div>
              <div className="site-layout__footerSocials">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    className="footer-link footer-link--social"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} – ${social.description}`}
                  >
                    <span aria-hidden="true" className="site-layout__footerSocialIcon">
                      in
                    </span>
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
              <div className="site-layout__footerMeta">
                Østenbekkveien 43
                <br />9403 Harstad
                <br />Org.nr: 936 321 194
              </div>
            </div>
          </div>
          <div className="site-layout__footerCta">
            <Link href="/faq" className="cta-button cta-button--ghost">
              Vanlige spørsmål
            </Link>
          </div>
          <div className="site-layout__footerLegal">
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
