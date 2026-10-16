import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBets: builder.query({
      queryFn: (params: t.GetBetsParams) => wrapSlicePromise(api.getBets(params)),
    }),
    getPlayerGameActions: builder.query({
      queryFn: ({ accessToken, page }) => wrapSlicePromise(api.getPlayerGameActions({ accessToken, page })),
    }),
    getPlayerGameActionsCount: builder.query({
      queryFn: ({ accessToken }) => wrapSlicePromise(api.myGamesCount({ accessToken })),
    }),
  }),
});
export const { useGetBetsQuery, useGetPlayerGameActionsQuery, useGetPlayerGameActionsCountQuery } = extendedApi;
export const { getBets, getPlayerGameActions, getPlayerGameActionsCount } = extendedApi.endpoints;
