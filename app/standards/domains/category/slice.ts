import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      queryFn: (slug: string) => wrapSlicePromise(api.getCategory(slug)),
    }),
    postCategory: builder.mutation({
      queryFn: (payload: t.PostCategoryPayload) => wrapSlicePromise(api.postCategory(payload)),
    }),
  }),
});

export const { usePostCategoryMutation: usePostCategory, useGetCategoryQuery: useGetCategory } = extendedApi;
export const { getCategory, postCategory } = extendedApi.endpoints;
