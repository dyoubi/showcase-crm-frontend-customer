import { useIntl } from 'react-intl';
import * as yup from 'yup';

import {
  EMAIL_DOMAIN_LENGTH_REGEX,
  EMAIL_LOCAL_PART_LENGTH_REGEX,
  EMAIL_REGEX,
  PASSWORD_REQUIREMENTS_REGEX,
  USERNAME_REGEX,
} from '@/core/constants/constants';

import { addYearsToDate } from '@/utils/date';

import { RegisterFormType } from './RegisterForm.types';

export const useRegisterFormValidation = (): yup.SchemaOf<RegisterFormType> => {
  const { formatMessage } = useIntl();

  return yup.object().shape({
    username: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Username is a required field',
          id: 'registerForm.errorUsernameFieldEmpty',
        }),
      )
      .min(
        5,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {minNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMinCharactersLong',
          },
          {
            minNumOfCharacters: 5,
            fieldName: formatMessage({
              defaultMessage: 'Username',
              id: 'global.username',
            }),
          },
        ),
      )
      .max(
        20,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be a maximum of {maxNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMaxCharactersLong',
          },
          {
            maxNumOfCharacters: 20,
            fieldName: formatMessage({
              defaultMessage: 'Username',
              id: 'global.username',
            }),
          },
        ),
      )
      .matches(
        USERNAME_REGEX,
        formatMessage({
          defaultMessage: 'Special characters are not allowed',
          id: 'completeRegistrationModal.errorNotAllowedCharacters',
        }),
      ),
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
            'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*+/*)',
          id: 'registerForm.errorPasswordFieldRequiredCharacters',
        }),
      ),
    birthDate: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Field is required',
          id: 'registerForm.errorFieldEmpty',
        }),
      )
      .test({
        test: (v) => {
          if (!v) return false;

          const eighteenYearAgo = addYearsToDate(new Date(), -18);

          return eighteenYearAgo.getTime() >= new Date(v).getTime();
        },
        message: formatMessage({
          defaultMessage: 'You need to be at least 18 years old',
          id: 'registerForm.underageWarning',
        }),
      }),
    terms: yup
      .bool()
      .required(
        formatMessage({
          defaultMessage: 'Field is required',
          id: 'registerForm.errorFieldEmpty',
        }),
      )
      .oneOf(
        [true],
        formatMessage({
          defaultMessage: 'Field is required',
          id: 'registerForm.errorFieldEmpty',
        }),
      ),
    policy: yup
      .bool()
      .required(
        formatMessage({
          defaultMessage: 'Field is required',
          id: 'registerForm.errorFieldEmpty',
        }),
      )
      .oneOf(
        [true],
        formatMessage({
          defaultMessage: 'Field is required',
          id: 'registerForm.errorFieldEmpty',
        }),
      ),
    marketingAcceptation: yup.bool(),
  });
};
