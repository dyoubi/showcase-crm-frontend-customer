export interface Balance {
  id: string;
  value: string;
  coin: 'ETH' | 'BTC' | 'TRX';
  precision: number;
  unit: 'wei' | 'sun' | 'sat';
  accountId: string;
}

export type BalanceUnit = 'wei' | 'sun' | 'sat';

export type GetPlayerBalancesResponse = ReadonlyArray<Balance>;
