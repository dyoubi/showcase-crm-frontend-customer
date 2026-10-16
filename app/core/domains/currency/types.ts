// --------------------------------------------------------
// Types ingested from ring-coins
// --------------------------------------------------------

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimal_digits: number;
  fiat?: boolean;
  stable?: boolean;
}

// --------------------------------------------------------
// Types ingested from ring-office
// --------------------------------------------------------

export enum ECryptoCodes {
  BTC = 'BTC',
  ETH = 'ETH',
  TRX = 'TRX',
}

/*
  Defined as const instead of enum as we cannot use standard TS keywords
  nor have any process to union two different named unions.
*/
export const EInGameFiatCodes = {
  EUR: 'EUR',
  USD: 'USD',
} as const;

export const EFiatCodes = {
  ...EInGameFiatCodes,

  CAD: 'CAD',
  GBP: 'GBP',
} as const;

export type CryptoCodes = `${ECryptoCodes}`;
export type FiatCodes = `${keyof typeof EFiatCodes}`;
export type InGameFiatCodes = `${keyof typeof EInGameFiatCodes}`;

export type CurrencyCodes = CryptoCodes | FiatCodes;

// --------------------------------------------------------

export const AvailableCryptoCodes: Array<CryptoCodes> = Object.values(ECryptoCodes);
export const AvailableFiatCodes: Array<FiatCodes> = Object.values(EFiatCodes);

export type RingCoinsCurrencyData = {
  [code in CurrencyCodes]: Currency;
};

export interface GetCoinPriceResponse {
  bitcoin: { usd: number; eur: number };
  ethereum: { usd: number; eur: number };
  tron: { usd: number; eur: number };
}

export interface CryptoFiatRate {
  reference: string;
  coin: ECryptoCodes;
  fiat: FiatCodes;
  averageRate: string;
  date: string;
}

export type GetCryptoFiatRateResponse = ReadonlyArray<{
  id: string;
  date: string;
  reference: string;
  coinIso: FiatCodes;
  pairIso: CryptoCodes;
  rate: string;
  provider: string;
  coinId: string;
}>;

type CommonRateResponse = {
  rate: string;
  date: string;
};

export type GetCryptoFiatRateFromCasinoResponse = ReadonlyArray<{
  coinIso: string;
  rates: {
    USDT: CommonRateResponse;
    ETH: CommonRateResponse;
    TRX: CommonRateResponse;
    BTC: CommonRateResponse;
    EUROC: CommonRateResponse;
    USDC: CommonRateResponse;
  };
}>;
