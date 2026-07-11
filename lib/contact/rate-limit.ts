type Entry = { count: number; reset: number; fingerprints: Set<string> };
const store = new Map<string, Entry>();
export function checkRateLimit(key: string, fingerprint: string, now = Date.now()) {
  const current = store.get(key);
  const entry =
    !current || current.reset < now
      ? { count: 0, reset: now + 10 * 60_000, fingerprints: new Set<string>() }
      : current;
  if (entry.count >= 5) return { ok: false as const, reason: "rate_limited" };
  if (entry.fingerprints.has(fingerprint)) return { ok: false as const, reason: "duplicate" };
  entry.count++;
  entry.fingerprints.add(fingerprint);
  store.set(key, entry);
  return { ok: true as const };
}
// In-memory state is best-effort only in serverless deployments. Replace this adapter with shared durable storage for stronger enforcement.
