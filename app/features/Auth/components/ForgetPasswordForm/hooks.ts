import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { usePostSendResetPasswordEmailMutation } from '@/core/domains/auth/authSlice';
import { useNotification } from '@/core/hooks/useNotification';
import { toggleLoginRegisterModal } from '@/core/store/metaSlice';

import { ForgetPasswordFormType } from './types';

export const useHandleFormSubmit = () => {
  const [postSendResetPasswordEmail] = usePostSendResetPasswordEmailMutation();
  const { addNotification } = useNotification();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const router = useRouter();

  const { locale = 'en' } = router;

  return async (values: ForgetPasswordFormType) => {
    try {
      if (!values.email) {
        return;
      }

      await postSendResetPasswordEmail({
        email: values.email,
        locale,
      }).unwrap();
      dispatch(toggleLoginRegisterModal());
      addNotification({
        type: 'success',
        title: formatMessage({
          id: 'notification.successTitle',
          defaultMessage: 'Success',
        }),
        text: formatMessage({
          id: 'forgotPasswordForm.emailSentIfValid',
          defaultMessage: 'If your email is valid you will receive a link shortly',
        }),
      });
    } catch (ex) {
      addNotification({
        type: 'error',
        title: formatMessage({
          id: 'notification.errorTitle',
          defaultMessage: 'Error',
        }),
        text: `An error occurred ${ex}`,
      });
    }
  };
};
