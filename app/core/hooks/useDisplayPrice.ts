import isNil from 'lodash/isNil';
import BigNumber from 'bignumber.js';

import { CryptoCodes, EFiatCodes, useConvertCryptoToFiat, useGetAllCurrenciesQuery } from '../domains/currency';
import { useAppCookies } from './useAppCookies';

interface FormatCryptoPriceParams {
  amount?: string | number;
  cryptoCode?: CryptoCodes;
  withoutCryptoUnit?: boolean;
  bypassUnitConversion?: boolean;
  maximumFractionDigits?: number;
  precision?: number;
}

interface FormatPriceParams {
  amount: string | number;
  currency: string;
  maximumFractionDigits?: number;
  locale?: string;
  withoutCryptoUnit?: boolean;
  roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision';
}

export const useDisplayPrice = () => {
  const {
    cookies: { locale: userLocale = 'en', displayInFiat, activeFiatCurrency = EFiatCodes.EUR },
  } = useAppCookies();
  const { data: currencyData } = useGetAllCurrenciesQuery();
  const convertCryptoToFiat = useConvertCryptoToFiat();

  const formatPrice = ({
    amount,
    currency,
    maximumFractionDigits = 2,
    locale = userLocale,
    withoutCryptoUnit = false,
    roundingPriority = 'auto', // added new parameter
  }: FormatPriceParams) => {
    const parsedAmount = BigNumber(amount).toNumber();

    if (withoutCryptoUnit) {
      return new Intl.NumberFormat(locale, {
        maximumFractionDigits,
        currency,
        roundingPriority,
      }).format(parsedAmount);
    }

    return new Intl.NumberFormat(locale, {
      maximumFractionDigits,
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
      roundingPriority,
    }).format(parsedAmount);
  };

  const formatCryptoPrice = ({
    amount,
    cryptoCode,
    withoutCryptoUnit = false,
    bypassUnitConversion = false,
    maximumFractionDigits = 20,
  }: FormatCryptoPriceParams) => {
    if (isNil(amount) || amount === '' || !cryptoCode || !currencyData?.[cryptoCode]) {
      return '–';
    }

    const precision = currencyData[cryptoCode].decimal_digits;

    if (displayInFiat) {
      const amountInFiat = convertCryptoToFiat({
        amount,
        cryptoCode,
        fiatCode: activeFiatCurrency,
        ignoreUnit: bypassUnitConversion,
        precision,
      });

      return formatPrice({ amount: amountInFiat, currency: activeFiatCurrency, locale: userLocale });
    }

    const parsedAmount = BigNumber(amount)
      .dividedBy(10 ** precision)
      .toFixed(maximumFractionDigits);

    return formatPrice({
      amount: parsedAmount,
      currency: cryptoCode,
      locale: userLocale,
      maximumFractionDigits: 8,
      withoutCryptoUnit,
      roundingPriority: 'morePrecision',
    });
  };

  return {
    formatCryptoPrice,
    formatPrice,
  };
};
