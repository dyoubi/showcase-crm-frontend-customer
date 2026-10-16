import styled from 'styled-components';

import { Button, Flex } from '@/core/shared';
import { CheckboxWrapper } from '@/core/shared/Checkbox/Checkbox.styles';

import { DropdownContainer, DropdownItem } from '../Dropdown';
import { ItemContent } from '../Dropdown/DropdownItem/DropdownItem.styles';

export const StyledDropdownContainer = styled(DropdownContainer)<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  ...(fullWidth && {
    width: '100%',
    justifyContent: 'space-between',
  }),
}));

export const StyledDropdownItem = styled(DropdownItem)(({ theme }) => ({
  padding: theme.padding.xxs,
  [ItemContent]: {
    justifyContent: 'start',
    width: '100%',
  },
  label: {
    fontWeight: theme.typography.heading.h1.fontWeight,
    textAlign: 'start',
  },
  [CheckboxWrapper]: {
    width: '100%',
  },
}));

export const ProviderContainer = styled(Flex)(({ theme }) => ({
  padding: theme.padding.xxs,
  maxHeight: 270,
  overflowY: 'auto',
  marginBottom: theme.margin.xs,

  '&::-webkit-scrollbar': {
    width: '6px',
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

export const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.margin.xs,
  alignSelf: 'center',
}));
