import { CSSProperties, ReactElement, ReactNode } from 'react';

import { ButtonProps } from '../Button/Button.types';
import { FieldVariant } from '../FeedbackMessage';

export interface InputWrapperProps {
  disabled?: boolean;
  className?: string;
  colorVariant?: 'success' | 'error' | 'default';
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  children?: ReactNode;
  buttonContent?: React.ReactNode;
  buttonProps?: ButtonProps;
  caption?: any;
  label?: React.ReactNode;
  width?: number | string;
  flex?: CSSProperties['flex'];
  button?: ReactElement;
  variant?: FieldVariant;
}
