import { FC } from 'react';

import { IconLoader } from '@/core/shared/Icons/Loader/Loader';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { LeftElementWrapper, RightElementWrapper, StyledButton } from './Button.styles';
import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import { ICON_SIZE_BY_BUTTON_SIZE } from './Button.constants';

const ButtonWrapped: FC<ButtonProps> = ({
  children,
  disabled,
  disableHoverStyles,
  iconLeft,
  iconRight,
  isLoading,
  isSelected,
  onClick,
  customColor,
  size = ButtonSize.Big,
  type = 'button',
  variant = ButtonVariant.Filled,
  color = ButtonColor.Primary,
  forwardedRef,
  ...props
}) => (
  <StyledButton
    ref={forwardedRef}
    disabled={disabled || isLoading}
    disableHoverStyles={disableHoverStyles}
    isLoading={isLoading}
    isSelected={isSelected}
    onClick={onClick}
    size={size}
    color={color}
    type={type}
    variant={variant}
    customColor={customColor}
    {...props}
  >
    {isLoading ? (
      <IconLoader size={ICON_SIZE_BY_BUTTON_SIZE[size]} />
    ) : (
      <>
        {iconLeft && <LeftElementWrapper>{iconLeft}</LeftElementWrapper>}
        {children}
        {iconRight && <RightElementWrapper>{iconRight}</RightElementWrapper>}
      </>
    )}
  </StyledButton>
);

export const Button = forwardRefWrapper<ButtonProps>(ButtonWrapped);
