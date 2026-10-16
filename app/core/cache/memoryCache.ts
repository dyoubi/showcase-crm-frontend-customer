import { log } from 'console';

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL_MS = 60 * 1000; // Default 60 seconds

export const memoryCache = {
  get: <T>(key: string): T | undefined => {
    const entry = cache.get(key);

    if (entry && Date.now() < entry.expiry) {
      log(`[Cache HIT] Key: ${key}`);

      return entry.data as T;
    }

    if (entry) {
      // Expired entry
      log(`[Cache EXPIRED] Key: ${key}`);
      cache.delete(key);
    } else {
      log(`[Cache MISS] Key: ${key}`);
    }

    return undefined;
  },

  set: <T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void => {
    const expiry = Date.now() + ttlMs;

    log(`[Cache SET] Key: ${key}, TTL: ${ttlMs / 1000}s`);
    cache.set(key, { data, expiry });
  },

  has: (key: string): boolean => {
    const entry = cache.get(key);

    return !!entry && Date.now() < entry.expiry;
  },

  delete: (key: string): void => {
    log(`[Cache DELETE] Key: ${key}`);
    cache.delete(key);
  },

  clear: (): void => {
    log('[Cache CLEAR] All entries cleared.');
    cache.clear();
  },
};

// Optional: Periodically clean up expired entries if needed,
// though the get method handles individual expirations.
// setInterval(() => {
//   const now = Date.now();
//   for (const [key, entry] of cache.entries()) {
//     if (now >= entry.expiry) {
//       cache.delete(key);
//       log(`[Cache CLEANUP] Expired key: ${key}`);
//     }
//   }
// }, 5 * 60 * 1000); // Clean up every 5 minutes
