import styled from 'styled-components';

import { Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

type ContainerProps = {
  activeColor: string;
};

export const Container = styled(Flex)<ContainerProps>(({ activeColor, theme }) => ({
  overflow: 'hidden',
  flexWrap: 'wrap',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  listStyle: 'none',
  position: 'absolute',
  '*.slick-active button': {
    background: activeColor,
    color: theme.rebrandingColors.palette.dark[80],
  },
  [`${mq.with({ theme }).from(screen.LG)} and ${mq.with({ theme }).until(screen.XL)}`]: {
    top: '-130px',
  },
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    top: '-60px',
    overflow: 'auto',
    flexWrap: 'nowrap',
    paddingInline: theme.padding.s,
    justifyContent: 'start',
    '::-webkit-scrollbar': {
      height: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      background: theme.rebrandingColors.palette.dark[60],
      borderRadius: '8px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
      transition: 'background 0.3s ease',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: `linear-gradient(135deg, ${theme.rebrandingColors.palette.dark[80]}, ${theme.rebrandingColors.palette.dark[60]})`,
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: theme.rebrandingColors.palette.dark[80],
      borderRadius: '10px',
      marginInline: '10px',
    },
  },
  top: '-100px',
  width: '100%',
}));
