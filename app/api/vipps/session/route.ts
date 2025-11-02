import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionIdCookie = cookieStore.get("vipps_session_id");

  if (!sessionIdCookie) {
    return NextResponse.json({ verified: false });
  }

  try {
    // Fetch session data from Redis using session ID
    const sessionData = await redis.get<string>(`vipps:${sessionIdCookie.value}`);
    
    if (!sessionData) {
      // Session expired or doesn't exist
      return NextResponse.json({ verified: false });
    }

    const session = JSON.parse(sessionData);
    return NextResponse.json({
      verified: true,
      session,
    });
  } catch (error) {
    console.error("⚠️ Vipps session fetch error:", error);
    return NextResponse.json({ verified: false });
  }
}
