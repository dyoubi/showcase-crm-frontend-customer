import * as axios from 'axios';

import { config } from '@/core/config';

export const casinoApiRequest = axios.default.create({
  baseURL: config.publicBackendUrl,
  headers: {
    'x-casino-id': config.casinoKey,
  },
});

export const coinsApiRequest = axios.default.create({
  baseURL: config.coinsUrl,
});

export const setCasinoApiAccessToken = (accessToken?: string) => {
  casinoApiRequest.defaults.headers.authorization = `Bearer ${accessToken || ''}`;
};

export const bffApiRequest = axios.default.create({
  baseURL: config.isServerSide
    ? `http://localhost:${process.env.PORT || process.env.NEXT_PUBLIC_PORT || 3000}/api/bff`
    : '/api/bff',
});

export * from './errors.helpers';
export * from './types';
