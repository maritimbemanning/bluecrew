import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sx } from "@/app/lib/styles";

type CandidateRow = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  available_from: string | null;
  work_main?: string | null;
  stcw_has?: string | null;
  stcw_mod?: string | null;
  deck_has?: string | null;
  deck_class?: string | null;
};

async function getCandidate(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = new URL(`${baseUrl}/rest/v1/candidates`);
  url.searchParams.set("select", "id,name,email,phone,available_from,work_main,stcw_has,stcw_mod,deck_has,deck_class");
  url.searchParams.set("email", `eq.${email}`);
  url.searchParams.set("limit", "1");
  const res = await fetch(url, {
    headers: {
      apikey: service,
      Authorization: `Bearer ${service}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const rows = (await res.json().catch(() => [])) as CandidateRow[];
  return rows[0] || null;
}

async function updateAvailability(email: string, available_from: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = new URL(`${baseUrl}/rest/v1/candidates`);
  url.searchParams.set("email", `eq.${email}`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      apikey: service,
      Authorization: `Bearer ${service}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ available_from }),
  });
  return res.ok;
}

export default async function MinSide({
  searchParams,
}: {
  searchParams?: { ok?: string };
}) {
  const store = await cookies();
  const email = store.get("email-session")?.value;
  if (!email) redirect("/min-side/logg-inn");

  const candidate = await getCandidate(email);
  const isOk = searchParams?.ok === "1";

  async function Action(formData: FormData) {
    "use server";
    const nextEmail = (await cookies()).get("email-session")?.value;
    if (!nextEmail) return redirect("/min-side/logg-inn");
    const date = String(formData.get("available_from") || "");
    if (!date) return;
    await updateAvailability(nextEmail, date);
    // redirect with success flag
    return redirect("/min-side?ok=1");
  }

  return (
    <div style={sx.page}>
      <main style={sx.main}>
        <section style={sx.section}>
          <div style={sx.wrapNarrow}>
            <h1 style={sx.h2}>Min side</h1>
            <p style={{ ...sx.leadSmall, marginTop: 6 }}>Du er logget inn som {email}</p>
            <div style={{ marginTop: 10 }}>
              <a href="/min-side/logg-ut" style={sx.navLink}>Logg ut</a>
            </div>

            {isOk && (
              <div style={sx.ok}>Tilgjengelighet er oppdatert.</div>
            )}

            {!candidate ? (
              <div style={sx.formError}>
                Finner ikke søknaden din. Ta kontakt på <a href="mailto:post@bluecrew.no" style={{ color: "#0ea5e9" }}>post@bluecrew.no</a>.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={sx.privacyBox}>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Søknad</div>
                  <div>Navn: <strong>{candidate.name || "-"}</strong></div>
                  <div>E-post: <strong>{candidate.email}</strong></div>
                  <div>Telefon: <strong>{candidate.phone || "-"}</strong></div>
                </div>

                <form action={Action} style={{ ...sx.form, gridTemplateColumns: "1fr", maxWidth: 520 }}>
                  <label style={sx.label}>
                    Tilgjengelig fra
                    <input type="date" name="available_from" defaultValue={candidate.available_from?.substring(0,10) || ""} style={sx.input} />
                  </label>
                  <div>
                    <button type="submit" style={sx.btnSecondary}>Oppdater tilgjengelighet</button>
                  </div>
                </form>

                <div className="hint" style={{ fontSize: 13, color: "#475569" }}>
                  Vil du fjerne kontoen din? Send oss en e‑post, så hjelper vi deg.
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
