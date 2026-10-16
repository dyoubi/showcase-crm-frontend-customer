import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachinesLeaderbord: builder.query({
      queryFn: (order: 'descending' | 'ascending' = 'descending') => wrapSlicePromise(api.getMachinesLeaderbord(order)),
    }),
    getPlayersLeaderbord: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getPlayersLeaderbord()),
    }),
  }),
});

export const { useGetPlayersLeaderbordQuery, useGetMachinesLeaderbordQuery } = extendedApi;
export const { getPlayersLeaderbord, getMachinesLeaderbord } = extendedApi.endpoints;
