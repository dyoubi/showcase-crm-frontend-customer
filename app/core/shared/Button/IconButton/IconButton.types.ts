import { MouseEvent, ReactNode } from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

import { ButtonColor, ButtonSize } from '../Button.types';

export enum IconButtonSize {
  Big = 'big',
  Medium = 'medium',
  Small = 'small',
}

export type IconButtonWrappedProps = {
  isIconButton?: boolean;
  size?: ButtonSize.Big | ButtonSize.Medium | ButtonSize.Small;
  icon: ReactNode;
  color?: ButtonColor;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type IconButtonProps = MergeElementProps<'button', IconButtonWrappedProps>;
