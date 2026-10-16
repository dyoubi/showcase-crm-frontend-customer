import styled from 'styled-components';

import { Headline, Subheadline } from '@/core/components/Typography';
import { Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const PromotionImage = styled.picture(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '200px', // Fixed height to prevent layout shift
  marginBottom: theme.margin.xxs,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  // backgroundColor: theme.rebrandingColors.palette.gray[20], // Placeholder background

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    height: '160px', // Smaller height for mobile
  },

  img: {
    borderRadius: '6px',
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure image covers the container without distortion
    objectPosition: 'center',
    transition: 'opacity 0.3s ease-in-out',
  },
}));

export const PromotionBoxWrapper = styled.div({
  cursor: 'default',
  width: '100%',
  // Ensure consistent aspect ratio across all promotion boxes
  minHeight: '280px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',

  '&:hover': {
    transform: 'translateY(-2px)',
  },

  [`@media (max-width: 768px)`]: {
    minHeight: '240px',
  },
  height: '100%',
});

export const PromotionHeadline = styled(Headline)(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: theme.typography.subheadline.fontSize,
  },
}));

export const PromotionSubheadline = styled(Subheadline)(({ theme }) => ({
  cursor: 'pointer',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: theme.typography.subheadline.fontSize,
  },
}));

export const PromotionHeaderContainer = styled(Flex)({
  flexDirection: 'column',
  alignItems: 'start',
  gap: 10,
});

export const PromotionSubHeadlineAndIconContainer = styled(Flex)({
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
  svg: {
    alignSelf: 'center',
    paddingBottom: 4,
  },
});
