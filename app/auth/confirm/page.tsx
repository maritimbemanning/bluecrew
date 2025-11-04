"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sx } from "@/app/lib/styles";

export default function AuthConfirmPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState<string>("Bekrefter…");

  const returnTo = typeof searchParams?.return === "string" ? (searchParams!.return as string) : "/jobbsoker/registrer";

  useEffect(() => {
    async function run() {
      try {
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        const params = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
        const token = params.get("access_token");
        if (!token) {
          setStatus("error");
          setMessage("Fant ikke tilgangstoken i lenken.");
          return;
        }

        // Ask server to validate token with Supabase and set email-session cookie
        const res = await fetch(`/api/auth/email-session?return=${encodeURIComponent(returnTo)}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setStatus("ok");
          setMessage("E-post bekreftet. Går videre…");
          // Server will redirect if it chooses, but in case of 200 just navigate
          window.location.replace(returnTo);
          return;
        }

        const text = await res.text();
        setStatus("error");
        setMessage(text || "Kunne ikke bekrefte e-post.");
      } catch (err) {
        setStatus("error");
        setMessage("Uventet feil.");
      }
    }
    run();
  }, [returnTo]);

  return (
    <div style={sx.page}>
      <main style={{ ...sx.main }}>
        <section style={sx.section}>
          <div style={sx.wrapNarrow}>
            <h1 style={sx.h2}>Bekrefter e-post…</h1>
            <p style={{ ...sx.leadSmall, marginTop: 8 }}>{message}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
