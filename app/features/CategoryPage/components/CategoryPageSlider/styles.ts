import styled, { DefaultTheme } from 'styled-components';
import Slider from 'react-slick';

import { Flex } from '@/core/shared';

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

export const StyledCategorySlider = styled(Slider)<{
  isThumbnail?: boolean;
  inCategory?: boolean;
}>(({ theme, isThumbnail }) => ({
  minHeight: 'auto',
  '.slick-list': {
    borderRadius: '10px',
  },
  '.slick-slide': {
    paddingInline: isThumbnail ? theme.padding.xxs : 'unset',
    // Let PromotionBox handle its own sizing
    '> *': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    minHeight: 200,
    '.slick-slide': {
      paddingInline: isThumbnail ? theme.padding.xxxs : 'unset',
      '> *': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
}));

export const Container = styled(Flex)(({ theme }) => ({
  overflow: 'hidden',
}));

export const Ul = styled.ul({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  padding: 0,
  margin: 0,
  gap: '10px',
});

export const Box = styled.div<{ isPhone?: boolean }>(({ theme, isPhone }) => ({
  display: 'flex',
  alignItems: 'center',
  height: isPhone ? 10 : 20,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  paddingLeft: theme.padding.m,
  paddingRight: theme.padding.m,

  li: {
    display: 'flex',
    padding: 0,
    alignItems: 'center',
    listStyle: 'none',
    borderRadius: '7px',
    background: theme.rebrandingColors.palette.dark[60],
  },

  '*.slick-active': {
    background: theme.rebrandingColors.gradients.blue,
  },
}));

export const IconPaging = styled.div({
  cursor: 'pointer',
  width: '30px',
  height: '5px',
});
