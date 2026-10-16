// import { BUTTON_CONTENT_BY_INDEX } from './constants';

import { ReactNode } from 'react';

import { BlockElement } from '@/core/domains/content';

export interface SliderRef {
  slideTo?: (page: number) => void;
}
// export type ButtonContentIndex = keyof typeof BUTTON_CONTENT_BY_INDEX;

export type VipLevel = {
  id: string;
  articleKey: string;
  icon: ReactNode;
  iconSmall: ReactNode;
  title: string;
  titleDefault: string;
  financialDetails: string;
  featuresList: Array<BlockElement>;
  featureColor: string;
};

export type RankBasedContent = {
  progress: string;
  fromLevelContent: ReactNode;
  fromLevelIcon: ReactNode;
  toLevelContent: ReactNode;
  toLevelIcon: ReactNode;
};

export enum VIP_LEVEL_MAX_POINTS {
  EARLY_ADOPTER = 1_000,
  SATOSHI_ENTHUSIAST = 25_000,
  BLOCK_EXPERT = 100_000,
  LUCKY_MINER = 500_000,
  MASTER_TRADER = 1_000_000,
  WHALE = 10_000_000,
  GENESIS_LEGEND = 100_000_000,
}
