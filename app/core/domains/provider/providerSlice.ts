import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getProviders()),
    }),
    getProvider: builder.query({
      queryFn: ({ slug }) => wrapSlicePromise(api.getProvider({ slug })),
    }),
    getProviderMachineViews: builder.query({
      queryFn: ({ slug }) => wrapSlicePromise(api.getProviderMachineViews({ slug })),
    }),
  }),
});

export const { useGetProviderQuery, useGetProvidersQuery, useGetProviderMachineViewsQuery } = extendedApi;
export const { getProvider, getProviders, getProviderMachineViews } = extendedApi.endpoints;
