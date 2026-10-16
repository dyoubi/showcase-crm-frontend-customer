import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { EMAIL_DOMAIN_LENGTH_REGEX, EMAIL_LOCAL_PART_LENGTH_REGEX, EMAIL_REGEX } from '@/core/constants/constants';

import { LoginFormRequest } from './LoginForm.types';

export const useLoginFormValidation = (): yup.SchemaOf<LoginFormRequest> => {
  const { formatMessage } = useIntl();

  return yup.object().shape({
    email: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Email is a required field',
          id: 'registerForm.errorEmailFieldEmpty',
        }),
      )
      .matches(
        EMAIL_REGEX,
        formatMessage({
          defaultMessage: 'Wrong email format',
          id: 'registerForm.errorEmailFieldFormat',
        }),
      )
      .matches(
        EMAIL_LOCAL_PART_LENGTH_REGEX,
        formatMessage({
          defaultMessage: 'Local part of the email should be between 1 and 64 characters',
          id: 'registerForm.errorEmailLocalFormat',
        }),
      )
      .matches(
        EMAIL_DOMAIN_LENGTH_REGEX,
        formatMessage({
          defaultMessage: 'Domain part should be between 1 and 64 characters',
          id: 'registerForm.errorEmailDomainFormat',
        }),
      ),
    password: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Password is a required field',
          id: 'registerForm.errorPasswordFieldEmpty',
        }),
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
      ),
    remember: yup.boolean(),
  });
};
