import { ChangeEvent, FocusEvent, RefObject } from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

type Option = {
  label: string;
  value: string;
};

export type RadioGroupWrappedProps = {
  defaultValue?: string;
  forwardedRef?: RefObject<HTMLInputElement>;
  horizontal?: boolean;
  options: Array<Option>;
  name: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type RadioGroupProps = MergeElementProps<'input', RadioGroupWrappedProps>;
