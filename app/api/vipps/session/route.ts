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

  console.log("🔍 Vipps session check:", {
    hasSessionCookie: !!sessionIdCookie,
    sessionId: sessionIdCookie?.value,
  });

  if (!sessionIdCookie) {
    console.log("❌ No session cookie found");
    return NextResponse.json({ verified: false });
  }

  try {
    // Fetch session data from Redis using session ID
    const sessionData = await redis.get(`vipps:${sessionIdCookie.value}`);
    
    console.log("📦 Redis lookup result:", {
      found: !!sessionData,
      key: `vipps:${sessionIdCookie.value}`,
      dataType: typeof sessionData,
    });

    if (!sessionData) {
      // Session expired or doesn't exist
      console.log("❌ Session not found in Redis");
      return NextResponse.json({ verified: false });
    }

    // Redis SDK returns object directly, no need to parse
    console.log("✅ Session found and verified");
    return NextResponse.json({
      verified: true,
      session: sessionData,
    });
  } catch (error) {
    console.error("⚠️ Vipps session fetch error:", error);
    return NextResponse.json({ verified: false });
  }
}
