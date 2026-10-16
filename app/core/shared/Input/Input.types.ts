import { ReactNode, RefObject } from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

import { FieldVariant } from '../FeedbackMessage';

export type BasicInputWrappedProps = {
  forwardedRef?: RefObject<HTMLInputElement>;
  selectable: boolean;
  inputSize?: InputSizes;
  variant: FieldVariant;
};

export type BasicInputProps = MergeElementProps<'input', BasicInputWrappedProps>;
export interface IconInputWrappedProps extends BasicInputProps {
  button?: JSX.Element;
  forwardedRef?: RefObject<HTMLInputElement>;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export type IconInputProps = MergeElementProps<'input', IconInputWrappedProps>;

export type InputWrappedProps = {
  button?: JSX.Element;
  caption?: string;
  error?: string;
  forwardedRef?: RefObject<HTMLInputElement>;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isValid?: boolean;
  label?: string;
  prefilled?: boolean;
  progress?: number;
  selectable?: boolean;
  noErrorIcon?: boolean;
  'data-testid'?: string;
};

export type InputProps = MergeElementProps<'input', InputWrappedProps>;

export enum InputSizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  block = 'block',
}
