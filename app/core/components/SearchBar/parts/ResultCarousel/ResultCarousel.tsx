import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { Carousel } from '@/core/shared/Carousel';
import { CarouselThumbnailWrapper } from '@/core/shared/Carousel/CarouselThumbnailWrapper';
import { IconProvider } from '@/core/shared/Icons';
import { Thumbnail } from '@/core/components/Thumbnail';

import { ResultCarouselProps } from './ResultCarousel.types';

export const ResultCarousel: FC<ResultCarouselProps> = ({ results, customSlidesToShow, ...props }) => {
  const { formatMessage } = useIntl();
  const { isPhone, isTabletOrPhone, isDesktop } = useBreakpoints();

  // fix: Slick-Carousel doesn't work properly when items count is lower than slidesToShow props
  const items = useMemo(() => {
    const slidesToShow = customSlidesToShow || (isTabletOrPhone ? 3 : 6);

    if (!results || results.length === 0 || results.length > 6) {
      return results || [];
    }

    let output = results;

    while (output.length < slidesToShow) {
      output = [...output, ...results];
    }

    return output;
  }, [results, customSlidesToShow, isTabletOrPhone]);

  const getCarouselItems = () => {
    if (customSlidesToShow) {
      return customSlidesToShow;
    }

    if (isPhone) {
      return 3;
    }

    if (isDesktop) {
      return 5;
    }

    return 6;
  };

  // IMPORTANT: Enable smooth native-like swipe on touch devices.
  // swipeToSlide allows the user to fling across multiple slides in a single gesture
  // instead of being limited to `slidesToScroll` (which stays 1 for precise arrow control on desktop).
  // We also only enable infinite looping if we actually have more items than we display to avoid
  // awkward cloning artifacts when the list was artificially duplicated to reach min length.
  // Slightly faster + easing for a more fluid feel on mobile while remaining snappy on desktop

  return (
    <Carousel
      header={formatMessage({
        id: 'carousel.searchResults',
        defaultMessage: 'Search Results',
      })}
      headerIcon={<IconProvider />}
      slidesToShow={getCarouselItems()}
      slidesToScroll={1}
      swipe
      swipeToSlide
      draggable
      infinite={items.length > getCarouselItems()}
      touchThreshold={12}
      speed={400}
      cssEase="cubic-bezier(0.22, 0.61, 0.36, 1)"
      nativeMobileScroll={isPhone}
      dots={false}
      isTabletOrPhone={isTabletOrPhone}
      lazyLoad="ondemand"
      {...props}
    >
      {items.map((result) => {
        return (
          <CarouselThumbnailWrapper key={result.id}>
            <Link href={`/game/${result.key}`}>
              <Thumbnail
                slug={result.key}
                title={result.title}
                src={{
                  desktop: result.image?.desktop?.url,
                  mobile: result.image?.mobile?.url,
                }}
                itemId={result.id}
              />
            </Link>
          </CarouselThumbnailWrapper>
        );
      })}
    </Carousel>
  );
};
