import { Currency, CurrencyCodes, RingCoinsCurrencyData } from '../domains/currency';

type CurrenciesCache = {
  data: RingCoinsCurrencyData | null;
  timestamp: number | null;
};

class CryptoCurrenciesCache {
  private static instance: CryptoCurrenciesCache;

  private cache: CurrenciesCache = {
    data: null,
    timestamp: null,
  };

  private readonly CACHE_DURATION = 15 * 1000; // 15 seconds

  public static getInstance(): CryptoCurrenciesCache {
    if (!CryptoCurrenciesCache.instance) {
      CryptoCurrenciesCache.instance = new CryptoCurrenciesCache();
    }

    return CryptoCurrenciesCache.instance;
  }

  public getCurrencies(): RingCoinsCurrencyData | null {
    if (!this.cache.timestamp || !this.cache.data) {
      return null;
    }

    const isExpired = Date.now() - this.cache.timestamp > this.CACHE_DURATION;

    return isExpired ? null : this.cache.data;
  }

  public getCurrency(currency: CurrencyCodes): Currency | null {
    if (!this.cache.timestamp || !this.cache.data) {
      return null;
    }

    const isExpired = Date.now() - this.cache.timestamp > this.CACHE_DURATION;

    return !isExpired && this.cache.data[currency] ? this.cache.data[currency] : null;
  }

  public setCurrencies(currencies: RingCoinsCurrencyData): void {
    this.cache = {
      data: currencies,
      timestamp: Date.now(),
    };
  }
}

export const currenciesCache = CryptoCurrenciesCache.getInstance();
