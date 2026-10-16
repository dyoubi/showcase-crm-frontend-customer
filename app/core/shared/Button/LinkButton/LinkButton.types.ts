import { ElementType, ReactNode, RefObject } from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

import { ButtonColor, ButtonSize, ButtonVariant } from '../Button.types';

export type LinkButtonWrappedProps = {
  as?: ElementType;
  children: ReactNode;
  external?: boolean;
  forwardedRef?: RefObject<HTMLAnchorElement>;
  openInNewTab?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  isSelected?: boolean;
  href: string;
  customColor?: string;
};

export type LinkButtonProps = MergeElementProps<'a', LinkButtonWrappedProps>;
