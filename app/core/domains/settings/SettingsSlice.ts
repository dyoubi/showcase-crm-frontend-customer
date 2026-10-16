import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';
import { RootState } from '@/core/store/store';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    freezePlayerAccount: builder.mutation({
      queryFn: (payload: t.FreezePlayerAccountPayload) => {
        return wrapSlicePromise(api.freezePlayerAccount(payload));
      },
    }),
    getPlayerLimit: builder.query({
      queryFn: (accessToken) => wrapSlicePromise(api.getPlayerLimit(accessToken)),
    }),
    updatePlayerLimit: builder.mutation({
      queryFn: (payload: t.UpdatePlayerLimitPayload) => {
        return wrapSlicePromise(api.updatePlayerLimit(payload));
      },
    }),
    updatePlayerSelfExclusion: builder.mutation({
      queryFn: (payload: string | null | undefined) => wrapSlicePromise(api.updatePlayerSelfExclusion(payload)),
    }),
  }),
});

export const {
  useGetPlayerLimitQuery,
  useUpdatePlayerLimitMutation,
  useUpdatePlayerSelfExclusionMutation,
  useFreezePlayerAccountMutation,
} = extendedApi;

export const { getPlayerLimit, updatePlayerLimit, updatePlayerSelfExclusion, freezePlayerAccount } =
  extendedApi.endpoints;
