import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@/core/shared/Box';
import { Button } from '@/core/shared/Button';
import { Input } from '@/core/shared/Input';
import { IconEmail } from '@/core/shared/Icons';

import * as t from './types';
import { useValidationSchema } from './validation';
import { useHandleFormSubmit } from './hooks';

import { getInputProps } from '@/libs/react-hook-form/utils';

interface ForgetPasswordFormProps {
  setIsModalOpen: (newState: boolean) => void;
}

export const ForgetPasswordForm = ({ setIsModalOpen }: ForgetPasswordFormProps) => {
  const formData = useForm<t.ForgetPasswordFormType>({
    mode: 'onChange',
    resolver: yupResolver(useValidationSchema()),
  });
  const { formatMessage } = useIntl();

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = formData;

  return (
    <form noValidate onSubmit={handleSubmit(useHandleFormSubmit())}>
      <Box mb="s">
        {formatMessage({
          id: 'forgotPasswordForm.entersEmail',
          defaultMessage: 'Please enter your email address to receive a reset link for your password',
        })}
      </Box>
      <Box mb="s">
        <Input
          {...getInputProps(formData, 'email')}
          error={errors.email?.message}
          iconLeft={<IconEmail />}
          name="email"
          placeholder={formatMessage({
            defaultMessage: 'Enter your email',
            id: 'loginForm.emailFieldPlaceholder',
          })}
        />
      </Box>
      <Box align="center">
        <Button disabled={!isValid || isSubmitting} type="submit">
          Ok
        </Button>
      </Box>
    </form>
  );
};
