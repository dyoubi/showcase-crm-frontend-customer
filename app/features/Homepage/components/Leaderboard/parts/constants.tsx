import { VIPBadgeLevel } from '@/core/components/VIPBadge/VIPBadge.types';

export const VIPLevelMap: { [key: string]: VIPBadgeLevel } = {
  0: VIPBadgeLevel.Gold,
  1: VIPBadgeLevel.Silver,
  2: VIPBadgeLevel.Bronze,
} as const;
