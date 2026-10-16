type RatesCache = {
  data: { [key: string]: { [key: string]: number } } | null;
  timestamp: number | null;
};

class CryptoRatesCache {
  private static instance: CryptoRatesCache;

  private cache: RatesCache = {
    data: null,
    timestamp: null,
  };

  private readonly CACHE_DURATION = 15 * 1000; // 15 seconds

  public static getInstance(): CryptoRatesCache {
    if (!CryptoRatesCache.instance) {
      CryptoRatesCache.instance = new CryptoRatesCache();
    }

    return CryptoRatesCache.instance;
  }

  public setRates(rates: { [key: string]: { [key: string]: number } }): void {
    this.cache = {
      data: rates,
      timestamp: Date.now(),
    };
  }

  public getRates(): { [key: string]: { [key: string]: number } } | null {
    if (!this.cache.timestamp || !this.cache.data) {
      return null;
    }

    const isExpired = Date.now() - this.cache.timestamp > this.CACHE_DURATION;

    return isExpired ? null : this.cache.data;
  }
}

export const ratesCache = CryptoRatesCache.getInstance();
