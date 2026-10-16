import { useIntl } from 'react-intl';

import { usePostChangePassowrdMutation } from '@/core/domains/auth/authSlice';

import { useNotification } from '@/utils/notifications/notification-context';

import { ResetPasswordFormType } from './types';

export const useHandleFormSubmit = (token: string, onSubmitCb: () => void) => {
  const [postChangePassword] = usePostChangePassowrdMutation();

  const { addNotification } = useNotification();

  const { formatMessage } = useIntl();

  return async (values: ResetPasswordFormType) => {
    try {
      if (!values.password || !values.confirmPassword) {
        return;
      }

      await postChangePassword({ token, password: values.password, confirmPassword: values.confirmPassword }).unwrap();

      onSubmitCb?.();
    } catch (ex) {
      addNotification({
        type: 'error',
        title: formatMessage({ id: 'notification.errorTitle', defaultMessage: 'Error' }),
        text: `An error occured please try later.`,
      });
    }
  };
};
