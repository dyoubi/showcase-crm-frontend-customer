import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const StyledProviderLogo = styled.picture(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 210,
  height: 72,
  background: theme.rebrandingColors.palette.dark[60],
  borderRadius: 6,
}));

export const ProviderLogoBox = styled.div<{ mr?: boolean }>(({ theme, mr = true }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 78,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    marginInlineEnd: mr ? theme.margin.m : 0,
  },
}));
