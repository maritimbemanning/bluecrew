export const CONSENT_COOKIE = "bc_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 dager

export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export function getConsent(): ConsentPrefs | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie.split(";").find((c) => c.trim().startsWith(`${CONSENT_COOKIE}=`));
  if (!cookie) return null;
  try {
    const val = decodeURIComponent(cookie.split("=")[1] || "");
    return JSON.parse(val) as ConsentPrefs;
  } catch {
    return null;
  }
}

function buildCookieAttributes() {
  const attrs = ["Path=/", "SameSite=Lax"];
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    attrs.push("Secure");
  }
  return attrs;
}

export function setConsent(prefs: ConsentPrefs) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(prefs));
  const attrs = buildCookieAttributes();
  attrs.push(`Max-Age=${COOKIE_MAX_AGE}`);
  document.cookie = `${CONSENT_COOKIE}=${value}; ${attrs.join("; ")}`;
}

export function clearConsent() {
  if (typeof document === "undefined") return;
  const attrs = buildCookieAttributes();
  attrs.push("Max-Age=0");
  attrs.push("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  document.cookie = `${CONSENT_COOKIE}=; ${attrs.join("; ")}`;
}
