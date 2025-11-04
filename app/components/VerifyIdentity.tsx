"use client";

import Link from "next/link";

// Small, compact identity verification control for the header.
// Today we only support Vipps; the API is ready to expand to BankID later.
// Vipps brand orange approximated to #FF5A24 for strong AA contrast on dark header.

export type IdentityProvider = {
  name: "Vipps" | "BankID" | string;
  href: string;
  color?: string; // optional override
  className?: string; // e.g., "verifyBtn--bankid" later
};

export default function VerifyIdentity({ providers }: { providers?: IdentityProvider[] }) {
  const vippsOrange = "#FF5A24";

  const items: IdentityProvider[] = providers && providers.length
    ? providers
    : [{ name: "Vipps", href: "/api/vipps/start" }];

  // For now, render a single compact button when there is exactly one provider.
  // If multiple providers are supplied later, we can render a small popover menu.
  if (items.length === 1) {
    const p = items[0];
    const style = { borderColor: "rgba(255,90,36,0.6)", color: vippsOrange } as React.CSSProperties;
    const extraClass = p.className ? ` ${p.className}` : "";
    return (
      <Link
        href={p.href}
        className={`verifyBtn${extraClass}`}
        style={style}
        aria-label={`Verifiser med ${p.name} (ingen konto opprettes)`}
        onClick={() => {
          const plausible = (window as typeof window & { plausible?: (e: string, o?: { props?: Record<string, unknown> }) => void }).plausible;
          if (typeof plausible === "function") {
            plausible("Verify Click", { props: { provider: p.name, location: "header" } });
          }
        }}
      >
        Verifiser med {p.name}
      </Link>
    );
  }

  // Placeholder for a compact menu in the future (BankID + Vipps)
  // We keep it simple now; when activated, implement a popover using the existing
  // nav dropdown patterns for full a11y coverage.
  return (
    <Link href={items[0].href} className="verifyBtn" style={{ borderColor: "rgba(255,90,36,0.6)", color: vippsOrange }}>
      Verifiser identitet
    </Link>
  );
}
