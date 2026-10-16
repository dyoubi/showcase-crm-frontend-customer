import { currenciesCache, ratesCache } from '@/core/cache';

import { coinsApiRequest } from '../api';
import { CurrencyCodes, ECryptoCodes, EFiatCodes, RingCoinsCurrencyData } from './types';

export const getAllCurrencies = async () => {
  const cachedCurrencies = currenciesCache.getCurrencies();

  if (cachedCurrencies) {
    return cachedCurrencies;
  }

  const { data } = await coinsApiRequest.get<RingCoinsCurrencyData>(`/coins.json`);

  currenciesCache.setCurrencies(data);

  return data;
};

export const getCurrency = async (currencyCode: CurrencyCodes) => {
  const cachedCurrency = currenciesCache.getCurrency(currencyCode);

  if (cachedCurrency) {
    return cachedCurrency;
  }

  const data = await getAllCurrencies();

  return data[currencyCode];
};

const getCryptoFiatRateFromCasino = async (cryptoCurrency: Array<string>, fiatSymbol: string) => {
  const coinsStr = cryptoCurrency.map((coin) => `coin=${coin}`).join('&');

  const { data } = await coinsApiRequest.get(`/rates?reference=${fiatSymbol}&${coinsStr}&maxAge=${15 * 60 * 1000}`);

  // Transform array of rates into object with coin as key
  return data.rates.reduce((acc: { [key: string]: { [key: string]: number } }, rate: any) => {
    acc[rate.coin] = { [fiatSymbol]: rate.rate };

    return acc;
  }, {});
};

const getCryptoFiatsRatesFromCasino = async (cryptos: Array<string>) => {
  const promises = Object.values(EFiatCodes).map((fiatSymbol) => getCryptoFiatRateFromCasino(cryptos, fiatSymbol));
  const ratesByFiat = await Promise.all(promises);

  // Combine all rates into a single object
  return ratesByFiat.reduce((acc, fiatRates) => {
    Object.entries(fiatRates).forEach(([crypto, rates]) => {
      acc[crypto] = { ...acc[crypto], ...(typeof rates === 'object' && rates !== null ? rates : {}) };
    });

    return acc;
  }, {} as { [key: string]: { [key: string]: number } });
};

export const getCryptosFiatsRatesFromCasino = async () => {
  const cachedRates = ratesCache.getRates();

  if (cachedRates) {
    return cachedRates;
  }

  const rates = await getCryptoFiatsRatesFromCasino(Object.values(ECryptoCodes));

  ratesCache.setRates(rates);

  return rates;
};
