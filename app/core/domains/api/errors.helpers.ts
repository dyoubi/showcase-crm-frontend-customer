import axios, { AxiosError } from 'axios';

import * as t from './types';

export const isApiError = (ex: unknown): ex is AxiosError<t.ApiErrorType> => {
  if (!axios.isAxiosError(ex)) {
    return false;
  }
  const { response } = ex as AxiosError<t.ApiErrorType>;

  return !!(response?.data?.error?.name && response?.data?.error?.statusCode);
};

export const formatApiError = ({ response }: AxiosError<t.ApiErrorType>) => ({
  statusCode: response?.status,
  name: response?.data?.error?.name,
  message: response?.data?.error?.message,
});
