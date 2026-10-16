import styled from 'styled-components';

import { Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const LogoContainer = styled(Flex)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  marginLeft: 20,
  position: 'relative',
  width: 160,

  [`${mq.with({ theme }).until('384px')}`]: {
    width: 72,
  },

  [`${mq.with({ theme }).between('384px', screen.SM)}`]: {
    width: 84,
  },

  [`${mq.with({ theme }).between(screen.SM, screen.MD)}`]: {
    width: 120,
  },

  img: {
    objectFit: 'contain',
    width: '100%',
    height: 'auto',
  },
}));
