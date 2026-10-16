import { Balance } from '@/core/domains/balance';

import { CryptoCodes } from '../currency';

export enum ETransactionType {
  DEPOSITS = 'deposits',
  WITHDRAWALS = 'withdrawal',
  BETS = 'bets',
  OTHER = 'other',
  GAMES = 'games',
}

export type TransactionType = `${ETransactionType}`;

export type Operation = {
  id: string;
  amount: number;
  balance: Balance;
  category: ETransactionType;
  coin: CryptoCodes;
  created: string;
  reference: string;
  status: string;
  type: string;
  value: string;

  formattedAmount?: string;

  createdAt: string;
  updatedAt: string;
};

export type Bet = {
  bet: number;
  coin: CryptoCodes;
  date: string;
  eventId: string;
  machine: {
    id: string;
    activate: boolean;
    casinoId: string;
    created: string;
    createdBy: string;
    description: string;
    machineId: string;
    slug: string;
    thumbnailURL: string | null;
    title: string;
    updated: string;
    updatedBy: string;
  };
  multiplier: number;
  payout: number;
  win: number;
  formattedBet?: string;
  formattedWin?: string;
  username?: string;
};

export enum EDepositStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  REJECTED = 'rejected',
}
export type DepositStatus = `${EDepositStatus}`;

export type DepositTransaction = {
  id: string; // withdrawalId — Stored as externalId in the selected operation
  amount: string; // Stringify amountRequested value returned by BigNum
  currency: CryptoCodes; // Currency code, e.g. 'BTC', 'TRX', ...
  status: DepositStatus; // Withdrawal status: 'PAID', 'PENDING', or 'CANCELLED'.

  createdAt: string;
};

export type OtherTransactionsTransaction = {
  id: string;
  amount: string;
  currency: CryptoCodes;
  category: string;

  createdAt: string;
};

export enum EWithdrawalStatus {
  CANCELLED = 'cancelled',
  PAID = 'paid',
  PENDING = 'pending',
}
export type WithdrawalStatus = `${EWithdrawalStatus}`;

export type WithdrawalTransaction = {
  id: string; // withdrawalId — Stored as externalId in the selected operation
  address: string; // Requested wallet address
  amount: string; // Stringify amountRequested value returned by BigNum
  canCancel: boolean; // Flag enabled based on the current Withdrawal status defined in finance
  currency: CryptoCodes; // Currency code, e.g. 'BTC'
  fees: string; // Calculated fees
  status: WithdrawalStatus; // Parsed withdrawal status. This mapping correspond to the UX, not the finance value.

  createdAt: string;
};

export interface GetPlayerTransactionsRequest {
  accessToken: string | null | undefined;
  page: number;
}

export interface GetPlayerTransactionsResponse<T> {
  count: number;
  transactions: Array<T>;
}

export interface PostWithdrawRejectRequest {
  accessToken: string | null | undefined;
  withdrawalId: string;
}
