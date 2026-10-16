import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useGetPromotionsQuery } from '@/core/domains/promotion';
import { useGetCarouselsQuery } from '@/core/domains/carousel';
import { useIsLogged } from '@/core/hooks/useIsLogged';

import { CategoryPromotionBox } from '../CategoryPromotionBox';
import * as S from './styles';
import { DotsContainer } from './DotsContainer';
import { Dot } from './Dot';
import { SliderRef } from './types';

export const CategorySlider = () => {
  // hooks
  const sliderRef = useRef<SliderRef>({});
  const router = useRouter();
  const { isPhone, isTablet } = useBreakpoints();
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

  const { data, isLoading: isCarouselLoading } = useGetCarouselsQuery(undefined, {
    skip: isNavigating,
  });
  const promotionData = useGetPromotionsQuery(undefined, {
    skip: isNavigating,
  });

  const isPhoneOrTablet = isPhone || isTablet;
  const isLogged = useIsLogged();
  const key = isLogged ? 'HomePage' : 'Homepage_Not_Logged';
  const homePageCarouselData = data?.find((item) => item.key === key);
  const sortedSliderItems =
    homePageCarouselData?.items && [...homePageCarouselData.items].sort((a, b) => a.priority - b.priority);

  const customPagingFunc = (currentPage: number) => <Dot sliderRef={sliderRef} currentPage={currentPage} />;
  const appendDotFunc = (children: ReactNode) => <DotsContainer isPhone={isPhone}>{children}</DotsContainer>;

  if (!sortedSliderItems || isNavigating) {
    return null;
  }

  return (
    <S.StyledCategorySlider
      ref={(ref) => {
        sliderRef.current.slideTo = (slideNumber) => ref?.slickGoTo(!isPhoneOrTablet ? slideNumber * 2 : slideNumber);
      }}
      arrows={false}
      slidesToShow={!isPhoneOrTablet ? 2 : 1}
      slidesToScroll={!isPhoneOrTablet ? 2 : 1}
      dots
      infinite
      autoplay
      isThumbnail
      autoplaySpeed={10000}
      swipe={isPhoneOrTablet}
      swipeToSlide={isPhoneOrTablet}
      customPaging={customPagingFunc}
      appendDots={appendDotFunc}
    >
      {sortedSliderItems.map((item) => {
        const promotionItem = promotionData.data?.find((promo) => promo.bannerId === item.contentId); // Assuming 'key' is the common identifier

        return promotionItem ? (
          <CategoryPromotionBox key={promotionItem.key} promoKey={promotionItem.key} title={promotionItem.name} />
        ) : null;
      })}
    </S.StyledCategorySlider>
  );
};
