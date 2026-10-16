import styled from 'styled-components';

import { Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const LogoContainer = styled(Flex)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  marginLeft: 20,
  position: 'relative',
  width: 260,

  [`${mq.with({ theme }).until('384px')}`]: {
    width: 180,
  },

  [`${mq.with({ theme }).between('384px', screen.SM)}`]: {
    width: 220,
  },

  img: {
    objectFit: 'contain',
    width: '100%',
    height: 'auto',
  },
}));

export const BlockedPageContainer = styled.div(() => ({
  height: 'calc(100vh)',
  overflowY: 'auto',
  overflowX: 'hidden',
  display: 'flex',
  padding: '0 20px',
  paddingTop: 30,
  paddingBottom: 10,
  gap: 20,
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundImage: `url('/images/blocked-bg.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const SorryImg = styled.img(({ theme }) => ({
  height: 300,
  width: 'auto',
  marginTop: 20,
  [`${mq.with({ theme }).between('384px', screen.SM)}`]: {
    height: 250,
  },

  [`${mq.with({ theme }).until('384px')}`]: {
    height: 180,
  },
}));

export const Title = styled.p(({ theme }) => ({
  fontSize: 40,
  maxWidth: '17ch',
  margin: '0 auto',
  fontWeight: 600,
  lineHeight: '1.2',

  [`${mq.with({ theme }).until('384px')}`]: {
    maxWidth: '14ch',
    fontSize: 30,
  },
}));

export const Subtitle = styled.p(({ theme }) => ({
  fontSize: 22,

  [`${mq.with({ theme }).until('384px')}`]: {
    fontSize: 16,
  },
}));

export const BottomText = styled.p(({ theme }) => ({
  fontSize: 18,

  [`${mq.with({ theme }).until('384px')}`]: {
    fontSize: 14,
  },
}));
