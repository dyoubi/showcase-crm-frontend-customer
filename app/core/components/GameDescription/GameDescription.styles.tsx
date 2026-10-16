import styled from 'styled-components';

import { Flex } from '@/core/shared';

import { Text } from '../Typography';

export const Content = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.padding.xs,
  borderRadius: 6,
  background: theme.rebrandingColors.backgroundColor,
  padding: '36px 13px',
}));

export const DescriptionBox = styled.div({
  margin: '0 10px',
});

export const Description = styled(Text)(({ theme }) => ({
  marginBottom: theme.margin.s,
  color: theme.rebrandingColors.palette.gray[20],
}));

export const ButtonContainer = styled(Flex)<{ hideOnMobile?: boolean }>(({ theme, hideOnMobile }) => ({
  display: 'flex',
  gap: '10px',
  overflow: 'auto',
  flexWrap: 'nowrap',
  justifyContent: 'start',
  width: '100%',
  marginBottom: theme.margin.s,
}));
