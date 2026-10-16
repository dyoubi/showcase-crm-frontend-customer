import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayer: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getPlayer()),
    }),
    patchPlayer: builder.mutation({
      queryFn: (player: t.PatchPlayerPayload) => wrapSlicePromise(api.patchPlayer(player)),
    }),
    registerPlayer: builder.mutation({
      queryFn: (player: t.PostRegisterPlayerPayload) => wrapSlicePromise(api.postRegisterPlayer(player)),
    }),
  }),
});

export const { useGetPlayerQuery, useRegisterPlayerMutation, usePatchPlayerMutation } = extendedApi;
