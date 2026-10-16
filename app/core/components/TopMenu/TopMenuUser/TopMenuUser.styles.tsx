import styled from 'styled-components';

import { Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const TopMenuUserContainer = styled(Flex)({
  flexDirection: 'row',
  background: 'transparent',
  gap: 8,
});

export const TopMenuUserName = styled.span(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    display: 'none',
  },
}));
