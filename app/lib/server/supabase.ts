type InsertOptions = {
  table: string;
  payload: Record<string, unknown>;
};

export async function insertSupabaseRow({ table, payload }: InsertOptions) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn(`⚠️ Supabase-konfig mangler. Kunne ikke skrive til tabell ${table}.`);
    return { skipped: true };
  }

  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/${table}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase-feil ${response.status}: ${detail}`);
  }

  return { ok: true };
}
