export type RateLimitResult =
  | { ok: true }
  | { ok: false; reason: "rate_limited" | "duplicate" | "unavailable" };

export type RateLimitRequest = {
  key: string;
  fingerprint: string;
  limit: number;
  windowMs: number;
};

export interface RateLimitAdapter {
  check(request: RateLimitRequest): Promise<RateLimitResult>;
}

type Entry = { count: number; reset: number; fingerprints: Set<string> };

class MemoryRateLimitAdapter implements RateLimitAdapter {
  private readonly store = new Map<string, Entry>();

  async check({ key, fingerprint, limit, windowMs }: RateLimitRequest): Promise<RateLimitResult> {
    const now = Date.now();
    const current = this.store.get(key);
    const entry =
      !current || current.reset < now
        ? { count: 0, reset: now + windowMs, fingerprints: new Set<string>() }
        : current;
    if (entry.count >= limit) return { ok: false, reason: "rate_limited" };
    if (entry.fingerprints.has(fingerprint)) return { ok: false, reason: "duplicate" };
    entry.count += 1;
    entry.fingerprints.add(fingerprint);
    this.store.set(key, entry);
    return { ok: true };
  }
}

class DistributedRateLimitAdapter implements RateLimitAdapter {
  constructor(
    private readonly endpoint: string,
    private readonly token: string
  ) {}

  async check(request: RateLimitRequest): Promise<RateLimitResult> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(request),
        cache: "no-store",
        signal: AbortSignal.timeout(2500)
      });
      if (!response.ok) return { ok: false, reason: "unavailable" };
      const result = (await response.json()) as { ok?: boolean; reason?: string };
      if (result.ok === true) return { ok: true };
      if (result.reason === "rate_limited" || result.reason === "duplicate") {
        return { ok: false, reason: result.reason };
      }
      return { ok: false, reason: "unavailable" };
    } catch {
      return { ok: false, reason: "unavailable" };
    }
  }
}

const memoryAdapter = new MemoryRateLimitAdapter();

export function getRateLimitAdapter(): RateLimitAdapter | null {
  if (process.env.RATE_LIMIT_PROVIDER === "distributed") {
    const endpoint = process.env.RATE_LIMIT_DISTRIBUTED_URL?.trim();
    const token = process.env.RATE_LIMIT_DISTRIBUTED_TOKEN?.trim();
    return endpoint && token ? new DistributedRateLimitAdapter(endpoint, token) : null;
  }
  if (process.env.NODE_ENV !== "production" || process.env.RATE_LIMIT_PROVIDER === "memory") {
    return memoryAdapter;
  }
  return null;
}

export async function checkRateLimit(key: string, fingerprint: string): Promise<RateLimitResult> {
  const adapter = getRateLimitAdapter();
  if (!adapter) return { ok: false, reason: "unavailable" };
  return adapter.check({ key, fingerprint, limit: 5, windowMs: 10 * 60_000 });
}
