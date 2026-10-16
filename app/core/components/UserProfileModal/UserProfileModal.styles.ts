import styled from 'styled-components';

import { Modal } from '@/core/shared/Modal';
import { Flex } from '@/core/shared';

import { Caption } from '../Typography';

import { mq, screen } from '@/libs/media-query';

export const ProfileModalContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 640,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    '&>*': { fontSize: theme.typography.body.small.fontSize },
    minWidth: 320,
  },
  padding: theme.padding.s,
}));

export const Date = styled.span(({ theme }) => ({
  lineHeight: theme.typography.subheadline.lineHeight,
  fontSize: theme.typography.caption.fontSize,
}));

export const Row = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: `${theme.margin.xxs} 0`,
  padding: `0 ${theme.margin.xxs}`,
  width: '100%',
}));

export const ProfileCaption = styled(Caption)(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[40],
  fontSize: theme.typography.caption.fontSize,
  fontWeight: 'unset',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    '&>*': { fontSize: theme.typography.body.small.fontSize },
  },
  marginBottom: theme.margin.s,
}));

export const ProfileHeader = styled(Flex)(({ theme }) => ({
  flexDirection: 'row',
  gap: 10,
  alignItems: 'center',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    '&>*': { fontSize: theme.typography.body.small.fontSize },
  },
  marginBottom: theme.margin.s,
}));

export const VipPin = styled.div(({ theme }) => ({
  padding: 6,
  color: theme.rebrandingColors.palette.dark[20],
  backgroundColor: '#DCFC35',
  borderRadius: 6,
  fontWeight: 700,
  '&:hover': {
    cursor: 'pointer',
  },
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: theme.typography.body.small.fontSize,
  },
}));

export const StatsContainer = styled.div(({ theme }) => ({
  width: '100%',
  marginTop: theme.margin.xs,
}));

export const StatsRow = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: theme.margin.xxs,
  gap: 10,
}));

export const TopWinnerGamesContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
  gap: 20,
  width: '100%',
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    '&>*': { fontSize: theme.typography.body.medium.fontSize },
  },
}));

export const GameStatsContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  width: '100%',
  marginTop: theme.margin.xs,
  gap: 10,
}));

export const ThumbnailWrapper = styled.div(({ theme }) => ({
  width: '33%',
  aspectRatio: '16/22',
}));
