import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import * as api from './api';
import { CurrencyCodes } from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query({
      queryFn: (currencyCode: CurrencyCodes) => wrapSlicePromise(api.getCurrency(currencyCode)),
    }),
    getAllCurrencies: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getAllCurrencies()),
    }),
    getCryptosFiatsRatesFromCasino: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getCryptosFiatsRatesFromCasino()),
    }),
  }),
});

export const { useGetAllCurrenciesQuery, useGetCurrencyQuery, useGetCryptosFiatsRatesFromCasinoQuery } = extendedApi;
export const { getAllCurrencies, getCryptosFiatsRatesFromCasino } = extendedApi.endpoints;
