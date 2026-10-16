import { FiatCodes } from '@/core/domains/currency';

export enum Periods {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  MONTHLY_THREE = 'monthly_three',
}

export type Period = Periods;

export type PeriodOptions = {
  label: JSX.Element;
  value: Period;
};

export interface FreezeAccountFormData {
  period: Period;
}

export type BetLimitCurrencyOptions = {
  label: JSX.Element;
  value: FiatCodes;
};

export interface BetLimitFormData {
  limit: string;
  limitPeriod: Period;
  currency: FiatCodes;
}

export interface SelfExclusionFormData {
  username: string;
}
