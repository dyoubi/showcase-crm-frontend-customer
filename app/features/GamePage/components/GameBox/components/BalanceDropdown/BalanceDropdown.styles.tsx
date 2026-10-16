import styled from 'styled-components';

import { Text } from '@/core/components/Typography';
import { Flex } from '@/core/shared';
import { DropdownContainer } from '@/core/components/Dropdown';

import { getTypography } from '@/themes/mixins';

export const BalanceBox = styled.div({
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  width: 'fit-content',
});

export const StyledDropdownContainer = styled(DropdownContainer)(({ theme }) => ({
  ...getTypography(theme.typography.body.small),
  display: 'flex',
  alignItems: 'center',
  background: theme.rebrandingColors.palette.dark[20],
  width: 150,
  padding: theme.padding.xxs,
  borderRadius: 6,
  justifyContent: 'space-between',
}));

export const CurrencyText = styled.span({
  marginLeft: 4,
  marginRight: 2,
});

export const StyledText = styled(Text)({
  margin: '0 4px',
});

export const CurrencyContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
}));
