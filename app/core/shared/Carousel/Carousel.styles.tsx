import styled, { CSSObject, DefaultTheme } from 'styled-components';

import { StyledButton } from '../Button/Button.styles';

import { mq, screen } from '@/libs/media-query';

export const CarouselContainer = styled.div(({ theme }) => ({
  position: 'relative',

  '.slick-track': {
    display: 'flex',
    gap: theme.margin.xs,
  },
}));

export const NativeScrollViewport = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.margin.xs,
  overflowX: 'auto',
  overscrollBehaviorX: 'contain',
  WebkitOverflowScrolling: 'touch',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  paddingBottom: theme.padding.xs,
  '::-webkit-scrollbar': { display: 'none' },
}));

export const NativeScrollItem = styled.div({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
  width: '33.33%', // overridden dynamically via inline style if needed
});

export const CarouselHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 'auto',
  marginBottom: theme.margin.xs,
  paddingLeft: theme.padding.xs,
  p: {
    fontSize: theme.typography.heading.h5.fontSize,
  },
  svg: {
    marginRight: theme.margin.xs,
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
  },
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    p: {
      fontSize: theme.typography.subheadline.fontSize,
    },
  },
}));

export const getArrowStyles = (theme: DefaultTheme): CSSObject => ({
  position: 'absolute',
  top: -42,
  right: 5,
  borderRadius: '6px 0px 0px 6px',
  padding: theme.padding.xxs,
  cursor: 'pointer',
});

export const CarouselPrevArrow = styled(StyledButton)(({ theme }) => ({
  ...getArrowStyles(theme),
  right: 33,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    border: 'none',
    right: 39,
    boxShadow: 'rgb(0, 0, 0) -1px 2px 0px 0px, rgb(0, 0, 0) 1px -1px 0px 0px',
  },
}));

export const CarouselNextArrow = styled(StyledButton)(({ theme }) => ({
  ...getArrowStyles(theme),
  borderRadius: '0px 6px 6px 0px',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    border: 'none',
    borderRadius: '0px 6px 6px 0px',
    boxShadow: 'rgb(0, 0, 0) 1px 2px 0px 0px, rgb(0, 0, 0) 1px -1px 0px 0px',
  },
}));

export const CarouselCustomButton = styled(StyledButton)(({ theme }) => ({
  position: 'absolute',
  top: '-42px',
  right: '70px',
  cursor: 'pointer',
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  borderRadius: '6px',
  lineHeight: '18px',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    right: '3px',
  },
}));
