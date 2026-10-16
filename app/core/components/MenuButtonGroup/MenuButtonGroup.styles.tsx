import styled from 'styled-components';

import { Text } from '@/core/components/Typography';
import { Button, Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const ButtonIcon = styled.div<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  width: 18,
  height: 18,
  backgroundColor: isSelected ? theme.rebrandingColors.palette.light[20] : theme.rebrandingColors.palette.light[40],
  borderRadius: '50%',
  alignSelf: 'center',
}));

export const ButtonContainer = styled(Flex)<{ hideOnMobile?: boolean }>(({ theme, hideOnMobile }) => ({
  display: 'flex',
  justifyContent: 'start',
  gap: theme.padding.s,
  width: '100%',
  marginBottom: theme.margin.m,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    display: hideOnMobile ? 'none' : 'flex',
    overflowX: 'auto',
  },

  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.rebrandingColors.palette.light[60],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#0066FE',
  },
}));

export const StyledText = styled(Text)({
  width: 'max-content',
});

export const MenuButton = styled(Button)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    // fontSize: 11,
    padding: theme.padding.xs,
  },
}));
