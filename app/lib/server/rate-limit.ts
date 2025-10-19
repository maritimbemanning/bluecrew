const WINDOW_SECONDS = 600; // 10 minutes
const WINDOW_LIMIT = 5;

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetSeconds: number;
};

export async function enforceRateLimit(
  key: string,
  limit = WINDOW_LIMIT,
  windowSeconds = WINDOW_SECONDS,
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return { allowed: true, remaining: limit, limit, resetSeconds: 0 };
  }

  const identifier = `rate:${key}`;

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", identifier],
      ["EXPIRE", identifier, windowSeconds, "NX"],
      ["PTTL", identifier],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("⚠️ Upstash rate limit feilet", response.status, await response.text());
    return { allowed: true, remaining: limit, limit, resetSeconds: windowSeconds };
  }

  const data = (await response.json()) as [number, unknown, number];
  const count = typeof data[0] === "number" ? data[0] : Number(data[0]);
  const ttlMs = typeof data[2] === "number" ? data[2] : Number(data[2]);
  const remaining = Math.max(0, limit - count);
  const allowed = count <= limit;
  const resetSeconds = ttlMs > 0 ? Math.ceil(ttlMs / 1000) : windowSeconds;

  return { allowed, remaining, limit, resetSeconds };
}
