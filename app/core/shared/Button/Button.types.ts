import { ElementType, MouseEvent, ReactNode, RefObject } from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

export enum ButtonSize {
  Big = 'big',
  Medium = 'medium',
  Small = 'small',
  Block = 'block',
}

export enum ButtonVariant {
  Outlined = 'outlined',
  Filled = 'filled',
}

export enum ButtonColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export type ButtonWrappedProps = {
  as?: ElementType;
  children: ReactNode;
  disableHoverStyles?: boolean;
  forwardedRef?: RefObject<HTMLInputElement>;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isIconButton?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  color?: ButtonColor;
  customColor?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export type ButtonProps = MergeElementProps<'button', ButtonWrappedProps>;
