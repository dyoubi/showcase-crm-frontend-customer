import { FiatCodes } from '../currency';

export interface FreezePlayerAccountPayload {
  until: Date;
  accessToken: string | null | undefined;
}

export interface FreezePlayerAccountResponse {
  success: boolean;
  message: string;
}
export interface GetPlayerLimitResponse {
  limit: number;
  limitPeriod: string;
  currency: FiatCodes;
}

export interface UpdatePlayerLimitPayload {
  limitInfo: {
    limit: number;
    limitPeriod: string;
    currency: FiatCodes;
  };
  accessToken: string | null | undefined;
}

export interface UpdatePlayerLimitResponse {
  limit: number;
  limitPeriod: string;
  currency: FiatCodes;
}

export interface PlayerLimit {
  limit: number;
  limitPeriod: string;
  currency: FiatCodes;
}

export type PlayerLimitState = PlayerLimit;

export interface SelfExclusionResponse {
  success: boolean;
  message: string;
}
