import { Control, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

export interface ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TFieldName;
  rules?: UseControllerProps<TFieldValues>['rules'];
}
