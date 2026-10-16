import fs from 'fs';
import path from 'path';
import { log } from 'console';

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const CACHE_DIR = path.join(process.cwd(), '.cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  log(`[FileCache] Created cache directory: ${CACHE_DIR}`);
}

export const fileCache = {
  get: <T>(key: string): T | undefined => {
    const filePath = path.join(CACHE_DIR, `${key}.json`);

    // Check if cache file exists
    if (!fs.existsSync(filePath)) {
      log(`[FileCache MISS] Key: ${key} - File not found`);

      return undefined;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const entry: CacheEntry<T> = JSON.parse(fileContent);

      // Check if cache entry is still valid
      if (Date.now() < entry.expiry) {
        log(`[FileCache HIT] Key: ${key}`);

        return entry.data as T;
      }

      // Expired entry - delete the file
      log(`[FileCache EXPIRED] Key: ${key}`);
      fs.unlinkSync(filePath);

      return undefined;
    } catch (error) {
      log(`[FileCache ERROR] Failed to read cache for key: ${key}`, error);

      return undefined;
    }
  },

  set: <T>(key: string, data: T, ttlMs: number = 60 * 1000): void => {
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    const entry: CacheEntry<T> = {
      data,
      expiry: Date.now() + ttlMs,
    };

    try {
      fs.writeFileSync(filePath, JSON.stringify(entry, null, 2), 'utf8');
      log(`[FileCache SET] Key: ${key}, TTL: ${ttlMs / 1000}s`);
    } catch (error) {
      log(`[FileCache ERROR] Failed to write cache for key: ${key}`, error);
    }
  },

  has: (key: string): boolean => {
    const filePath = path.join(CACHE_DIR, `${key}.json`);

    if (!fs.existsSync(filePath)) {
      return false;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const entry = JSON.parse(fileContent);

      return Date.now() < entry.expiry;
    } catch (error) {
      return false;
    }
  },

  delete: (key: string): void => {
    const filePath = path.join(CACHE_DIR, `${key}.json`);

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        log(`[FileCache DELETE] Key: ${key}`);
      } catch (error) {
        log(`[FileCache ERROR] Failed to delete cache for key: ${key}`, error);
      }
    }
  },

  clear: (): void => {
    try {
      const files = fs.readdirSync(CACHE_DIR);

      files
        .filter((file) => file.endsWith('.json'))
        .forEach((file) => {
          fs.unlinkSync(path.join(CACHE_DIR, file));
        });

      log('[FileCache CLEAR] All entries cleared.');
    } catch (error) {
      log('[FileCache ERROR] Failed to clear cache', error);
    }
  },
};
