import styled from 'styled-components';

import { Flex } from '@/core/shared/Flex';
import { StyledButton } from '@/core/shared/Button/Button.styles';

export const ToggleContainer = styled(Flex)({
  flexDirection: 'row',
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
});
