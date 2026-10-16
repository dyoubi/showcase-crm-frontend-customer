import { itemsPerPage } from '@/core/constants/constants';

import { encodeFilter } from '@/utils/url';

import { casinoApiRequest } from '../api';
import * as t from './types';

export const getAllBets = async () => {
  const { data } = await casinoApiRequest.get<t.GetBetsResponse>('/public/bets');

  return data;
};

export const getMyBets = async ({ accessToken }: { accessToken: any }) => {
  try {
    const { data } = await casinoApiRequest.get<t.GetBetsResponse>('/public/player/bets', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching my bets:', error);

    throw error;
  }
};

export const getBets = async ({ type, accessToken }: t.GetBetsParams) => {
  if (type === 'ALL_BETS') {
    return getAllBets();
  }

  return getMyBets({ accessToken });
};

// add a count api as well
// add page as prop
export const getPlayerGameActions = async ({ accessToken, page }: { accessToken: any; page: number }) => {
  const baseUrl = '/public/player/games';
  const props = {
    details: true,
    machines: true,
    limit: itemsPerPage,
    offset: itemsPerPage * (page - 1),
  };

  try {
    const { data } = await casinoApiRequest.get<t.GetGamesResponse>(`${baseUrl}?query=${encodeFilter(props)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching games:', error);

    throw error;
  }
};

export const myGamesCount = async ({ accessToken }: { accessToken: any }) => {
  const url = `/public/player/games/count`;

  try {
    const { data } = await casinoApiRequest.get<t.GetGamesCountResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { count } = data as { count: number };

    return {
      count,
    };
  } catch (error) {
    console.error('Error fetching count of games:', error);

    throw error;
  }
};
