"use client";

import { createClient } from "@supabase/supabase-js";
import { getPublicEnv } from "./env";

export function getBrowserSupabase() {
  const url = getPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anon = getPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  
  return createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}
