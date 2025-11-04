import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;
let loggedMissing = false;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (!loggedMissing) {
      console.warn("[Upstash Redis] Missing URL/token – rate limiting disabled (fails open)");
      loggedMissing = true;
    }
    return null;
  }
  if (!limiter) {
    const redis = new Redis({ url, token });
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(8, "1 m"),
      analytics: true,
    });
  }
  return limiter;
}

export async function enforceRateLimit(key: string) {
  const l = getLimiter();
  if (!l) return { allowed: true, resetSeconds: 60 };
  try {
    const { success, reset } = await l.limit(key);
    return { allowed: success, resetSeconds: Math.ceil((reset - Date.now()) / 1000) };
  } catch (err) {
    console.error("⚠️ Rate-limit error:", err);
    return { allowed: true, resetSeconds: 60 };
  }
}
