import { IconBronzeBadge, IconGoldBadge, IconSilverBadge } from '@/core/shared/Icons';

export const IconBadgeMap: { [key: string]: typeof IconGoldBadge | typeof IconSilverBadge | typeof IconBronzeBadge } = {
  0: IconGoldBadge,
  1: IconSilverBadge,
  2: IconBronzeBadge,
};
