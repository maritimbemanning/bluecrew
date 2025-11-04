import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const jar = await cookies();
  // Clear candidate-related sessions
  try {
    jar.delete("email-session");
  } catch {}
  try {
    jar.delete("candidate-session");
  } catch {}

  const url = new URL(req.url);
  url.pathname = "/min-side/logg-inn";
  url.search = "";
  return NextResponse.redirect(url);
}
