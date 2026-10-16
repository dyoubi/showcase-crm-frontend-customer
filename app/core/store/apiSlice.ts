import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { HYDRATE } from 'next-redux-wrapper';

import { config } from '@/core/config';
import { ErrorMessages, ErrorNames, formatApiError, isApiError } from '@/core/domains/api';

import { UNKNOW_SLICE_ERROR } from './constants';

const { publicBackendUrl } = config;

// when the render is made on server side,
// we must use an different address for fetch datas (and skip cloudfare firewall)
const API_URL = publicBackendUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const response = await baseQuery(args, api, extraOptions);

  return response;
};

export const apiSlice = createApi({
  baseQuery: customBaseQuery,
  tagTypes: ['Withdrawals'],
  reducerPath: 'api',
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export const { prefetch } = apiSlice.util;

export const {
  util: { getRunningOperationPromises },
} = apiSlice;

interface ApiSliceError {
  status: 'FETCH_ERROR';
  name?: ErrorNames;
  error: ErrorMessages | typeof UNKNOW_SLICE_ERROR;
}

/**
 * This helper is made for convert promise result to this format:
 * return {data: apiResult} if the promise didn't thrown an error
 * otherwise  return {error: apiError} if the promise thrown an error
 * we must wrap our api promise with this helper because rtk query must have this format for work
 * cf : https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#queryfn-function-return-value
 */
export const wrapSlicePromise = async <C>(promise: Promise<C>): Promise<QueryReturnValue<C, ApiSliceError>> => {
  try {
    return { data: await promise };
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex);

    if (!isApiError(ex)) {
      return { error: { status: 'FETCH_ERROR', error: UNKNOW_SLICE_ERROR } };
    }

    const { message, name } = formatApiError(ex);

    return { error: { status: 'FETCH_ERROR', name, error: message || UNKNOW_SLICE_ERROR } };
  }
};

export const isApiSliceFetchError = (ex: unknown): ex is ApiSliceError => {
  const ta = ex as ApiSliceError;

  return ta?.status === 'FETCH_ERROR';
};
