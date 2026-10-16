import { styled } from 'styled-components';

import { Box, Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const BannerCard = styled(Box)(({ theme }) => ({
  background: theme.rebrandingColors.palette.dark[40],
  border: `3px solid ${theme.rebrandingColors.gradients.green}`,
  borderImage: theme.rebrandingColors.gradients.green,
  borderImageSlice: 1,
  borderRadius: 16,
  padding: theme.padding.l,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    padding: '3px',
    background: theme.rebrandingColors.gradients.green,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    padding: theme.padding.s,
  },
}));

export const BannerContent = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  gap: 16,
  alignItems: 'flex-start',
  position: 'relative',
  zIndex: 1,
  justifyContent: 'space-between',

  [`${mq.with({ theme }).from(screen.MD)}`]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const LeftContent = styled(Flex)({
  flexDirection: 'column',
  gap: 16,
  alignItems: 'flex-start',
  flex: 1,
});

export const Title = styled.h2<{ isTabletOrPhone?: boolean }>(({ theme, isTabletOrPhone }) => ({
  color: theme.rebrandingColors.palette.light[20],
  fontSize: isTabletOrPhone ? 18 : 30,
  fontWeight: 700,
  lineHeight: isTabletOrPhone ? '26px' : '40px',
  margin: 0,
  // maxWidth: 600,
}));

export const PaymentIconsContainer = styled(Flex)<{ isTabletOrPhone?: boolean }>(({ isTabletOrPhone }) => ({
  gap: isTabletOrPhone ? 8 : 12,
  alignItems: 'center',
  justifyContent: isTabletOrPhone ? 'flex-start' : 'flex-start',
  flexWrap: isTabletOrPhone ? 'nowrap' : 'wrap',
  // Keep items on a single line on small devices and allow horizontal scroll if needed
  overflowX: isTabletOrPhone ? 'auto' : 'visible',
  WebkitOverflowScrolling: isTabletOrPhone ? 'touch' : 'auto',
}));

export const PaymentIcon = styled.img(({ theme }) => ({
  height: 40,
  width: 'auto',
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  padding: '8px 16px',
  borderRadius: 8,

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    height: 32,
    padding: '6px 12px',
  },
}));

export const PaymentLogoWrapper = styled.div(({ theme }) => ({
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  padding: '8px 16px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 76,
  height: 48,

  img: {
    objectFit: 'contain',
    maxWidth: '100%',
    height: 'auto',
  },

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    minWidth: 56,
    height: 36,
    padding: '6px 8px',
    marginRight: 6,
  },
}));

export const BuyButton = styled.button(({ theme }) => ({
  background: theme.rebrandingColors.gradients.green,
  color: theme.rebrandingColors.palette.dark[10],
  border: 'none',
  borderRadius: 8,
  padding: '12px 32px',
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform 0.2s ease, opacity 0.2s ease',

  '&:hover': {
    opacity: 0.9,
    transform: 'translateY(-2px)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    padding: '10px 24px',
    fontSize: 14,
  },
}));
