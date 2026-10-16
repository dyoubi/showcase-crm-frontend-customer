import { CSSProperties, memo } from 'react';

// Sorted imports
import { AnimatedLoader } from '@/core/shared/AnimatedLoader/AnimatedLoader';
import { CarouselItem } from '@/core/domains/carousel';
import { useIsLogged } from '@/core/hooks/useIsLogged';

import { getCarouselImage } from '@/utils/mediaHelpers';

interface HomeSliderImageProps {
  item: CarouselItem;
  lang: string;
  device: string;
}

export const HomeSliderImage = memo(
  ({ item, lang, device }: HomeSliderImageProps) => {
    const isLogged = useIsLogged();

    const key = isLogged ? 'HomePage' : 'Homepage_Not_Logged';

    const carouselImage = getCarouselImage(key, item.contentId, device === 'desktop', lang);

    const isLoading = false; // @TODO: Replace with actual loading state if needed

    if (isLoading) {
      return (
        <div style={{ margin: 'auto', width: '100%', position: 'relative', height: '100%' }}>
          <AnimatedLoader />
        </div>
      );
    }

    if (!carouselImage) {
      return null;
    }

    const imgStyle: CSSProperties = {
      margin: 'auto',
      width: '100%',
      display: 'block',
      transition: 'opacity 0.5s ease-in',
    };

    return <img alt="Home Page Carousel" src={carouselImage} style={imgStyle} />;
  },
  (prevProps: Readonly<HomeSliderImageProps>, nextProps: Readonly<HomeSliderImageProps>) => {
    return (
      prevProps.item.contentId === nextProps.item.contentId &&
      prevProps.lang === nextProps.lang &&
      prevProps.device === nextProps.device
    );
  },
);
