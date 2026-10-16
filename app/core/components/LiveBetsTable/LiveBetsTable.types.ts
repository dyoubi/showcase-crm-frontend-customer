import { ReactNode } from 'react';

// BetModes.ts
export const BetModes = {
  ALL_BETS: 'ALL_BETS' as const,
  MY_BETS: 'MY_BETS' as const,
};

export type BetTableMode = (typeof BetModes)[keyof typeof BetModes];

export interface BetsTableProps {
  children?: ReactNode;
  selectedMode?: typeof BetModes;
  id?: string;
}
