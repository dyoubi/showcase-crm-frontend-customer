import { ReactNode, Ref } from 'react';
import { Props as DropdownProps, GroupBase } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';

import { FieldVariant } from '../FeedbackMessage';

export enum SelectSize {
  Big = 'big',
  Small = 'small',
}

export type OptionProps = {
  [key: string]: any;
};

export interface SelectProps extends DropdownProps {
  caption?: string;
  error?: string;
  hideButton?: boolean;
  inputRef?: Ref<Select<unknown, boolean, GroupBase<unknown>>>;
  isValid?: boolean;
  label?: string;
  size: SelectSize;
  variant?: FieldVariant;
  customIndicator?: ReactNode;
}
