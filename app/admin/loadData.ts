"use server";

/**
 * Henter siste 50 candidates og leads fra Supabase – PÅ SERVEREN.
 * (Lekker ikke SUPABASE_SERVICE_ROLE_KEY til klienten.)
 */
export async function loadAdminData() {
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const [candidatesRes, leadsRes] = await Promise.all([
    fetch(`${base}/candidates?select=*&order=created_at.desc&limit=50`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${base}/leads?select=*&order=created_at.desc&limit=50`, {
      headers,
      cache: "no-store",
    }),
  ]);

  if (!candidatesRes.ok) {
    throw new Error(`Supabase candidates failed: ${candidatesRes.status} ${await candidatesRes.text()}`);
  }
  if (!leadsRes.ok) {
    throw new Error(`Supabase leads failed: ${leadsRes.status} ${await leadsRes.text()}`);
  }

  const [candidates, leads] = await Promise.all([candidatesRes.json(), leadsRes.json()]);
  return { candidates, leads };
}
