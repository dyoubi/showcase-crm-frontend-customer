import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';

interface PostChangePasswordParams {
  token: string;
  password: string;
  confirmPassword: string;
}

interface PostForgetPasswordParams {
  email: string;
  locale: string;
}

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postChangePassowrd: builder.mutation({
      queryFn: ({ token, password, confirmPassword }: PostChangePasswordParams) =>
        wrapSlicePromise(api.postChangePassword(token, password, confirmPassword)),
    }),
    postSendResetPasswordEmail: builder.mutation({
      queryFn: ({ email, locale }: PostForgetPasswordParams) =>
        wrapSlicePromise(api.postSendResetPasswordEmail(email, locale)),
    }),
  }),
});

export const { usePostChangePassowrdMutation, usePostSendResetPasswordEmailMutation } = extendedApi;
