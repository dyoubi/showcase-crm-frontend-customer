import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/core/shared/Button';
import { Spacer } from '@/core/shared/Spacer';
import { Input } from '@/core/shared/Input';
import { Checkbox } from '@/core/shared/Checkbox';
import { Flex } from '@/core/shared/Flex';
import { DateInputRHF } from '@/core/components/RHF/DateInputRHF';
import { Text } from '@/core/components/Typography';

import { useFormValidationSchema } from './validationSchema';
import { useOnFormSubmit } from './hooks';
import * as t from './types';
import * as S from './styles';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';

interface StandardFormProps {
  onFormSubmitted?: () => void;
}

export const StandardForm = ({ onFormSubmitted }: StandardFormProps) => {
  const formData = useForm<t.CategoryForm>({
    resolver: yupResolver(useFormValidationSchema()),
  });
  const { handleSubmit } = formData;
  const { onSubmit } = useOnFormSubmit({
    onFormSubmitted,
  });

  // for custom RHF's inputs we must use the getControlledInputProps helper
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {/* we must use the getInputProps helper for being more the typescript safe & increase DevX */}
      <Input label="Name" {...getInputProps(formData, 'name')} />
      <Spacer />
      <Input label="Slug" type="number" {...getInputProps(formData, 'slug')} />
      <Spacer />
      <Flex>
        <Checkbox {...getInputProps(formData, 'isActive')} />
        <Spacer size="xs" />
      </Flex>
      <Spacer />
      {/* for custom RHF's inputs or controlled input we must use the getControlledInputProps helper */}
      <DateInputRHF
        label={<Text level="medium">Birthdate</Text>}
        disabled
        readOnly
        {...getControlledInputProps(formData, 'birthDate')}
      />
      <Spacer />
      <Flex justifyContent="center">
        <Button type="submit">Save</Button>
      </Flex>
    </S.Form>
  );
};
