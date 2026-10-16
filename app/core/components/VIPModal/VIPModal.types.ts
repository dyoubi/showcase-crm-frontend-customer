import { PlayerStatistics } from '@/core/domains/player';

export enum VIPModalTab {
  Vip = 'vip',
  Benefits = 'benefits',
  /* Lottery = 'lottery', */
  Bonus = 'bonus',
  Reload = 'reload',
}

export type ProgressProps = {
  rank: PlayerStatistics;
};
