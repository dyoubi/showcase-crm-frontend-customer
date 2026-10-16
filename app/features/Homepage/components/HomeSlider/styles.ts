import styled, { DefaultTheme } from 'styled-components';
import Slider from 'react-slick';

import { mq, screen } from '@/libs/media-query';

export const getArrowStyles = (theme: DefaultTheme) =>
  ({
    width: 51,
    height: 37,
    zIndex: 5,
    border: `1px solid ${theme.rebrandingColors.palette.light[20]}`,
    background: theme.rebrandingColors.palette.dark[60],
    transform: 'translateY(-21px)', // for improve arrow center
    cursor: 'pointer',
    ':before': {
      display: 'none', // this will hide the react-slick default arrow icon
    },
    '&:hover, &:focus': {
      background: theme.rebrandingColors.palette.dark[40],
    },
  } as const);

export const CarouselPrevArrow = styled.button(({ theme }) => ({
  ...getArrowStyles(theme),
  borderRadius: '6px 0 0 6px',
}));

export const CarouselNextArrow = styled.button(({ theme }) => ({
  ...getArrowStyles(theme),
  borderRadius: '0 6px 6px 0',
}));

export const StyledSlider = styled(Slider)<{
  isThumbnail?: boolean;
}>(({ theme, isThumbnail }) => ({
  minHeight: 470,
  '.slick-list': {
    borderRadius: '30px',
  },
  '.slick-slide': {
    paddingInline: isThumbnail ? theme.padding.xxs : 'unset',
  },

  [`${mq.with({ theme }).between(screen.MD, screen.XXL)}`]: {
    minHeight: 300,
  },

  [`${mq.with({ theme }).between(screen.SM, screen.MD)}`]: {
    minHeight: 180,
  },

  [`${mq.with({ theme }).until(screen.SM)}`]: {
    '.slick-slide': {
      paddingInline: isThumbnail ? theme.padding.xxxs : 'unset',
    },
  },
}));
