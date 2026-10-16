import styled from 'styled-components';

import { Flex } from '@/core/shared';
import { Subheadline } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const CardContainer = styled.div<{ borderColor: string }>(({ theme, borderColor }) => ({
  color: theme.rebrandingColors.palette.light[20],
  width: '100%',
  padding: theme.padding.s,
  borderRadius: 8,
  fontSize: 14,

  background: borderColor,
  border: '2px solid transparent',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box',
  boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[80]}`,
  outline: 'none',
  height: 540,
}));

export const HeaderContainer = styled(Flex)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  svg: {
    height: 84,
  },
});

export const Title = styled(Subheadline)(({ theme }) => ({
  flexDirection: 'row',
  alignSelf: 'center',
  fontWeight: 700,
  fontSize: 22,
  marginBottom: 8,
  marginTop: 8,
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    fontSize: 18,
  },
}));

export const SubTitle = styled(Subheadline)(({ theme }) => ({
  flexDirection: 'row',
  alignSelf: 'center',
  fontWeight: 600,
  fontSize: 16,

  [`${mq.with({ theme }).between(screen.MD, screen.XXL)}`]: {
    fontSize: 14,
  },

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    fontSize: 12,
  },
}));
