import { casinoApiRequest } from '@/core/domains/api';

import * as t from './types';

export const freezePlayerAccount = async (payload: t.FreezePlayerAccountPayload) => {
  const { data } = await casinoApiRequest.post<t.FreezePlayerAccountResponse>(
    `/public/player/freez`,
    { until: payload.until },
    {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    },
  );

  return data;
};

// Fetch Player Limit
export const getPlayerLimit = async (accessToken: string) => {
  const { data } = await casinoApiRequest.get<t.GetPlayerLimitResponse>(`/public/player/limits`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

// Update Player Limit
export const updatePlayerLimit = async (payload: t.UpdatePlayerLimitPayload) => {
  const { data } = await casinoApiRequest.post<t.UpdatePlayerLimitResponse>(
    `/public/player/limits`,
    payload.limitInfo,
    {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    },
  );

  return data;
};

export const updatePlayerSelfExclusion = async (payload: string | null | undefined) => {
  const { data } = await casinoApiRequest.post<t.SelfExclusionResponse>(`/public/player/self-exclusion`, {
    headers: {
      Authorization: `Bearer ${payload}`,
    },
  });

  return data;
};
