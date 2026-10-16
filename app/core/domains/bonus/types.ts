import { ValueOf } from '@/utils/typescript';

import { CryptoCodes } from '../currency';

export enum EBonusType {
  AUTO = 'auto',
  FIXE = 'fixe',
  NEW = 'new', // Only implemented in Ring Office when creating a new bonus
  RETRIBUTION = 'retribution',
  RELOAD = 'reload',
}

export type BonusType = `${EBonusType}`;

interface RankOverride {
  [key: string]: {
    amount?: number;
    period?: number;
    loosePercent?: number;
    minimum?: number;
    maximum?: number;
  };
}

export interface RetributionBonusParameters {
  amount?: number;
  period?: number;
  loosePercent?: number;
  minimum?: number;
  maximum?: number;
  rankOverrides?: RankOverride;
}

export interface ReloadBonusParameters {
  amount?: number;
  period?: number;
  rankOverrides?: RankOverride;
}

export type AutoBonusAction = 'deposit';

export type BonusComputeMode = 'percent' | 'absolute';

export interface AutoBonusParameters extends ReloadBonusParameters {
  action?: AutoBonusAction;
  onetime?: boolean;
  lifetime?: number;
  filters?: { [key: string]: string | number | boolean };
  computeMode?: BonusComputeMode;
  useActionCurrency?: boolean;
  limitations?: Array<string>;
  minimum?: number;
  maximum?: number;
  // value?: number;
}

export interface Bonus {
  id: string;
  casinoId: string;
  code: string;
  createdAt: string;
  description: string;
  endAt: string;
  limitations: ReadonlyArray<CryptoCodes>;
  name: string;
  parameters: RetributionBonusParameters & ReloadBonusParameters & AutoBonusParameters;
  rateReference: string;
  startAt: string;
  type: BonusType;
}

export type GetPlayerBonusesResponse = ReadonlyArray<Bonus>;

export type ClaimedBonus = {
  amount: number;
  coin: string;
  unit: string;
};

export interface ClaimBonusPayload {
  bonusId: string;
  coin: CryptoCodes;
}

export type BonusAssignation = {
  id: string;
  bonus: Bonus;
  bonusId: string;
  createdAt: string;
  limitations: Array<string>;
  playerId: string;
  received: boolean;
  receivedAt?: string | null;
};

export type GetPlayerBonusAssignedResponse = ReadonlyArray<BonusAssignation>;
