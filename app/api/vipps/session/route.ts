import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";
import { logger } from "@/app/lib/logger";

// Strip quotes from env vars if present (some environments add them)
const stripQuotes = (str: string | undefined): string =>
  str?.replace(/^["']|["']$/g, '') ?? '';

const redis = new Redis({
  url: stripQuotes(process.env.UPSTASH_REDIS_REST_URL),
  token: stripQuotes(process.env.UPSTASH_REDIS_REST_TOKEN),
});

export async function GET() {
  const cookieStore = await cookies();
  const sessionIdCookie = cookieStore.get("vipps_session_id");

  logger.debug("Vipps session check", { hasSessionCookie: Boolean(sessionIdCookie) });

  if (!sessionIdCookie) {
    logger.debug("No session cookie found");
    return NextResponse.json({ verified: false });
  }

  try {
    // Fetch session data from Redis using session ID
    const sessionData = await redis.get(`vipps:${sessionIdCookie.value}`);

    logger.debug("Redis lookup result", {
      found: Boolean(sessionData),
      dataType: typeof sessionData,
    });

    if (!sessionData) {
      // Session expired or doesn't exist
      logger.debug("Session not found in Redis");
      return NextResponse.json({ verified: false });
    }

    // Redis SDK returns object directly, no need to parse
    logger.debug("Session found and verified");
    return NextResponse.json({
      verified: true,
      session: sessionData,
    });
  } catch (error) {
    logger.error("Vipps session fetch error:", error);
    return NextResponse.json({ verified: false });
  }
}
