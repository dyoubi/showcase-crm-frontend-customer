import { styled } from 'styled-components';

import { Box, Flex } from '@/core/shared';
import { Subheadline } from '@/core/components/Typography';
import { LinkButton } from '@/core/shared/Button';
import { ButtonVariant } from '@/core/shared/Button/Button.types';

import { mq, screen } from '@/libs/media-query';

export const WidgetContainer = styled(Flex)(({ theme }) => ({
  gap: theme.margin.s,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    flexDirection: 'column',
  },
}));

export const WidgetCard = styled(Box)<{ background?: string }>(({ theme, background }) => ({
  background: background || theme.rebrandingColors.palette.dark[40],
  color: theme.rebrandingColors.palette.light[20],
  width: '100%',
  padding: theme.padding.s,
  borderRadius: 10,
  fontWeight: 400,
  fontSize: theme.typography.body.small.fontSize,
}));

export const Title = styled(Subheadline)({
  alignSelf: 'self-start',
  fontWeight: 700,
  fontSize: 22,
});

export const HeaderContainer = styled(Flex)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const CTAButton = styled(LinkButton)(({ theme, variant }) => ({
  padding: variant === ButtonVariant.Outlined ? '6px 16px' : '8px 16px',
  background: variant === ButtonVariant.Outlined ? 'transparent !important' : theme.rebrandingColors.gradients.blue,
  border: variant === ButtonVariant.Outlined ? ` 2px solid ${theme.rebrandingColors.palette.light[20]}` : 'none',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box',
  boxShadow: 'none',
}));
