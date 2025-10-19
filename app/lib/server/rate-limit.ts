// lib/server/rate-limit.ts
// Distribuert rate limit via Upstash Redis: LIMIT requests per WINDOW sekunder per key (IP).

const WINDOW_SECONDS = 60;
const LIMIT = 8;

type Rate = { allowed: boolean; resetSeconds: number };

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis configuration");
  }

  return { url, token };
}

async function callPipeline(commands: (string | number)[][]) {
  const { url, token } = getRedisConfig();
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Upstash request failed: ${response.status} ${detail}`.trim());
  }

  return (await response.json()) as { result: unknown }[];
}

export async function enforceRateLimit(key: string): Promise<Rate> {
  const redisKey = `rl:${key}`;

  const results = await callPipeline([
    ["INCR", redisKey],
    ["EXPIRE", redisKey, WINDOW_SECONDS, "NX"],
    ["PTTL", redisKey],
  ]);

  const count = Number(results[0]?.result ?? 0);
  const ttlMs = Number(results[2]?.result ?? WINDOW_SECONDS * 1000);
  const resetSeconds = ttlMs > 0 ? Math.ceil(ttlMs / 1000) : WINDOW_SECONDS;

  return {
    allowed: count <= LIMIT,
    resetSeconds,
  };
}
