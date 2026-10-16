import { casinoApiRequest } from '../api';
import * as t from './types';

export const getPlayerBonusesAssigned = async () => {
  const { data } = await casinoApiRequest.get<t.GetPlayerBonusAssignedResponse>('/public/player/bonus');

  return data;
};

export const claimBonus = async (payload: t.ClaimBonusPayload) => {
  const { data } = await casinoApiRequest.post<void>('/public/player/bonus/claim', payload);

  return data;
};
