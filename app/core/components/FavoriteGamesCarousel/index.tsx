import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import { routePaths } from '@/core/constants/routes';
import { Carousel } from '@/core/shared/Carousel';
import { CarouselThumbnailWrapper } from '@/core/shared/Carousel/CarouselThumbnailWrapper';
import { Thumbnail } from '@/core/components/Thumbnail';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { MachineView, useGetFavoriteMachinesViewQuery } from '@/core/domains/machineView';
import { IconHeart } from '@/core/shared/Icons';
import { DATA_TEST_IDS } from '@/core/constants/constants';

import { genUID } from '@/utils/idgen';

export const FavoriteGamesCarousel = () => {
  // hooks
  const { isPhone, isDesktop, isTabletOrPhone } = useBreakpoints();
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Prevent RTK Query updates during navigation to avoid setState during render
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const { data: favorites } = useGetFavoriteMachinesViewQuery(undefined, {
    skip: isNavigating,
  });

  // constants
  const getCarouselItems = () => {
    if (isPhone) {
      return 3;
    }

    if (isDesktop) {
      return 5;
    }

    return 6;
  };

  const carouselItemsToShow = getCarouselItems();

  const items = useMemo(() => {
    // first we initialize the array with void value
    const machinesViews: Array<MachineView | string> = Array(carouselItemsToShow).fill('').map(genUID);

    (favorites || [])?.forEach((favorite: any, index: number) => {
      // then we populate the array by replace void value with machineView
      machinesViews[index] = favorite?.subject;
    });

    return machinesViews;
  }, [favorites, carouselItemsToShow]);

  if (!favorites?.length) {
    return null;
  }

  return (
    <Carousel
      data-testid={DATA_TEST_IDS.FAVORITES_GAMES_CAROUSEL}
      header={
        <Link href={routePaths.favorite}>
          {formatMessage({
            id: 'favorites',
            defaultMessage: 'Favorites',
          })}
        </Link>
      }
      slidesToShow={carouselItemsToShow}
      slidesToScroll={1}
      dots={false}
      customLink={routePaths.favorite}
      isTabletOrPhone={isTabletOrPhone}
    >
      {items.map((item) => {
        if (typeof item === 'string') {
          return <div key={item} />;
        }

        return (
          <CarouselThumbnailWrapper key={item.id}>
            <Link href={`${routePaths.game}/${item.key}`} prefetch>
              <Thumbnail
                slug={item.key}
                title={item.title}
                src={{
                  desktop: item.image?.desktop?.url,
                  mobile: item.image?.mobile?.url,
                }}
                itemId={item.id}
                responsiveWidth
              />
            </Link>
          </CarouselThumbnailWrapper>
        );
      })}
    </Carousel>
  );
};
