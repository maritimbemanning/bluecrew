// lib/server/supabase.ts
import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function insertSupabaseRow<T extends Record<string, any>>(opts: {
  table: string;
  payload: T;
}) {
  const sb = supabaseServer();
  const { error } = await sb.from(opts.table).insert(opts.payload);
  if (error) throw error;
}
