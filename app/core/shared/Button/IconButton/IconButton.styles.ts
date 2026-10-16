import styled from 'styled-components';

import { visuallyHidden } from '@/themes/mixins';

import { getButtonStyles } from '../Button.styles';
import { IconButtonProps } from './IconButton.types';
import { ButtonSize, ButtonVariant } from '../Button.types';

export const StyledIconButton = styled.button<Pick<IconButtonProps, 'size' | 'color'>>(({ theme, size, color }) => ({
  ...getButtonStyles(theme, size, false, false, ButtonVariant.Filled, color),

  lineHeight: 0,

  padding: size === ButtonSize.Big ? theme.padding.s : theme.padding.xxs,
}));

export const VisuallyHidden = styled.span(() => visuallyHidden);
