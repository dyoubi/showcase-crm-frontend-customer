import { casinoApiRequest } from '@/core/domains/api';

import { encodeFilter } from '@/utils/url';

import * as t from './types';

export const getMachineView = async ({ slug = '' }) => {
  const { data } = await casinoApiRequest.get<t.GetMachinesViewsResponse>(
    `/public/machine-views/?filter=${encodeFilter({
      include: ['tags'],
      where: { key: slug },
    })}`,
  );

  return data?.[0];
};

export const getMachinesViews = async () => {
  const { data } = await casinoApiRequest.get<t.GetMachinesViewsResponse>(`/public/machine-views/`);

  return data;
};

export const play = async (payload: t.PostPlayMachineViewPayload) => {
  if (payload.demo) {
    const { data } = await casinoApiRequest.post<t.PostPlayMachineViewResponse>(`/public/demo/`, {
      game: payload.game,
      locale: payload.locale,
      clientType: payload.clientType,
      demo: true,
    });

    return data;
  }

  const { data } = await casinoApiRequest.post<t.PostPlayMachineViewResponse>(`/public/play/`, payload);

  return data;
};

interface SearchParams {
  term?: string;
}

export const searchMachinesViews = async ({ term }: SearchParams) => {
  const filter = {
    where: {
      title: {
        ilike: `%${(term || '').toLowerCase()}%`,
      },
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetMachinesViewsResponse>(
    `/public/machine-views/?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const getFavoritesMachineView = async () => {
  const token = casinoApiRequest.defaults.headers.authorization;

  if (!token || token === 'Bearer ') return [];

  const { data } = await casinoApiRequest.get<t.GetFavoritesMachinesViewResponse>(
    `/public/player/favorites?filter=${encodeFilter({
      include: ['subject'],
    })}`,
  );

  // we remove all assignation without subject
  return [...data]?.filter((item) => !!item?.subject);
};

export const postFavoriteMachineView = async (machineViewId: string) => {
  const payload: t.PostFavoriteMachineViewPayload = {
    subjectId: machineViewId,
    favoriteType: 'machine_view',
  };

  await casinoApiRequest.post('/public/player/favorites', payload);

  return true;
};

export const deleteFavoriteMachineView = async (assignationId: string) => {
  await casinoApiRequest.delete(`/public/player/favorites/${assignationId}`);

  return true;
};
