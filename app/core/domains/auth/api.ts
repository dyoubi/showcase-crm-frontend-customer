import { casinoApiRequest } from '@/core/domains/api';

export const postChangePassword = async (token: string, newPassword: string, confirmationPassword: string) => {
  const { data } = await casinoApiRequest.post<void>(`/public/change-password?token=${token}`, {
    password: newPassword,
    passwordConfirmation: confirmationPassword,
  });

  return data;
};

export const postSendResetPasswordEmail = async (email: string, locale: string) => {
  const { data } = await casinoApiRequest.post<void>('/public/password-change', {
    email,
    locale,
    result_url: 'bullrun',
  });

  return data;
};
