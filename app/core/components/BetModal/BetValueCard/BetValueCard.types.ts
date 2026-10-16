import { CryptoCodes } from '@/core/domains/currency';

export type BetValueCardProps = {
  title: string;
  value: string;
  hasHighlight: boolean;
  cryptoCode?: CryptoCodes;
};
