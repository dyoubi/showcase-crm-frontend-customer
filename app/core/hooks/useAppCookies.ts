import { isNil } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useCookies as useReactCookies } from 'react-cookie';

import {
  ACTIVE_BALANCE,
  ACTIVE_FIAT_CURRENCY,
  DISPLAY_IN_FIAT,
  DISPLAY_MOCKED,
  LOCALE,
} from '@/core/constants/cookies';

import { CryptoCodes, ECryptoCodes, EFiatCodes, FiatCodes } from '../domains/currency';

// This interface represent the state of the cookie in the navigator all values must be string
interface CookiesRawState {
  [ACTIVE_BALANCE]?: CryptoCodes | '';
  [ACTIVE_FIAT_CURRENCY]?: FiatCodes | '';
  [DISPLAY_IN_FIAT]?: 'true' | 'false' | '';
  [LOCALE]?: 'en' | 'fr' | '';
  [DISPLAY_MOCKED]?: 'true' | 'false' | '';
}

/**
 * This interface represent the state of the cookies in the app after being transformed
 * some values are transformed (like boolean) for improve dev experience
 * */
interface CookiesTransformedState extends Omit<CookiesRawState, typeof DISPLAY_IN_FIAT | typeof DISPLAY_MOCKED> {
  [DISPLAY_IN_FIAT]?: boolean;
  [DISPLAY_MOCKED]?: boolean;
}

type CookiesNames = keyof CookiesRawState;

const transformStringToBoolean = (value?: string) => (isNil(value) ? undefined : value === 'true');

const firstRenderCookiesState: any = {
  activeBalance: ECryptoCodes.BTC,
  activeFiatCurrency: EFiatCodes.EUR,
  displayInFiat: false,
  locale: 'fr',
  displayMocked: false,
};

export const useAppCookies = () => {
  const [cookiesRaw, setCookie] = useReactCookies<CookiesNames, CookiesRawState>([
    ACTIVE_BALANCE,
    ACTIVE_FIAT_CURRENCY,
    DISPLAY_IN_FIAT,
    LOCALE,
    DISPLAY_MOCKED,
  ]);

  const activeBalance = cookiesRaw[ACTIVE_BALANCE] || undefined;
  const activeFiatCurrency = cookiesRaw[ACTIVE_FIAT_CURRENCY] || undefined;
  const locale = cookiesRaw[LOCALE] || undefined;

  const displayInFiat = transformStringToBoolean(cookiesRaw[DISPLAY_IN_FIAT]);
  const displayMocked = transformStringToBoolean(cookiesRaw[DISPLAY_MOCKED]);

  const cookiesTransformed = useMemo(
    () => ({ activeBalance, activeFiatCurrency, displayInFiat, locale, displayMocked }),
    [activeBalance, activeFiatCurrency, displayInFiat, locale, displayMocked],
  );

  const setAppCookie = useCallback(
    <TName extends CookiesNames = CookiesNames>(
      name: TName,
      value: CookiesTransformedState[TName] | undefined | null | '',
      // all the values must be string thats why me must stringify it
    ) => {
      setCookie(name, JSON.stringify(value || ''));
    },
    [setCookie],
  );

  // TODO: TypeScript fix the types CBP-102-game-wrong-balance
  const getUpdatedCookies = (defaultCookies: any, transformedCookies: any) => {
    const updatedCookies = { ...defaultCookies, ...transformedCookies };

    Object.keys(updatedCookies).forEach((key) => {
      if (defaultCookies[key] === undefined && transformedCookies[key] !== undefined) {
        updatedCookies[key] = transformedCookies[key];
      } else if (transformedCookies[key] === undefined && defaultCookies[key] !== undefined) {
        updatedCookies[key] = defaultCookies[key];
      }
    });

    return updatedCookies;
  };

  return {
    // this condition is used for prevent this error https://nextjs.org/docs/messages/react-hydration-error
    cookies: getUpdatedCookies(firstRenderCookiesState, cookiesTransformed),
    setCookie: setAppCookie,
  };
};

export { ACTIVE_BALANCE, ACTIVE_FIAT_CURRENCY, DISPLAY_IN_FIAT, DISPLAY_MOCKED, LOCALE };
