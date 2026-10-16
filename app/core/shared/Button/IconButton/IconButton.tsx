import { FC } from 'react';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { StyledIconButton, VisuallyHidden } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';
import { ButtonSize } from '../Button.types';

const IconButtonWrapped: FC<IconButtonProps> = ({ disabled, icon, onClick, size, type, color, children, ...rest }) => (
  <StyledIconButton
    disabled={disabled}
    onClick={onClick}
    size={size || ButtonSize.Big}
    type={type}
    color={color}
    {...rest}
  >
    {icon}
    <VisuallyHidden>{children}</VisuallyHidden>
  </StyledIconButton>
);

export const IconButton = forwardRefWrapper<IconButtonProps>(IconButtonWrapped);
