import { casinoApiRequest } from '../api';
import * as t from './types';

export const verifyEmail = async (token: string) => {
  const { data } = await casinoApiRequest.post<t.EmailValidationResponse>(`/public/verify-email`, { token });

  return data;
};
