// app/admin/page.tsx
export const dynamic = "force-dynamic";

import type { CSSProperties } from "react";
import { supabaseServer } from "@/app/lib/server/supabase";
import {
  createCandidateStorageBase,
  buildCvPath,
  getCertificatePrefix,
} from "@/app/lib/server/candidate-files";

type CandidateRow = {
  id: number;
  created_at: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  nationality: string | null;
  municipality: string | null;
  county: string | null;
  work_main: string[] | null;
  work_extra: string[] | null;
  stcw_modules: string[] | null;
  message: string | null;
  submitted_at: string; // brukes til hashing av storage-path
};

type LeadRow = {
  id: number;
  created_at: string;
  company: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  message: string | null;
};

function fmtDate(d: string | null | undefined) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return dt.toLocaleString("no-NO", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return d;
  }
}

function JsonList({ items }: { items: string[] | null | undefined }) {
  if (!items || items.length === 0) return <span style={{ opacity: 0.6 }}>—</span>;
  return <span>{items.join(", ")}</span>;
}

async function fetchCandidates(): Promise<{ rows: CandidateRow[]; error?: string }> {
  // ping for å sikre config/tilgang (valgfritt)
  const sb = supabaseServer();
  await sb.from("candidates").select("*", { head: true, count: "exact" });

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/candidates?select=*&order=created_at.desc&limit=50`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    return { rows: [], error: msg || "Kunne ikke hente kandidater" };
  }
  const rows = (await res.json()) as CandidateRow[];
  return { rows };
}

async function fetchLeads(): Promise<{ rows: LeadRow[]; error?: string }> {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=50`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    return { rows: [], error: msg || "Kunne ikke hente leads" };
  }
  const rows = (await res.json()) as LeadRow[];
  return { rows };
}

function SignButton({ path, label }: { path: string; label: string }) {
  // POST til /api/admin/storage -> redirect til signert Supabase-URL (åpnes i ny fane)
  return (
    <form method="POST" action="/api/admin/storage" target="_blank" style={{ display: "inline" }}>
      <input type="hidden" name="path" value={path} />
      <input type="hidden" name="expires" value="600" />
      <button type="submit" style={sx.btnSmall}>
        {label}
      </button>
    </form>
  );
}

export default async function AdminPage() {
  const [{ rows: candidateRows, error: candError }, { rows: leadRows, error: leadError }] = await Promise.all([
    fetchCandidates(),
    fetchLeads(),
  ]);

  return (
    <div style={page}>
      <header style={header}>
        <h1 style={h1}>Bluecrew — Admin</h1>
        <p style={muted}>Siste 50 kandidater og kundeleads. Beskyttet av ADMIN_TOKEN (middleware).</p>
      </header>

      <section style={card}>
        <div style={sectionHeader}>
          <h2 style={h2}>Kandidater (siste 50)</h2>
          <span style={countBadge}>{candidateRows.length}</span>
        </div>
        {candError ? <div style={errorBox}>{candError}</div> : null}
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Mottatt</th>
                <th style={th}>Navn</th>
                <th style={th}>Kontakt</th>
                <th style={th}>Lokasjon</th>
                <th style={th}>Hovedroller</th>
                <th style={th}>STCW</th>
                <th style={th}>Filer</th>
              </tr>
            </thead>
            <tbody>
              {candidateRows.map((r) => {
                const base = createCandidateStorageBase(r.email, r.submitted_at);
                const cvPath = buildCvPath(base);
                const certPrefix = getCertificatePrefix(base);
                return (
                  <tr key={r.id}>
                    <td style={td}>{fmtDate(r.created_at)}</td>
                    <td style={td}>{r.full_name || "—"}</td>
                    <td style={td}>
                      <div>{r.email}</div>
                      <div style={muted}>{r.phone || "—"}</div>
                    </td>
                    <td style={td}>
                      <div>{r.municipality || "—"}</div>
                      <div style={muted}>{r.county || r.nationality || "—"}</div>
                    </td>
                    <td style={td}>
                      <JsonList items={r.work_main || []} />
                    </td>
                    <td style={td}>
                      <JsonList items={r.stcw_modules || []} />
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <SignButton path={cvPath} label="Åpne CV" />
                        <SignButton path={`${certPrefix}certificate.pdf`} label="Åpne sertifikat" />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {candidateRows.length === 0 ? (
                <tr>
                  <td style={td} colSpan={7}>
                    <span style={muted}>Ingen kandidater funnet.</span>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section style={card}>
        <div style={sectionHeader}>
          <h2 style={h2}>Kundeleads (siste 50)</h2>
          <span style={countBadge}>{leadRows.length}</span>
        </div>
        {leadError ? <div style={errorBox}>{leadError}</div> : null}
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Mottatt</th>
                <th style={th}>Selskap</th>
                <th style={th}>Kontakt</th>
                <th style={th}>Lokasjon</th>
                <th style={th}>Melding</th>
              </tr>
            </thead>
            <tbody>
              {leadRows.map((r) => (
                <tr key={r.id}>
                  <td style={td}>{fmtDate(r.created_at)}</td>
                  <td style={td}>{r.company || "—"}</td>
                  <td style={td}>
                    <div>{r.contact_name || "—"}</div>
                    <div style={muted}>{r.email || "—"}</div>
                    <div style={muted}>{r.phone || "—"}</div>
                  </td>
                  <td style={td}>{r.location || "—"}</td>
                  <td style={{ ...td, maxWidth: 360, whiteSpace: "pre-wrap" }}>{r.message || "—"}</td>
                </tr>
              ))}
              {leadRows.length === 0 ? (
                <tr>
                  <td style={td} colSpan={5}>
                    <span style={muted}>Ingen leads funnet.</span>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ————— styles ————— */
const page: CSSProperties = {
  fontFamily: "system-ui, -apple-system, Segoe UI, Inter, Roboto, Arial, sans-serif",
  background: "#0f172a",
  color: "#e2e8f0",
  minHeight: "100vh",
  padding: "32px 20px 60px",
};

const header: CSSProperties = { maxWidth: 1280, margin: "0 auto 20px" };
const h1: CSSProperties = { margin: 0, fontSize: 28, fontWeight: 700 };
const h2: CSSProperties = { margin: 0, fontSize: 20, fontWeight: 700 };
const muted: CSSProperties = { color: "rgba(226,232,240,0.6)", fontSize: 13 };

const card: CSSProperties = {
  maxWidth: 1280,
  margin: "20px auto",
  background: "rgba(2,6,23,0.6)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
};

const sectionHeader: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 12,
};

const countBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 32,
  padding: "2px 8px",
  borderRadius: 999,
  background: "rgba(59,130,246,0.15)",
  color: "#93c5fd",
  fontSize: 12,
};

const tableWrap: CSSProperties = { overflowX: "auto" };

const table: CSSProperties = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  fontSize: 14,
};

const th: CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  color: "rgba(226,232,240,0.9)",
  borderBottom: "1px solid rgba(148,163,184,0.15)",
  position: "sticky",
  top: 0,
  background: "rgba(2,6,23,0.9)",
  zIndex: 1,
};

const td: CSSProperties = {
  padding: "10px 12px",
  verticalAlign: "top",
  borderBottom: "1px solid rgba(148,163,184,0.1)",
};

const errorBox: CSSProperties = {
  background: "rgba(239,68,68,0.15)",
  border: "1px solid rgba(239,68,68,0.4)",
  color: "#fca5a5",
  padding: "10px 12px",
  borderRadius: 8,
  marginBottom: 12,
};

const sx = {
  btnSmall: {
    appearance: "none",
    background: "rgba(59,130,246,0.15)",
    color: "#93c5fd",
    border: "1px solid rgba(59,130,246,0.4)",
    padding: "6px 10px",
    borderRadius: 8,
    fontSize: 12,
    cursor: "pointer",
  } as CSSProperties,
};
