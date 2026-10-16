import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

type CardProps = {
  hasHighlight: boolean;
};

export const Card = styled.div<CardProps>(({ theme, hasHighlight }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.rebrandingColors.palette.dark[60],
  justifyContent: 'center',
  padding: theme.padding.xs,
  borderRadius: theme.padding.xxs,
  ...(hasHighlight && {
    background: theme.rebrandingColors.gradients.blue,
    border: '0.5px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'border-box',
    boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[60]}`,
  }),
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    justifyContent: 'center',
  },
}));

export const Title = styled.span(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[40],
  fontSize: theme.typography.body.medium.fontSize,
}));

export const Value = styled.span(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[20],
  fontSize: theme.typography.subheadline.fontSize,
  fontWeight: theme.typography.subheadline.fontWeight,
  display: 'flex',
  justifyContent: 'center',
  gap: theme.padding.xxxs,
}));
