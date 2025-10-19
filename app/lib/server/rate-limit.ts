// lib/server/rate-limit.ts
// Enkel in-memory rate limit: LIMIT requests per WINDOW sekunder per key (IP).
type Rate = { allowed: boolean; resetSeconds?: number };

const memory = new Map<string, { count: number; resetAt: number }>();
const WINDOW = 60; // sek
const LIMIT = 8;   // req/min

export async function enforceRateLimit(key: string): Promise<Rate> {
  const now = Date.now();
  const slot = memory.get(key);
  if (!slot || slot.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + WINDOW * 1000 });
    return { allowed: true, resetSeconds: WINDOW };
    }
  if (slot.count < LIMIT) {
    slot.count += 1;
    return { allowed: true, resetSeconds: Math.ceil((slot.resetAt - now) / 1000) };
  }
  return { allowed: false, resetSeconds: Math.ceil((slot.resetAt - now) / 1000) };
}
