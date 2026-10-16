import styled from 'styled-components';

import { Subheadline } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const PromotionDetailsImageContainer = styled.picture(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  marginBottom: theme.margin.xxs,
  // Desktop (1024px+): 992x538 aspect ratio
  aspectRatio: '1120 / 440',

  // Tablet (768px-1023px): 736x400 aspect ratio
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    aspectRatio: '736 / 400',
  },

  img: {
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    objectFit: 'contain', // Show full image without cropping
    display: 'block',
  },
}));

export const DateHeadline = styled(Subheadline)(({ theme }) => ({
  display: 'flex',
  fontSize: theme.typography.button.big.fontSize,
  fontWeight: theme.typography.heading.h4.fontSize,
  paddingBlock: '12px 36px',
  color: theme.rebrandingColors.palette.gray[20],
}));

export const DescriptionContainer = styled.div(({ theme }) => ({
  textAlign: 'justify',
}));

export const FooterText = styled.div(({ theme }) => ({
  color: theme.rebrandingColors.palette.gray[20],
  marginTop: '48px',
  fontSize: '14px',
}));

export const DescriptionText = styled.div(({ theme }) => ({
  color: theme.rebrandingColors.palette.gray[20],
}));
