import { NextResponse } from "next/server";

// This endpoint has been disabled intentionally.
// Rationale: Admin should generate signed Storage URLs directly from the Admin app
// using Supabase service role on the server, instead of going via the public site.

export const runtime = "nodejs";

function gone(message = "admin signer has been removed") {
  return NextResponse.json({ ok: false, error: message }, { status: 410 });
}

export async function GET() {
  return gone();
}

export async function POST() {
  return gone();
}

export async function OPTIONS() {
  // No CORS support – endpoint removed
  return new NextResponse(null, { status: 204 });
}
