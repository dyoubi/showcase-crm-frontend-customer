import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerBalances: builder.query({
      queryFn: () => wrapSlicePromise(api.getPlayerBalances()),
    }),
  }),
});

export const { useGetPlayerBalancesQuery } = extendedApi;
