import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

export async function GET() {
  const jar = await cookies();
  const email = jar.get("email-session")?.value;
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !service) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const url = new URL(`${baseUrl}/rest/v1/candidates`);
  url.searchParams.set(
    "select",
    "id,name,email,phone,available_from,work_main,stcw_has,stcw_mod,deck_has,deck_class",
  );
  url.searchParams.set("email", `eq.${email}`);
  url.searchParams.set("limit", "1");

  const res = await fetch(url, {
    headers: { apikey: service, Authorization: `Bearer ${service}`, Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json({ error: text || "Failed to fetch candidate" }, { status: 500 });
  }

  const rows = (await res.json().catch(() => [])) as CandidateRow[];
  const row = rows[0];
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(row, { status: 200 });
}
