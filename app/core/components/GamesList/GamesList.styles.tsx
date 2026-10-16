import styled from 'styled-components';

import { Heading } from '@/core/components/Typography/Heading';

import { mq, screen } from '@/libs/media-query/media';

export const PageHeader = styled.div<{ img?: string }>(({ theme, img }) => ({
  maxWidth: 1105,
  background: img ? `url(${img})` : theme.rebrandingColors.colorsToBeDeprecated.yellow[80],
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
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
