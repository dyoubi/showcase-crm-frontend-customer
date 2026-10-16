// ⚠️ in this file it's forbidden to import anything related to ReactJS or any framework

import { casinoApiRequest } from '@/core/domains/api';

import * as t from './types';

export const getCategory = async (slug: string) => {
  const { data } = await casinoApiRequest.get<t.GetCategoryResponse>(`/category/${slug}`);

  return data;
};

export const postCategory = async (payload: t.PostCategoryPayload) => {
  const { data } = await casinoApiRequest.post<t.PostCategoryResponse>('/category', {
    name: payload.name,
    slug: payload.slug,
  });

  return data;
};
