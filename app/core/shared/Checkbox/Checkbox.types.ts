import { RefObject } from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

export enum CheckboxVariant {
  Default = 'default',
  Switch = 'switch',
}

export type CheckboxWrappedProps = {
  error?: string;
  forwardedRef?: RefObject<HTMLInputElement>;
  isOutlined?: boolean;
};

export type CheckboxProps = MergeElementProps<'input', CheckboxWrappedProps>;
