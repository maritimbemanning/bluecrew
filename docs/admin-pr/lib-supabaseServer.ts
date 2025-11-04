// @ts-nocheck
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase client (service role)
export const supabaseServer = createClient(supabaseUrl, serviceRole);

export async function getSignedUrl(bucket: string, path: string): Promise<string> {
  if (!bucket) throw new Error("missing bucket");
  if (!path) throw new Error("missing path");
  if (!(path.startsWith("cv/") || path.startsWith("cert/")) || path.includes("..")) {
    throw new Error("invalid key");
  }
  const { data, error } = await supabaseServer
    .storage
    .from(bucket)
    .createSignedUrl(path, 900); // 15 min
  if (error) throw error;
  return data.signedUrl;
}
