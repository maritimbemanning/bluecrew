import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get("authorization") || request.headers.get("Authorization");
    const token = auth?.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : undefined;
    if (!token) return NextResponse.json({ error: "Mangler token" }, { status: 400 });

    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!baseUrl) return NextResponse.json({ error: "Supabase ikke konfigurert" }, { status: 500 });

    const userRes = await fetch(`${baseUrl}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: "Ugyldig token" }, { status: 401 });
    }

    const user = await userRes.json().catch(() => null);
    const email: string | undefined = user?.email;
    if (!email) return NextResponse.json({ error: "Ingen e-post funnet" }, { status: 400 });

    const store = await cookies();
    store.set("email-session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dager
      path: "/",
    });

    const returnTo = new URL(request.url).searchParams.get("return") || "/";
    return NextResponse.redirect(new URL(returnTo, new URL(request.url).origin));
  } catch (err) {
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
