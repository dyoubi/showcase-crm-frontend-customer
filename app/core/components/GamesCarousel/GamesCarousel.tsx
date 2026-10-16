import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import { routePaths } from '@/core/constants/routes';
import { Carousel } from '@/core/shared/Carousel';
import { CarouselThumbnailWrapper } from '@/core/shared/Carousel/CarouselThumbnailWrapper';
import { Thumbnail } from '@/core/components/Thumbnail';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useGetCategoryMachinesViewsQuery } from '@/core/domains/category';

import { GamesCarouselProps } from './GamesCarousel.types';

export const GamesCarousel: FC<GamesCarouselProps> = ({ categorySlug, icon, ...props }) => {
  const { isPhone, isTabletOrPhone, isDesktop } = useBreakpoints();
  const { formatMessage } = useIntl();

  const categoryTitles: { [key: string]: string } = {
    recommanded: formatMessage({ id: 'carousel.recommended', defaultMessage: 'Bitplay Picks' }),
    slots: formatMessage({ id: 'carousel.slots', defaultMessage: 'Slots' }),
    livecasino: formatMessage({ id: 'carousel.livecasino', defaultMessage: 'Live Casino' }),
    new: formatMessage({ id: 'carousel.new', defaultMessage: 'New' }),
    buyinfeature: formatMessage({ id: 'carousel.buyinfeature', defaultMessage: 'Buy-in Feature' }),
  };

  const { currentData } = useGetCategoryMachinesViewsQuery({ slug: categorySlug });
  const machinesViews = currentData || [];

  // fix: Slick-Carousel doesn't work properly when items count is lower than slidesToShow props
  const items = useMemo(() => {
    if (machinesViews.length === 0 || machinesViews.length > 6) {
      return machinesViews;
    }

    let output = machinesViews;

    while (output.length < 6) {
      output = [...output, ...machinesViews];
    }

    return output;
  }, [machinesViews]);

  const getCarouselItems = () => {
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
      header={<Link href={`${routePaths.category}/${categorySlug}`}>{categoryTitles[categorySlug]}</Link>}
      headerIcon={icon}
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
      customLink={`${routePaths.category}/${categorySlug}`}
      isTabletOrPhone={isTabletOrPhone}
      lazyLoad="ondemand"
      {...props}
    >
      {items.map((item: any) => (
        <CarouselThumbnailWrapper key={item.id}>
          <Link href={`${routePaths.game}/${item.key}`}>
            <Thumbnail
              slug={item.key}
              title={item.title}
              src={{ desktop: item.image?.desktop?.url, mobile: item.image?.mobile?.url }}
              itemId={item.id}
              responsiveWidth
            />
          </Link>
        </CarouselThumbnailWrapper>
      ))}
    </Carousel>
  );
};
