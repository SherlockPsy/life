/**
 * scene_cache is NON-AUTHORITATIVE.
 * It is a convenience only.
 *
 * This wrapper makes that true mechanically:
 * - cache can be cleared at any time
 * - cache contents must be rebuildable from Postgres ledger reads
 * - cache must never be treated as "truth"
 */

type CacheEntry = {
  key: string;
  value: string;
  created_at_ms: number;
};

const MEM: Map<string, CacheEntry> = new Map();

export function sceneCacheGet(key: string): string | null {
  const e = MEM.get(key);
  if (!e) return null;
  return e.value;
}

export function sceneCacheSet(key: string, value: string): void {
  MEM.set(key, { key, value, created_at_ms: Date.now() });
}

export function sceneCacheClear(): void {
  MEM.clear();
}

/**
 * “Authoritative demotion” helper:
 * callers must provide a rebuild function that reads from authoritative sources (Postgres).
 * If cache is missing, we rebuild.
 */
export async function sceneCacheGetOrRebuild(
  key: string,
  rebuildFromLedger: () => Promise<string>
): Promise<string> {
  const cached = sceneCacheGet(key);
  if (cached !== null) return cached;

  const rebuilt = await rebuildFromLedger();
  sceneCacheSet(key, rebuilt);
  return rebuilt;
}