import { styled } from 'styled-components';

import { Box, Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const SelectInputContainer = styled(Flex)(({ theme }) => ({
  gap: 10,

  [`${mq.with({ theme }).until(screen.SM)}`]: {
    width: '100%',

    '& > *:last-child': {
      flex: '1',
    },
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  columnGap: theme.margin.xxs,
  marginBottom: theme.margin.m,

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    flexDirection: 'column',
    rowGap: theme.margin.s,
    alignItems: 'start',
  },
}));
