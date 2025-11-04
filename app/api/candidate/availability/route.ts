import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function isIsoDate(input: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return false;
  const d = new Date(input + "T00:00:00Z");
  return !isNaN(d.getTime());
}

export async function PATCH(request: Request) {
  const jar = await cookies();
  const email = jar.get("email-session")?.value;
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let available_from: string | undefined = undefined;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    const value = obj["available_from"];
    if (typeof value === "string") {
      available_from = value;
    }
  }
  if (!available_from || !isIsoDate(available_from)) {
    return NextResponse.json({ error: "available_from must be YYYY-MM-DD" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !service) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

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

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json({ error: text || "Failed to update" }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
