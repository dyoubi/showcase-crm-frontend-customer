import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { PASSWORD_REQUIREMENTS_REGEX } from '@/core/constants/constants';

import * as t from './types';

export const useResetPasswordFormSchema = (): yup.SchemaOf<t.ResetPasswordFormType> => {
  const { formatMessage } = useIntl();

  return yup.object().shape({
    password: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Password is a required field',
          id: 'registerForm.errorPasswordFieldEmpty',
        }),
      )
      .min(
        8,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {minNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMinCharactersLong',
          },
          {
            minNumOfCharacters: 8,
            fieldName: formatMessage({ defaultMessage: 'Password', id: 'security.password' }),
          },
        ),
      )
      .max(
        72,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be a maximum of {maxNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMaxCharactersLong',
          },
          {
            maxNumOfCharacters: 72,
            fieldName: formatMessage({
              defaultMessage: 'Password',
              id: 'global.password',
            }),
          },
        ),
      )
      .matches(
        PASSWORD_REQUIREMENTS_REGEX,
        formatMessage({
          defaultMessage:
            'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character (._-+~!#$%&*=^?@)',
          id: 'registerForm.errorPasswordFieldRequiredCharacters',
        }),
      ),
    confirmPassword: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'This field is a required',
          id: 'common.thisFieldIsRequired',
        }),
      )
      .matches(
        PASSWORD_REQUIREMENTS_REGEX,
        formatMessage({
          defaultMessage:
            'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character (._-+~!#$%&*=^?@)',
          id: 'registerForm.errorPasswordFieldRequiredCharacters',
        }),
      )
      .oneOf(
        [yup.ref('password')],
        formatMessage({
          defaultMessage: "Confirmation password doesn't match",
          id: 'resetPasswordForm.confirmPasswordDontMatch',
        }),
      ),
  });
};
