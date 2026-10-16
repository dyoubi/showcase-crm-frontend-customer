import axios from 'axios';

import { casinoApiRequest } from '../api';
import * as t from './types';

export const getPlayer = async () => {
  const token = casinoApiRequest.defaults.headers.authorization;

  if (!token || token === 'Bearer ') return null;
  const { data } = await casinoApiRequest.get<t.GetPlayerResponse>(`public/player`);

  return data;
};

export const patchPlayer = async ({ id, ...payload }: t.PatchPlayerPayload) => {
  const { data } = await casinoApiRequest.patch<t.PatchPlayerResponse>(`public/player`, payload);

  return data;
};

export const postRegisterPlayer = async (
  payload: t.PostRegisterPlayerPayload,
): Promise<t.PostRegisterPlayerResponse> => {
  const { data } = await axios.post<t.PostRegisterPlayerResponse>('/api/register', payload);

  return data;
};
