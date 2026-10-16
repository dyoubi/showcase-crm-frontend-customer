import { FieldPath, FieldValues, RegisterOptions, UseControllerProps, UseFormReturn } from 'react-hook-form';
import get from 'lodash/get';

export const getInputProps = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  formData: UseFormReturn<TFieldValues>,
  inputName: TFieldName,
  options?: { rules?: RegisterOptions<TFieldValues> },
) => {
  const restRegister = formData.register(inputName, options?.rules);
  const inputError = get(formData.formState?.errors, inputName)?.message;

  return {
    ...restRegister,
    color: inputError ? 'danger' : 'secondary',
    caption: inputError,
  } as const;
};

// Must be used for custom controlled inputs in src/components/RHF
export const getControlledInputProps = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  formData: Pick<UseFormReturn<TFieldValues>, 'control'>,
  inputName: TFieldName,
  options?: { rules?: UseControllerProps<TFieldValues>['rules'] },
) => ({
  name: inputName,
  control: formData.control,
  rules: options?.rules,
});
