import { CryptoCodes, FiatCodes } from '@/core/domains/currency';

export type BetType = 'bet' | 'win';
export type BetCoinType = CryptoCodes;

export type BetResponse = {
  player: {
    nickname: string;
    id: string;
    privacy: {
      rain: boolean;
      statistics: boolean;
    };
    casinoId: string;
  };
  machine: {
    key: string;
    id: string;
    title: string;
  };
  action: {
    type: BetType;
    amount: number;
    payout: number;
    coin: BetCoinType;
    multiplier: number;
    timestamp: string;
    data: {
      type: BetType;
      id: string;
      game: {
        amount: number;
        payout: number;
        coin: BetCoinType;
      };
      balance: {
        amount: number;
        payout: number;
        coin: BetCoinType;
      };
      timestamp: string;
    };
  };
};

export type GetBetsResponse = ReadonlyArray<BetResponse>;

export interface GetBetsParams {
  type: string;
  accessToken?: any;
}

export type Operation = {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  reference: string;
  value: string;
  coin: BetCoinType;
  type: number;
  category: string;
  lookup: string;
  externalId: string;
  balanceId: string;
  accountId: string;
};

export type GameAction = {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  externalId: string;
  type: BetType;
  state: string;
  amount: number;
  data: {
    action: BetType;
    amount: number;
    action_id: string;
  };
  balanceBefore: number;
  balanceAfter: number;
  gameId: string;
  operation: Operation;
};

export type GameResponse = {
  id: string;
  finished: boolean;
  inGameCurrency: FiatCodes;
  balanceCurrency: BetCoinType;
  actions: Array<GameAction>;
  machine: {
    key: string;
    id: string;
    title: string;
  };
  machineId: string;
  payout: number;
};

export type GetGamesResponse = Array<GameResponse>;

export interface GetGamesCountResponse {
  count: number;
}
