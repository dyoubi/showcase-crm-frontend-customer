import styled from 'styled-components';
import Link from 'next/link';

import { Flex } from '@/core/shared';
import { Text } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const Content = styled(Flex)<{ isLoading: boolean }>(({ theme, isLoading }) => ({
  flexDirection: 'column',
  gap: theme.padding.xs,
  borderRadius: 6,
  background: theme.rebrandingColors.gradients.blue,
  border: '0.5px solid transparent',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box',
  boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.backgroundColor}`,
  padding: '36px 13px',
  minWidth: 300,
  ...(isLoading && {
    justifyContent: 'center',
    alignItems: 'center',
  }),
}));

export const GameContainer = styled(Flex)({
  flexDirection: 'row',
  gap: 10,
  justifyContent: 'center',
});

export const ThumbnailContainer = styled.div(({ theme }) => ({
  flexShrink: 0,
  width: '160px',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: '120px',
  },

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    width: '100px',
  },
}));

export const DetailContainer = styled(Flex)({
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
});

export const TagContainer = styled(Flex)(({ theme }) => ({
  padding: `0 0 ${theme.padding.xxxs} 0`,
  flexDirection: 'row',
  flexWrap: 'wrap',
}));

export const RatingAndTagsContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  gap: 10,
}));

export const TagLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  margin: `0 4px 4px 0`,
  color: theme.rebrandingColors.palette.gray[20],
}));

export const GameTitle = styled(Text)(({ theme }) => ({
  marginRight: theme.margin.xxs,
  marginBottom: theme.margin.xxxs,
  fontWeight: 700,
  fontSize: theme.typography.heading.h4.fontSize,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: 20,
  },
}));

export const Provider = styled(Text)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.rebrandingColors.palette.gray[20],
}));

export const Rating = styled.div(({ theme }) => ({
  background: theme.rebrandingColors.gradients.blue,
  padding: '2px 8px 4px 8px',
  borderRadius: 11,
  fontSize: 14,
  width: 'fit-content',
}));
