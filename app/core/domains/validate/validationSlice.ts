import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.query({
      queryFn: (token: string) => wrapSlicePromise(api.verifyEmail(token)),
    }),
  }),
});

export const { useVerifyEmailQuery } = extendedApi;
export const { verifyEmail } = extendedApi.endpoints;
