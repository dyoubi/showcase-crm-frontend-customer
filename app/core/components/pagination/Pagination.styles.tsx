import styled from 'styled-components';

import { ButtonDirection } from './Pagination.types';

export const PaginationContainer = styled.div({
  display: 'flex',
});

export const PaginationButton = styled.button<{ direction: ButtonDirection }>(({ theme, direction }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',
  height: '37px',
  background: 'inherit',
  border: '1px solid white',
  borderRadius: direction === ButtonDirection.LEFT ? '6px 0px 0px 6px' : '0px 6px 6px 0px',
  cursor: 'pointer',
  color: theme.rebrandingColors.palette.light[20],
  transition: 'background 0.2s ease-in-out',
  '&:first-of-type': {
    borderRight: 'none',
  },
  '&:hover:not([disabled])': {
    background: theme.rebrandingColors.colorsToBeDeprecated.dark[60],
  },
  '&:active:not([disabled])': {
    borderColor: theme.rebrandingColors.colorsToBeDeprecated.dark[20],
    outline: 'none',
    color: theme.rebrandingColors.colorsToBeDeprecated.dark[20],
  },
  ':disabled': {
    cursor: 'default',
    borderColor: theme.rebrandingColors.colorsToBeDeprecated.dark[20],
    outline: 'none',
    color: theme.rebrandingColors.colorsToBeDeprecated.dark[20],
  },
}));
