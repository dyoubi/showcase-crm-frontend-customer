import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerDeposits: builder.query({
      queryFn: async ({ accessToken, page }: t.GetPlayerTransactionsRequest) =>
        wrapSlicePromise(
          api.getPlayerDeposits({
            accessToken,
            page,
          }),
        ),
    }),
    getPlayerOtherTransactions: builder.query({
      queryFn: async ({ accessToken, page }: t.GetPlayerTransactionsRequest) =>
        wrapSlicePromise(
          api.getPlayerOtherTransactions({
            accessToken,
            page,
          }),
        ),
    }),
    getPlayerWithdrawals: builder.query({
      providesTags: (result) =>
        result
          ? [
              ...result.transactions.map(({ id }) => ({ type: 'Withdrawals' as const, id })),
              { type: 'Withdrawals', id: 'LIST' },
            ]
          : [{ type: 'Withdrawals', id: 'LIST' }],
      queryFn: async ({ accessToken, page }: t.GetPlayerTransactionsRequest) =>
        wrapSlicePromise(
          api.getPlayerWithdrawals({
            accessToken,
            page,
          }),
        ),
    }),
    postWithdrawRetract: builder.mutation({
      invalidatesTags: [{ type: 'Withdrawals', id: 'LIST' }],
      queryFn: async ({ accessToken, withdrawalId }: t.PostWithdrawRejectRequest) =>
        wrapSlicePromise(
          api.postWithdrawRetract({
            accessToken,
            withdrawalId,
          }),
        ),
    }),
  }),
});

export const {
  useGetPlayerDepositsQuery,
  useGetPlayerOtherTransactionsQuery,
  useGetPlayerWithdrawalsQuery,
  usePostWithdrawRetractMutation,
} = extendedApi;
