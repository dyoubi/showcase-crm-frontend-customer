import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';
import { config } from '@/core/config';

import * as api from './api';
import * as t from './types';

const { casinoId } = config;

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getPromotions(casinoId)),
    }),
    getPromotion: builder.query({
      queryFn: (payload: Omit<t.GetPromotionParams, 'casinoId'>) =>
        wrapSlicePromise(
          api.getPromotion({
            casinoId,
            device: payload.device,
            slug: payload.slug,
            locale: payload.locale,
          }),
        ),
    }),
  }),
});

export const { useGetPromotionsQuery, useGetPromotionQuery } = extendedApi;
export const { getPromotions, getPromotion } = extendedApi.endpoints;
