import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { useIntl } from 'react-intl';

import { EMAIL_DOMAIN_LENGTH_REGEX, EMAIL_LOCAL_PART_LENGTH_REGEX, EMAIL_REGEX } from '@/core/constants/constants';

import * as t from './types';

export const useValidationSchema = (): SchemaOf<t.ForgetPasswordFormType> => {
  const { formatMessage } = useIntl();

  return yup.object({
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
  });
};
