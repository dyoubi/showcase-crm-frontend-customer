import { bffApiRequest } from '../api';
import * as t from './types';

export const getCarousels = async () => {
  const { data } = await bffApiRequest.get<t.GetCarouselsResponse>('/carousels');

  return data;
};

export const getCarouselContent = async (
  casinoId: string,
  id: string,
  lang?: string | undefined,
  device?: string | undefined,
) => {
  const searchParams = new URLSearchParams({
    carouselKey: id, // Assuming id is the carousel key
    contentId: id,
  });

  if (lang) searchParams.append('locale', lang);

  if (device) searchParams.append('device', device);

  const url = `/carousel-content?${searchParams.toString()}`;

  const { data } = await bffApiRequest.get<t.GetCarouselContentResponse>(url);

  return data;
};
