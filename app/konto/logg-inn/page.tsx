"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/app/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const supabase = getBrowserSupabase();
      // After magic link login, send the user to /konto/velkommen which will then route to Vipps step
      const redirectTo = `${window.location.origin}/konto/velkommen?next=${encodeURIComponent("/jobbsoker/registrer")}`;
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
      if (error) throw error;
      setStatus("sent");
    } catch (err: any) {
      setError(err?.message || "Kunne ikke sende innloggingsepost nå.");
      setStatus("error");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Logg inn</h1>
      <p style={{ color: "#64748b", marginBottom: 16 }}>
        Skriv inn e‑postadressen din. Vi sender deg en magisk lenke for å logge inn.
      </p>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.no"
            style={{ flex: 1, padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 6 }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            style={{ padding: "10px 14px", background: "#2563eb", color: "#fff", borderRadius: 6 }}
          >
            {status === "sending" ? "Sender…" : "Send lenke"}
          </button>
        </div>
      </form>

      {status === "sent" && (
        <p style={{ marginTop: 16, color: "#059669" }}>
          Sjekk e‑posten din – vi har sendt en innloggingslenke.
        </p>
      )}
      {status === "error" && (
        <p style={{ marginTop: 16, color: "#dc2626" }}>{error}</p>
      )}

      <div style={{ marginTop: 24, color: "#64748b", fontSize: 14 }}>
        Tips: Hvis e‑post ikke kommer, sjekk søppelpost. Du kan prøve på nytt om et øyeblikk.
      </div>
    </div>
  );
}
