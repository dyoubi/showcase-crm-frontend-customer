import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEstimatedFees: builder.query({
      queryFn: async (currencies: string) => wrapSlicePromise(api.getEstimatedFees(currencies)),
    }),
    getPlayerDepositAddresses: builder.query({
      queryFn: async () => wrapSlicePromise(api.getPlayerDepositAddresses()),
    }),
    postWithdrawRequest: builder.mutation({
      invalidatesTags: [{ type: 'Withdrawals', id: 'LIST' }],
      queryFn: async (requestBody: t.WithdrawRequest) => wrapSlicePromise(api.postWithdrawRequest(requestBody)),
    }),
    postChanellyDepositRequest: builder.mutation({
      queryFn: async (requestBody: t.ChangellyDepositRequest) =>
        wrapSlicePromise(api.postChanellyDepositRequest(requestBody)),
    }),
    postChanellyDepositOffersRequest: builder.mutation({
      queryFn: async (requestBody: t.ChangellyDepositOffersRequest) =>
        wrapSlicePromise(api.postChanellyDepositOffersRequest(requestBody)),
    }),
  }),
});

export const {
  useGetEstimatedFeesQuery,
  useGetPlayerDepositAddressesQuery,
  usePostWithdrawRequestMutation,
  usePostChanellyDepositRequestMutation,
  usePostChanellyDepositOffersRequestMutation,
} = extendedApi;
