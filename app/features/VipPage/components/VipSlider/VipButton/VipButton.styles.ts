import styled from 'styled-components';

import { Button } from '@/core/shared';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';

export const StyledButton = styled(Button).attrs({
  size: ButtonSize.Small,
  color: ButtonColor.Tertiary,
})(({ theme }) => ({
  fontSize: theme.typography.button.medium.fontSize,
}));

export const ButtonIcon = styled.div(({ theme }) => ({
  width: 18,
  height: 18,
  backgroundColor: theme.rebrandingColors.palette.light[40],
  borderRadius: '50%',
  marginRight: '10px',
  alignSelf: 'center',
}));
