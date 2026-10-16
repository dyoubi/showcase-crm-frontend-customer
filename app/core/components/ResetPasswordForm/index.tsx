import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/core/shared/Button';
import { Flex } from '@/core/shared/Flex';
import { PasswordInput } from '@/core/shared/Input';

import { useHandleFormSubmit } from './hooks';
import * as t from './types';
import { useResetPasswordFormSchema } from './validate';

import { getInputProps } from '@/libs/react-hook-form/utils';

interface ResetPasswordFormProps {
  token: string;
  onSubmit: () => void;
}

export const ResetPasswordForm = ({ token, onSubmit: onSubmitCb }: ResetPasswordFormProps) => {
  const { formatMessage } = useIntl();

  const formData = useForm<t.ResetPasswordFormType>({
    mode: 'onChange',
    resolver: yupResolver(useResetPasswordFormSchema()),
  });

  const {
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
  } = formData;

  return (
    <form noValidate onSubmit={handleSubmit(useHandleFormSubmit(token, onSubmitCb))} autoComplete="off">
      <Flex flexDirection="column" gap={28}>
        <Flex flexDirection="column" gap={16}>
          <PasswordInput
            {...getInputProps(formData, 'password')}
            name="password"
            error={errors.password?.message}
            label={formatMessage({ id: 'resetPasswordForm.newPassword', defaultMessage: 'New password' })}
          />
          <PasswordInput
            {...getInputProps(formData, 'confirmPassword')}
            name="confirmPassword"
            label={formatMessage({ id: 'resetPasswordForm.confirmPassword', defaultMessage: 'Confirm password' })}
            error={errors.confirmPassword?.message}
          />
        </Flex>

        <Button disabled={!isValid || isSubmitting} type="submit">
          {formatMessage({ id: 'global.submit', defaultMessage: 'Submit' })}
        </Button>
      </Flex>
    </form>
  );
};
