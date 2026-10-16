import { casinoApiRequest } from '@/core/domains/api';

import * as t from './types';

export const getMachinesLeaderbord = async (order: 'descending' | 'ascending' = 'descending') => {
  const { data } = await casinoApiRequest.get<t.GetMachinesLeaderBoardResponse>(
    `/public/leaderboards/machines?from=1&to=3&order=${order}`,
  );

  return data;
};

export const getPlayersLeaderbord = async () => {
  const { data } = await casinoApiRequest.get<t.GetPlayersLeaderBoardResponse>(
    '/public/leaderboards/players?from=1&to=3&order=descending',
  );

  return data;
};
