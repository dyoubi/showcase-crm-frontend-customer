import styled from 'styled-components';

import { Box } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const PromotionGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: theme.margin.xl,
  maxWidth: 908,
  margin: '0 auto',
  textAlign: 'center',
  // Use grid-auto-rows to maintain consistent row heights
  gridAutoRows: 'min-content',
  // Ensure smooth transitions
  transition: 'all 0.3s ease-in-out',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    gridTemplateColumns: '1fr',
    gap: theme.margin.l,
  },
}));

export const HomeSliderBox = styled(Box)(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    display: 'none',
  },
}));

// export const ContainerBox = styled(Box)(({ theme }) => ({
//   marginTop: theme.margin.l,
//   paddingLeft: theme.padding.s,
//   paddingRight: theme.padding.s,
//   [`${mq.with({ theme }).until(screen.LG)}`]: {
//     marginTop: theme.margin.xxl,
//   },
// }));
