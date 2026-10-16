import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';
import { config } from '@/core/config';

import * as api from './api';

const { casinoId } = config;

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarousels: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getCarousels()),
    }),
    getCarouselContents: builder.query({
      queryFn: ({ id, lang, device }: { id: string; lang?: string; device?: string }) =>
        wrapSlicePromise(api.getCarouselContent(casinoId, id, lang, device)),
    }),
  }),
});

export const { useGetCarouselsQuery, useGetCarouselContentsQuery, useLazyGetCarouselContentsQuery } = extendedApi;

export const { getCarousels, getCarouselContents } = extendedApi.endpoints;
