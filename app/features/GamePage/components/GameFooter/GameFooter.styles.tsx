import styled from 'styled-components';

import { Text } from '@/core/components/Typography/Text';

import { mq, screen } from '@/libs/media-query';

export const StyledFooterBar = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 6,
  background: theme.rebrandingColors.backgroundColor,
  padding: theme.padding.xs,
}));

export const LeftContainer = styled.div({
  display: 'flex',
});

export const RightContainer = styled(LeftContainer)({
  alignItems: 'center',
});

export const StyledButton = styled.button(({ theme }) => ({
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.margin.m,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    marginRight: 0,
  },
}));

export const StyledText = styled(Text)(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[40],
  margin: `0 ${theme.margin.xs}`,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    margin: 0,
  },
}));
