// Fixed-window rate limiter kept in memory. It is per server instance (serverless
// deployments run several), so treat it as one layer next to validation, the
// honeypot and the mail provider's own limits. Self-contained so it can be tested.

const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): { allowed: boolean; retryAfterMs: number } {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { allowed: false, retryAfterMs: windowMs - (now - recent[0]) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map small: drop keys whose hits have all expired.
  if (hits.size > 1000) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(storedKey);
    }
  }

  return { allowed: true, retryAfterMs: 0 };
}
