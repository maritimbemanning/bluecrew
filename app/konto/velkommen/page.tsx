"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/app/lib/supabase-browser";

export default function WelcomePage() {
  const router = useRouter();
  // Avoid useSearchParams to prevent Suspense requirement; derive once on mount
  const [nextPath, setNextPath] = useState<string>("/jobbsoker/registrer");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const usp = new URLSearchParams(window.location.search);
      const n = usp.get("next");
      if (n) setNextPath(n);
    } catch {}

    const supabase = getBrowserSupabase();
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      setChecked(true);
      if (session?.user) {
        // User is signed in via magic link: continue to Vipps verification step (then form)
        router.replace(nextPath);
      }
    });
  }, [router, nextPath]);

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Sjekk e‑posten din</h1>
      <p style={{ color: "#64748b" }}>
        Vi har sendt en magisk innloggingslenke. Åpne e‑posten på denne enheten for å fullføre innloggingen.
      </p>
      {checked && (
        <p style={{ marginTop: 12, color: "#64748b" }}>
          Når du er innlogget, fortsetter vi til Vipps‑verifisering.
        </p>
      )}
    </div>
  );
}
