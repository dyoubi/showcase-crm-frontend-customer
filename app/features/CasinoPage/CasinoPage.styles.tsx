import styled from 'styled-components';

import { Heading } from '@/core/components/Typography/Heading';

import { mq, screen } from '@/libs/media-query';

export const PageHeader = styled.div(({ theme }) => ({
  background: theme.rebrandingColors.colorsToBeDeprecated.yellow[80],
  display: 'flex',
  alignItems: 'center',
  marginTop: 61,
  marginBottom: theme.margin.m,
  padding: `${theme.padding.s} 96px`,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    display: 'flex',
    justifyContent: 'center',
    background: 'transparent',
    padding: 0,
    marginBottom: 0,
  },
}));

export const PageHeaderContentContainer = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: 1035,
  margin: '0 auto',
}));

export const StyledHeading = styled(Heading)({
  fontWeight: 700,
});

export const HeadingMobile = styled.h3(({ theme }) => ({
  fontSize: 18,
  textTransform: 'uppercase',
  marginTop: theme.margin.xxs,
  marginBottom: theme.margin.xxs,
}));

export const SearchBarContainer = styled.div(({ theme }) => ({
  margin: `0 auto ${theme.margin.xs}`,
  padding: `0 ${theme.padding.xl}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.margin.xs,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: 0,
    flexDirection: 'row',
  },
}));
