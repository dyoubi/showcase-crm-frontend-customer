import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import * as t from './types';

export interface GetArticleSliceParams {
  locale: 'fr' | 'en';
  articleKey: t.BuildInArticlesSlugs | string;
}

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      queryFn: ({ articleKey, locale }: GetArticleSliceParams) =>
        wrapSlicePromise(api.getArticle(articleKey, { lang: locale })),
    }),
  }),
});

export const { useGetArticleQuery } = extendedApi;
export const { getArticle } = extendedApi.endpoints;
