import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getCategories()),
    }),
    getCategory: builder.query({
      queryFn: ({ slug = '' }) => wrapSlicePromise(api.getCategory({ slug })),
    }),
    getCategoryMachinesViews: builder.query({
      queryFn: ({ slug = '', machinesLimit = 32 }) =>
        wrapSlicePromise(api.getCategoryMachinesViews({ slug, machinesLimit })),
    }),
  }),
});

export const { useGetCategoryQuery, useGetCategoriesQuery, useGetCategoryMachinesViewsQuery } = extendedApi;
export const { getCategory, getCategories, getCategoryMachinesViews } = extendedApi.endpoints;
