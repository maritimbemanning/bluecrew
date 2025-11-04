"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/app/lib/supabase-browser";

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabase();

    // Load current session
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setLoading(false);
    });

    // Listen to auth changes to react after magic link
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Konto</h1>
      {loading ? (
        <p>Henter status…</p>
      ) : email ? (
        <>
          <p>Innlogget som: <b>{email}</b></p>
          <p style={{ marginTop: 12, color: "#64748b" }}>Flere kontosider kommer her.</p>
        </>
      ) : (
        <>
          <p>Du er ikke innlogget.</p>
          <p style={{ marginTop: 12 }}>
            <a href="/konto/logg-inn" style={{ color: "#2563eb" }}>Gå til innlogging</a>
          </p>
        </>
      )}
    </div>
  );
}
