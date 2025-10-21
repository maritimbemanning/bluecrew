// Server-komponent (IKKE "use client")
import { loadAdminData } from "./loadData";

const wrap: React.CSSProperties = { padding: 24, width: "min(1200px, 94vw)", margin: "0 auto" };
const h1: React.CSSProperties = { fontSize: 28, fontWeight: 800, margin: "8px 0 12px" };
const section: React.CSSProperties = { marginTop: 18 };
const tableWrap: React.CSSProperties = { overflowX: "auto", marginTop: 10 };
const table: React.CSSProperties = { width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 14 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" };
const td: React.CSSProperties = { padding: "10px 12px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" };

export default async function AdminPage() {
  // Hentes på server – trygg bruk av service role key
  const { candidates, leads } = await loadAdminData();

  return (
    <main style={wrap}>
      <h1 style={h1}>Admin</h1>
      <p>Siste 50 kandidater og leads (beskyttet av ADMIN_TOKEN i middleware).</p>

      <section style={section}>
        <h2 style={{ margin: "16px 0 8px", fontSize: 18, fontWeight: 700 }}>Kandidater</h2>
        <div style={tableWrap}>
          <table style={table} aria-label="Kandidater">
            <thead>
              <tr>
                <th style={th}>Navn</th>
                <th style={th}>E-post</th>
                <th style={th}>Telefon</th>
                <th style={th}>Opprettet</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(candidates) && candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td style={td}>{candidate.name || "-"}</td>
                    <td style={td}>{candidate.email || "-"}</td>
                    <td style={td}>{candidate.phone || "-"}</td>
                    <td style={td}>
                      {candidate.created_at
                        ? new Date(candidate.created_at).toLocaleString("no-NO")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={td} colSpan={4}>Ingen kandidater funnet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section style={section}>
        <h2 style={{ margin: "16px 0 8px", fontSize: 18, fontWeight: 700 }}>Leads</h2>
        <div style={tableWrap}>
          <table style={table} aria-label="Leads">
            <thead>
              <tr>
                <th style={th}>Navn</th>
                <th style={th}>E-post</th>
                <th style={th}>Telefon</th>
                <th style={th}>Selskap</th>
                <th style={th}>Opprettet</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(leads) && leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={td}>{lead.name || "-"}</td>
                    <td style={td}>{lead.email || "-"}</td>
                    <td style={td}>{lead.phone || "-"}</td>
                    <td style={td}>{lead.company || "-"}</td>
                    <td style={td}>
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleString("no-NO")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={td} colSpan={5}>Ingen leads funnet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
