import { encodeFilter } from '@/utils/url';

import { casinoApiRequest } from '../api';
import * as t from './types';

export const getProviders = async () => {
  const filter = {
    order: 'position ASC',
  } as const;

  const { data } = await casinoApiRequest.get<t.GetProvidersResponse>(
    `/public/providers?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const getProvider = async ({ slug = '' }) => {
  const { data } = await casinoApiRequest.get<t.GetProvidersResponse>(`/public/providers/${slug}`);

  return data;
};

export const getProviderMachineViews = async ({ slug = '' }) => {
  const { data } = await casinoApiRequest.get<t.GetProviderMachineViewsResponse>(
    `/public/providers/${slug}/machine-views`,
  );

  return data;
};
