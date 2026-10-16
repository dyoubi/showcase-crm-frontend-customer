import styled from 'styled-components';

import { Button } from '@/core/shared/Button';
import { ButtonSize } from '@/core/shared/Button/Button.types';

import { Text } from '../Typography/Text';

export const BonusClaimContainer = styled.div({
  textAlign: 'center',
});

export const StyledButton = styled(Button).attrs({ disableHoverStyles: true, size: ButtonSize.Block })(({ theme }) => ({
  background: theme.rebrandingColors.palette.green[20],
  ':disabled': {
    pointerEvents: 'none',
  },
}));

export const TextUppercase = styled(Text)({
  textTransform: 'uppercase',
});

export const SelectOption = styled.div({
  display: 'flex',
});

export const SelectWrapper = styled.div(({ theme }) => ({
  maxWidth: 180,
  margin: `0 auto ${theme.margin.l} auto`,
}));

export const ContentWrapper = styled.div<{ width: number }>(({ width, theme }) => ({
  width,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.margin.m,
}));
