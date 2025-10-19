"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sx } from "../lib/styles";

const COOKIE_NAME = "bc_cookie_consent";
const COOKIE_VALUE = "accepted";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 dager

function hasConsent() {
  if (typeof document === "undefined") return true;
  return document.cookie.split(";").some((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`));
}

function storeConsent() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div style={sx.cookieBanner} role="dialog" aria-live="polite" aria-label="Informasjon om informasjonskapsler">
      <div style={sx.cookieText}>
        Vi bruker informasjonskapsler som er nødvendige for drift av nettsiden. Vi lagrer ingen markedsføringsscript før du gir
        samtykke. Les mer i {" "}
        <Link href="/personvern" style={sx.cookieLink}>
          personvernerklæringen
        </Link>
        .
      </div>
      <div style={sx.cookieActions}>
        <button
          type="button"
          style={sx.cookieButtonSecondary}
          onClick={() => {
            setVisible(false);
          }}
        >
          Kun nødvendige
        </button>
        <button
          type="button"
          style={sx.cookieButton}
          onClick={() => {
            storeConsent();
            setVisible(false);
          }}
        >
          Godta alle
        </button>
      </div>
    </div>
  );
}
