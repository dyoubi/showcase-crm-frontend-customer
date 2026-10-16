import { CarouselItem, GetCarouselsResponse } from '@/core/domains/carousel';

import { getCarouselImageUrl } from '@/utils/mediaUtils';

export const getSliderItems = (
  carousels: GetCarouselsResponse,
  isLogged: boolean,
  deviceType = 'desktop',
  locale = 'en',
) => {
  const key = isLogged ? 'HomePage' : 'Homepage_Not_Logged';
  const carouselData = carousels?.find((item) => item.key === key);

  if (!carouselData?.items) {
    return [];
  }

  // Sort by priority and add cached media URLs
  return [...carouselData.items]
    .sort((a, b) => a.priority - b.priority)
    .map(
      (item): CarouselItem => ({
        ...item,
        contentURL: item.contentId || '',
      }),
    );
};
