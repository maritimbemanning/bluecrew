import type { CSSProperties } from "react";
import { selectSupabaseRows, listSupabaseObjects } from "../lib/server/supabase";
import {
  buildCvPath,
  createCandidateStorageBase,
  getCertificatePrefix,
} from "../lib/server/candidate-files";
import { captureServerException } from "../lib/server/observability";

export const dynamic = "force-dynamic";

const pageStyle: CSSProperties = {
  fontFamily: "var(--font-geist-sans, 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif)",
  background: "#0f172a",
  minHeight: "100vh",
  padding: "40px 20px 60px",
  color: "#e2e8f0",
};

const containerStyle: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gap: 32,
};

const cardStyle: CSSProperties = {
  background: "rgba(15, 23, 42, 0.92)",
  borderRadius: 18,
  border: "1px solid rgba(148, 197, 255, 0.18)",
  boxShadow: "0 24px 80px rgba(2, 6, 23, 0.55)",
  padding: "28px 28px 32px",
  backdropFilter: "blur(6px)",
};

const headingStyle: CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 20,
  letterSpacing: "-0.02em",
};

const tableWrapperStyle: CSSProperties = {
  overflowX: "auto",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  color: "#cbd5f5",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontWeight: 700,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(148, 197, 255, 0.85)",
  padding: "12px 10px",
  borderBottom: "1px solid rgba(148, 197, 255, 0.18)",
  whiteSpace: "nowrap",
};

const tdStyle: CSSProperties = {
  padding: "12px 10px",
  borderBottom: "1px solid rgba(15, 118, 110, 0.12)",
  verticalAlign: "top",
};

const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  background: "rgba(56, 189, 248, 0.16)",
  color: "#38bdf8",
};

const actionButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 12px",
  borderRadius: 10,
  fontWeight: 600,
  fontSize: 12,
  background: "rgba(148, 197, 255, 0.16)",
  color: "#e2e8f0",
  border: "1px solid rgba(148, 197, 255, 0.35)",
  cursor: "pointer",
};

const errorStyle: CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  background: "rgba(248, 113, 113, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.45)",
  color: "#fecaca",
  fontSize: 14,
  marginBottom: 16,
};

type CandidateRow = {
  id: number | string;
  name: string | null;
  email: string | null;
  phone: string | null;
  county: string | null;
  municipality: string | null;
  available_from: string | null;
  wants_temporary: string | null;
  work_main: unknown;
  stcw_has: string | null;
  stcw_mod: unknown;
  deck_has: string | null;
  deck_class: string | null;
  skills: string | null;
  other_comp: string | null;
  submitted_at: string;
};

type LeadRow = {
  id: number | string;
  company: string | null;
  contact: string | null;
  email: string | null;
  phone: string | null;
  county: string | null;
  municipality: string | null;
  need_type: string | null;
  need_duration: string | null;
  description: string | null;
  submitted_at: string;
};

type CandidateAsset = {
  cvPath: string | null;
  certificatePath: string | null;
};

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      const trimmed = value.replace(/[{}]/g, "").trim();
      if (!trimmed) return [];
      return trimmed
        .split(",")
        .map((part) => part.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    }
  }
  return [];
}

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("no-NO", { dateStyle: "short", timeStyle: "short" });
}

function formatLocation(county: string | null, municipality: string | null) {
  if (county && municipality) return `${municipality} (${county})`;
  if (municipality) return municipality;
  return county || "-";
}

async function loadCandidateAssets(rows: CandidateRow[]): Promise<CandidateAsset[]> {
  return Promise.all(
    rows.map(async (row) => {
      if (!row.email || !row.submitted_at) {
        return { cvPath: null, certificatePath: null };
      }
      const base = createCandidateStorageBase(row.email, row.submitted_at);
      const cvPath = buildCvPath(base);
      let certificatePath: string | null = null;
      try {
        const objects = await listSupabaseObjects({
          bucket: "candidates-private",
          prefix: getCertificatePrefix(base),
          limit: 1,
        });
        certificatePath = objects[0] ?? null;
      } catch (error) {
        captureServerException(error, { scope: "admin-list-certificates" });
      }
      return { cvPath, certificatePath };
    }),
  );
}

function renderAction(path: string | null, label: string) {
  if (!path) return <span>-</span>;
  return (
    <form action="/api/admin/storage" method="POST" target="_blank" style={{ display: "inline" }}>
      <input type="hidden" name="path" value={path} />
      <input type="hidden" name="expires" value="600" />
      <button type="submit" style={actionButtonStyle}>
        {label}
      </button>
    </form>
  );
}

function renderBadge(value: string | null, positiveLabel = "Ja", negativeLabel = "Nei") {
  if (!value) return <span>-</span>;
  const normalized = value.toLowerCase();
  const isPositive = normalized === "ja" || normalized === "yes";
  return <span style={badgeStyle}>{isPositive ? positiveLabel : negativeLabel}</span>;
}

export default async function AdminPage() {
  let candidateRows: CandidateRow[] = [];
  let candidateAssets: CandidateAsset[] = [];
  let candidateError: string | null = null;
  let leadRows: LeadRow[] = [];
  let leadError: string | null = null;

  try {
    candidateRows = await selectSupabaseRows<CandidateRow>({
      table: "candidates",
      columns:
        "id,name,email,phone,county,municipality,available_from,wants_temporary,work_main,stcw_has,stcw_mod,deck_has,deck_class,skills,other_comp,submitted_at",
      order: { column: "submitted_at", ascending: false },
      limit: 50,
    });
    candidateAssets = await loadCandidateAssets(candidateRows);
  } catch (error) {
    candidateError = error instanceof Error ? error.message : "Ukjent feil ved lasting av kandidater";
    captureServerException(error, { scope: "admin-load-candidates" });
  }

  try {
    leadRows = await selectSupabaseRows<LeadRow>({
      table: "leads",
      columns: "id,company,contact,email,phone,county,municipality,need_type,need_duration,description,submitted_at",
      order: { column: "submitted_at", ascending: false },
      limit: 50,
    });
  } catch (error) {
    leadError = error instanceof Error ? error.message : "Ukjent feil ved lasting av leads";
    captureServerException(error, { scope: "admin-load-leads" });
  }

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <section style={cardStyle}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h1 style={headingStyle}>Kandidater (siste 50)</h1>
            <span style={{ fontSize: 13, color: "rgba(148, 197, 255, 0.75)" }}>
              Totalt: {candidateRows.length}
            </span>
          </header>
          {candidateError ? <div style={errorStyle}>{candidateError}</div> : null}
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Mottatt</th>
                  <th style={thStyle}>Navn</th>
                  <th style={thStyle}>Kontakt</th>
                  <th style={thStyle}>Lokasjon</th>
                  <th style={thStyle}>Arbeidsområde</th>
                  <th style={thStyle}>Tilgjengelig</th>
                  <th style={thStyle}>STCW</th>
                  <th style={thStyle}>Dekk</th>
                  <th style={thStyle}>CV</th>
                  <th style={thStyle}>Sertifikater</th>
                </tr>
              </thead>
              <tbody>
                {candidateRows.map((row, index) => {
                  const workAreas = normalizeArray(row.work_main).join(", ") || "-";
                  const stcwModules = normalizeArray(row.stcw_mod).join(", ");
                  const assets = candidateAssets[index] ?? { cvPath: null, certificatePath: null };
                  return (
                    <tr key={row.id ?? index}>
                      <td style={tdStyle}>{formatDate(row.submitted_at)}</td>
                      <td style={tdStyle}>
                        <div>{row.name || "-"}</div>
                        {row.skills ? (
                          <div style={{ fontSize: 12, color: "rgba(148, 197, 255, 0.7)", marginTop: 4 }}>
                            {row.skills}
                          </div>
                        ) : null}
                      </td>
                      <td style={tdStyle}>
                        <div>{row.email || "-"}</div>
                        <div>{row.phone || "-"}</div>
                      </td>
                      <td style={tdStyle}>{formatLocation(row.county, row.municipality)}</td>
                      <td style={tdStyle}>{workAreas}</td>
                      <td style={tdStyle}>{row.available_from || "-"}</td>
                      <td style={tdStyle}>
                        <div>{renderBadge(row.stcw_has)}</div>
                        {stcwModules ? (
                          <div style={{ fontSize: 12, color: "rgba(148, 197, 255, 0.7)", marginTop: 4 }}>{stcwModules}</div>
                        ) : null}
                      </td>
                      <td style={tdStyle}>
                        <div>{renderBadge(row.deck_has)}</div>
                        {row.deck_class ? (
                          <div style={{ fontSize: 12, color: "rgba(148, 197, 255, 0.7)", marginTop: 4 }}>
                            Klasse {row.deck_class}
                          </div>
                        ) : null}
                      </td>
                      <td style={tdStyle}>{renderAction(assets.cvPath, "Vis CV")}</td>
                      <td style={tdStyle}>{renderAction(assets.certificatePath, "Vis vedlegg")}</td>
                    </tr>
                  );
                })}
                {candidateRows.length === 0 ? (
                  <tr>
                    <td style={{ ...tdStyle, textAlign: "center" }} colSpan={10}>
                      Ingen kandidater registrert ennå.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section style={cardStyle}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={headingStyle}>Kundeleads (siste 50)</h2>
            <span style={{ fontSize: 13, color: "rgba(148, 197, 255, 0.75)" }}>
              Totalt: {leadRows.length}
            </span>
          </header>
          {leadError ? <div style={errorStyle}>{leadError}</div> : null}
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Mottatt</th>
                  <th style={thStyle}>Selskap</th>
                  <th style={thStyle}>Kontakt</th>
                  <th style={thStyle}>Lokasjon</th>
                  <th style={thStyle}>Behov</th>
                  <th style={thStyle}>Varighet</th>
                  <th style={thStyle}>Beskrivelse</th>
                </tr>
              </thead>
              <tbody>
                {leadRows.map((row, index) => (
                  <tr key={row.id ?? index}>
                    <td style={tdStyle}>{formatDate(row.submitted_at)}</td>
                    <td style={tdStyle}>{row.company || "-"}</td>
                    <td style={tdStyle}>
                      <div>{row.contact || "-"}</div>
                      <div>{row.email || "-"}</div>
                      <div>{row.phone || "-"}</div>
                    </td>
                    <td style={tdStyle}>{formatLocation(row.county, row.municipality)}</td>
                    <td style={tdStyle}>{row.need_type || "-"}</td>
                    <td style={tdStyle}>{row.need_duration || "-"}</td>
                    <td style={tdStyle}>{row.description || "-"}</td>
                  </tr>
                ))}
                {leadRows.length === 0 ? (
                  <tr>
                    <td style={{ ...tdStyle, textAlign: "center" }} colSpan={7}>
                      Ingen kundehenvendelser registrert ennå.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
