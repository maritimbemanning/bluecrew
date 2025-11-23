import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Strip quotes from env vars if present (some environments add them)
const stripQuotes = (str: string | undefined): string =>
  str?.replace(/^["']|["']$/g, '') ?? '';

const redis = new Redis({
  url: stripQuotes(process.env.UPSTASH_REDIS_REST_URL),
  token: stripQuotes(process.env.UPSTASH_REDIS_REST_TOKEN),
});

const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(8, "1 m"), // 8 requests per minute per IP
  analytics: true,
});

export async function enforceRateLimit(key: string) {
  try {
    const { success, reset } = await limiter.limit(key);
    return { allowed: success, resetSeconds: Math.ceil((reset - Date.now()) / 1000) };
  } catch (err) {
    console.error("⚠️ Rate-limit error:", err);
    // fallback: allow request (fails open)
    return { allowed: true, resetSeconds: 60 };
  }
}
