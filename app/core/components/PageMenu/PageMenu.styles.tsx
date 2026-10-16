import styled from 'styled-components';

import { ButtonGroup } from '@/core/shared/ButtonGroup';
import { Button } from '@/core/shared/Button/Button';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';

import { DropdownContainer } from '../Dropdown';

export const StyledPageMenu = styled.div(({ theme }) => ({
  width: 168,
  border: `1px solid ${theme.rebrandingColors.palette.light[20]}4A`,
}));

export const MenuItem = styled.div<{ isActive: boolean }>(({ theme, isActive }) => ({
  borderBottom: isActive ? 'none' : `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.dark[40]}`,
  padding: theme.padding.s,
  background: isActive && theme.rebrandingColors.colorsToBeDeprecated.dark[20],
  '&:hover': {
    background: theme.rebrandingColors.colorsToBeDeprecated.dark[60],
    cursor: 'pointer',
  },
}));

export const MenuButton = styled(Button).attrs({
  color: ButtonColor.Tertiary,
  size: ButtonSize.Medium,
})(({ theme, isSelected }) => ({
  width: 'inherit',
  padding: theme.padding.xxs,
  borderColor: 'white',
}));

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  marginBottom: theme.margin.xs,
}));

export const StyledDropdownContainer = styled(DropdownContainer)(({ theme }) => ({
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: theme.rebrandingColors.palette.dark[60],
}));
