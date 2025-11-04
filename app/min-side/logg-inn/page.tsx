"use client";

import { useState } from "react";
import Link from "next/link";
import { sx } from "@/app/lib/styles";

export default function CandidateLoginPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const returnTo = typeof searchParams?.return === "string" ? (searchParams!.return as string) : "/min-side";

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/auth/magic/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, returnTo }),
      });
      if (!res.ok) throw new Error("Kunne ikke sende lenke");
      setStatus("sent");
      setMessage("Sjekk e-posten din for en innloggingslenke.");
    } catch {
      setStatus("error");
      setMessage("Noe gikk galt. Prøv igjen.");
    }
  }

  return (
    <div style={sx.page}>
      <main style={{ ...sx.main }}>
        <section style={sx.section}>
          <div style={sx.wrapNarrow}>
            <h1 style={sx.h2}>Logg inn</h1>
            <p className="lead" style={{ ...sx.leadSmall, marginTop: 8 }}>
              Logg inn med e-post. Vi sender en magisk lenke som logger deg inn på &quot;Min side&quot;.
            </p>

            <form onSubmit={sendLink} style={{ ...sx.form, gridTemplateColumns: "1fr", maxWidth: 520 }}>
              <label style={sx.label}>
                E-postadresse
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="navn@eksempel.no"
                  style={sx.input}
                />
              </label>
              <div>
                <button type="submit" style={sx.btnSecondary} disabled={status === "loading"}>
                  {status === "loading" ? "Sender…" : "Send innloggingslenke"}
                </button>
              </div>

              {status === "sent" && <div style={sx.ok}>{message}</div>}
              {status === "error" && <div style={sx.formError}>{message}</div>}
            </form>

            <p style={{ marginTop: 14 }}>
              Har du allerede klikket på lenken? <Link href={returnTo} style={{ color: "#0ea5e9", textDecoration: "underline" }}>Gå til Min side</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
