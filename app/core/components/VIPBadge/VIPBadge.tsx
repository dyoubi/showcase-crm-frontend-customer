import { FC } from 'react';

import { Username, VIPBadgeBackground, VIPBadgeContainer } from './VIPBadge.styles';
import { VIPBadgeLevel, VIPBadgeProps, VIPBadgeSize } from './VIPBadge.types';

export const VIPBadge: FC<VIPBadgeProps> = ({ children, level = VIPBadgeLevel.Default, size = VIPBadgeSize.Large }) => (
  <VIPBadgeContainer level={level} size={size}>
    <VIPBadgeBackground level={level} size={size} id="badge-vip-level" data-testid="badge-vip-level">
      <Username size={size}>{children}</Username>
    </VIPBadgeBackground>
  </VIPBadgeContainer>
);
