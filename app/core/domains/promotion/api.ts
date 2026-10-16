import { bffApiRequest } from '../api';
import * as t from './types';

export const getPromotions = async (casinoId: string) => {
  const { data } = await bffApiRequest.get<t.GetPromotionsResponse>(`/promotions`);

  return data;
};

export const getPromotion = async ({ casinoId, slug, ...params }: t.GetPromotionParams) => {
  const parameters = new URLSearchParams({
    device: params.device,
    locale: params.locale,
    slug,
  });

  const { data } = await bffApiRequest.get<t.GetPromotionResponse>(
    `/promotion?${encodeURIComponent(slug)}&${parameters.toString()}`,
  );

  return data;
};
