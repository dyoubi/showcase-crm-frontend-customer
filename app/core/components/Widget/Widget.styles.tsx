import { styled } from 'styled-components';

import { Flex } from '@/core/shared';

import { getTypography } from '@/themes/mixins';

export const Container = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  maxWidth: '90%',
}));

export const Title = styled.h3(({ theme }) => ({
  ...getTypography(theme.typography.subheadline),
  alignSelf: 'self-start',
  fontWeight: 700,
  fontSize: 22,
}));
