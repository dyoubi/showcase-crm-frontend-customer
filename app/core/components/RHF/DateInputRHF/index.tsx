import { useCallback, useEffect, useState } from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';

import { InputMask, InputMaskProps } from '@/core/shared/InputMask';
import { IconCalendar } from '@/core/shared/Icons';

import { convertDateToString, convertStringToDate } from '@/utils/date';

import { ControlledInputProps } from '../types';

const format = 'dd/MM/yyyy';

type AllowedMaskProps = Omit<
  InputMaskProps,
  | 'iconLeft'
  | 'iconRight'
  | 'mask'
  | 'pattern'
  | 'placeholder'
  | 'parse'
  | 'format'
  | 'value'
  | 'onAccept'
  | 'placeholder'
>;

export interface DateInputRHFProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControlledInputProps<TFieldValues, TFieldName> {
  defaultValue?: string;
}

const parseCb = (dateStr: string) => convertStringToDate(dateStr, format);
const formatCb = (dateInstance: Date) => convertDateToString(dateInstance, format);

export const DateInputRHF = ({
  name,
  control,
  defaultValue,
  rules,
  ...restProps
}: DateInputRHFProps & AllowedMaskProps) => {
  // hooks
  const [inputValue, setValue] = useState('');
  const { field, formState } = useController({
    name,
    control,
    defaultValue,
  });

  // constants
  const error = formState?.errors[name];
  const { onChange, value } = field;

  // callbacks
  const onComplete = useCallback(
    (dateStr: string) => onChange(convertStringToDate(dateStr, format).toString()),
    [onChange],
  );

  const onAccept = useCallback(
    (newValue: string) => {
      if (value) {
        onChange(undefined);
      }
      setValue(newValue);
    },
    [onChange, setValue, value],
  );

  useEffect(() => {
    const initialValue = defaultValue || value;

    if (!initialValue) {
      return;
    }

    setValue(formatCb(new Date(initialValue)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InputMask
      {...restProps}
      value={inputValue}
      iconLeft={<IconCalendar />}
      mask={Date}
      colorVariant={error ? 'error' : 'default'}
      pattern="d{/}`m{/}`Y"
      placeholder="dd/mm/yyyy"
      parse={parseCb}
      format={formatCb}
      caption={error?.message}
      onComplete={onComplete}
      onAccept={onAccept}
    />
  );
};
