import { createRemoteJWKSet } from "jose";

type OpenIdConfig = {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
  jwks_uri: string;
};

declare global {
  
  var __vippsOpenIdConfigCache__: { value: OpenIdConfig; fetchedAt: number } | undefined;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function getVippsOpenIdConfig(): Promise<OpenIdConfig> {
  const base = process.env.VIPPS_API_BASE_URL;
  if (!base) throw new Error("VIPPS_API_BASE_URL missing");

  const url = `${base}/access-management-1.0/access/.well-known/openid-configuration`;

  const now = Date.now();
  if (
    global.__vippsOpenIdConfigCache__ &&
    now - global.__vippsOpenIdConfigCache__.fetchedAt < CACHE_TTL_MS
  ) {
    return global.__vippsOpenIdConfigCache__.value;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch Vipps OIDC config: ${res.status}`);
  }
  const json = (await res.json()) as OpenIdConfig;

  // Minimal validation
  if (!json.issuer || !json.authorization_endpoint || !json.token_endpoint || !json.jwks_uri) {
    throw new Error("Invalid Vipps OIDC config");
  }

  global.__vippsOpenIdConfigCache__ = { value: json, fetchedAt: now };
  return json;
}

export async function getVippsJWKS() {
  const cfg = await getVippsOpenIdConfig();
  return createRemoteJWKSet(new URL(cfg.jwks_uri));
}
