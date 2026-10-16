import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const GameListContainer = styled.div(({ theme }) => ({
  margin: '0 auto',
  padding: `0 ${theme.padding.xl}`,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: 0,
  },
}));

export const GamesContainer = styled.div<{ isEmpty?: boolean }>(({ theme, isEmpty = false }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: theme.margin.s,
  padding: `0 ${theme.margin.s}`,
  width: '100%',

  ...(isEmpty && {
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: theme.padding.s,
    alignItems: 'center',
    textAlign: 'center',
  }),

  // Desktop large screens: 6 columns
  [`${mq.with({ theme }).from(screen.XL)}`]: {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },

  // Desktop medium screens: 4 columns
  [`${mq.with({ theme }).from(screen.LG)} and ${mq.with({ theme }).until(screen.XL)}`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  // Tablet: 4 columns
  [`${mq.with({ theme }).from(screen.SM)} and ${mq.with({ theme }).until(screen.LG)}`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.margin.xs,
  },

  // Mobile: 3 columns
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.margin.xs,
  },
}));

export const ButtonContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    marginBottom: theme.margin.xxs,
  },
}));

export const GameItemWrapper = styled.div({
  display: 'block',
  width: '100%',
  height: '100%',
  textDecoration: 'none',
  color: 'inherit',
});
