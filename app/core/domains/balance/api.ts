import { casinoApiRequest } from '@/core/domains/api';

import { AvailableCryptoCodes } from '../currency';
import * as t from './types';

export const getPlayerBalances = async () => {
  const { data } = await casinoApiRequest.get<t.GetPlayerBalancesResponse>('/public/player/balances');

  return data.filter(({ coin }) => AvailableCryptoCodes.includes(coin));
};
