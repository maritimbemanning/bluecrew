import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("vipps_session");

  if (!sessionCookie) {
    return NextResponse.json({ verified: false });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    return NextResponse.json({
      verified: true,
      session,
    });
  } catch (error) {
    return NextResponse.json({ verified: false });
  }
}
