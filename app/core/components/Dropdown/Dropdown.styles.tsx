import styled from 'styled-components';

import { ArrowsContainer } from './DropdownContainer/DropdownContainer.styles';

export const DropdownWrapper = styled.div<{ fullWidth?: boolean }>(({ fullWidth }) => ({
  position: 'relative',
  display: 'inline-block',
  ...(fullWidth && {
    width: '100%',
  }),
}));

export const DropdownContent = styled.div<{
  isOpen: boolean;
  position: 'left' | 'right' | 'center';
  fullWidth?: boolean;
}>(({ isOpen, position, theme, fullWidth }) => ({
  display: isOpen ? 'block' : 'none',
  position: 'absolute',
  textAlign: 'center',
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  minWidth: fullWidth ? '100%' : 'fit-content',
  borderRadius: 6,
  zIndex: 1,
  top: '100%',
  marginTop: theme.margin.s,
  ...(position === 'left' && {
    left: '0',
    transform: 'translateX(0)',
  }),
  ...(position === 'right' && {
    left: 'auto',
    right: '0',
    transform: 'translateX(0)',
  }),
}));

export const DropdownButton = styled.div<{ open: boolean; fullWidth?: boolean }>(({ open, fullWidth }) => ({
  cursor: 'pointer',
  [ArrowsContainer]: {
    transform: 'rotate(0deg)',
    ...(open && {
      transform: 'rotate(180deg)',
    }),
  },
  ...(fullWidth && {
    width: '100%',
  }),
}));

export const DropdownActionContainer = styled.div(({ theme }) => ({
  cursor: 'pointer',
  marginBlock: theme.margin.xs,
}));
