import styled from 'styled-components';

import { IconPlay } from '@/core/shared/Icons';
import { Button } from '@/core/shared/Button';

import { mq, screen } from '@/libs/media-query';

export const ButtonContainer = styled.div(({ theme }) => ({
  display: 'flex',
  marginTop: theme.margin.s,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.rebrandingColors.palette.light[20],
  border: 'none',
  borderRadius: 6,
  margin: '0 4px',
  cursor: 'pointer',
  transition: '0.2s',
  '&:last-of-type': {
    background: theme.rebrandingColors.palette.dark[60],
    color: theme.rebrandingColors.palette.gray[20],
    svg: {
      fill: theme.rebrandingColors.palette.gray[20],
    },
  },

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    background: theme.rebrandingColors.gradients.blue,
    margin: `0 ${theme.margin.xxxs}`,
    padding: theme.padding.xs,
    fontSize: 16,
    color: theme.rebrandingColors.palette.light[20],

    '&:hover': {
      filter: 'brightness(1.2)',
    },
  },
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    fontSize: 14,
    padding: theme.padding.xxs,
  },
}));

export const StyledIconPlay = styled(IconPlay)(({ theme }) => ({
  fill: theme.rebrandingColors.palette.light[20],
}));
