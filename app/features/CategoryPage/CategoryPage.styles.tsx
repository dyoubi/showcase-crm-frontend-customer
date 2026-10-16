import styled from 'styled-components';

import { Heading } from '@/core/components/Typography/Heading';
import { Text } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const PageHeader = styled.div<{ img?: string }>(({ theme, img }) => ({
  maxWidth: 1105,
  background: img ? `url(${img})` : theme.rebrandingColors.colorsToBeDeprecated.yellow[80],
  backgroundSize: 'contain',
  display: 'flex',
  alignItems: 'center',
  margin: '61px auto 16px',
  padding: 9,
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
  marginLeft: theme.margin.xs,
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
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: theme.margin.xs,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: 0,
    flexDirection: 'row',
  },
}));

export const StyledText = styled(Text)({
  width: 'max-content',
});

export const SliderContainer = styled.div(({ theme }) => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  // Desktop 1400px+ -> 2 slides, aspect ratio based on typical desktop layout
  aspectRatio: '16 / 4', // Wide aspect ratio for 2-slide layout

  // Medium tablet 766px -> 1 slide, balanced ratio
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    aspectRatio: '16 / 11',
  },
}));
