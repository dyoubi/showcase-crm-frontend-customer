import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { ChangePasswordForm } from './PasswordForm.types';

export const useChangePasswordValidation = (): yup.SchemaOf<ChangePasswordForm> => {
  const { formatMessage } = useIntl();

  return yup.object().shape({
    oldPassword: yup.string().min(8).max(72).required(),
    newPassword: yup.string().min(8).max(72).required(),
    confirmPassword: yup
      .string()
      .min(8)
      .max(72)
      .required()
      .oneOf(
        [yup.ref('password'), null],
        formatMessage({
          defaultMessage: 'Passwords must match',
          id: 'changePassword.errorConfirmPasswordField',
        }),
      ),
  });
};
