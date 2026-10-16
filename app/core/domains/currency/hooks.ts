import BigNumber from 'bignumber.js';

import { useGetAllCurrenciesQuery, useGetCryptosFiatsRatesFromCasinoQuery, useGetCurrencyQuery } from './currencySlice';
import { CryptoCodes, FiatCodes } from './types';

type ConvertInFiat = {
  amount: string | number;
  cryptoCode: CryptoCodes;
  fiatCode: FiatCodes;
  ignoreUnit?: boolean;
  precision?: number;
};

export const useConvertCryptoToFiat = () => {
  const { data: cryptosRates } = useGetCryptosFiatsRatesFromCasinoQuery(undefined);
  const { data: currencyData } = useGetAllCurrenciesQuery();

  return ({ amount, cryptoCode, fiatCode, ignoreUnit = false }: ConvertInFiat) => {
    const precision = currencyData?.[cryptoCode].decimal_digits || 0;
    const rate = Number(cryptosRates?.[cryptoCode]?.[fiatCode] || 0);

    if (ignoreUnit) {
      return BigNumber(amount).multipliedBy(rate).toFixed();
    }

    return BigNumber(amount)
      .multipliedBy(rate)
      .dividedBy(10 ** precision)
      .toFixed();
  };
};

export const useGetCryptoToFiatConversion = () => {
  const { data: cryptosRates } = useGetCryptosFiatsRatesFromCasinoQuery(undefined);

  return ({ cryptoCode, fiatCode }: ConvertInFiat) => {
    const rate = Number(cryptosRates?.[cryptoCode]?.[fiatCode] || 0);

    return rate;
  };
};
