import styled from 'styled-components';

import { StyledButton } from '../Button/Button.styles';
import { ButtonGroupProps } from './ButtonGroup.types';

export const StyledButtonGroup = styled.div<ButtonGroupProps>(() => ({
  [StyledButton]: {
    '&': {
      borderRadius: 0,
      borderRightWidth: 0,
    },

    '&:first-child': {
      borderRightWidth: 1,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },

    '&:nth-child(2)': {
      borderLeftWidth: 0,
    },

    '&:last-child': {
      borderRightWidth: 1,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
  },
}));
