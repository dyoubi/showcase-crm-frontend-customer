import { FC, memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { Promotion } from '@/core/domains/promotion';

import { useHomePageContext } from '@/features/Homepage/context/HomePageContext';
import { PromotionBox } from '@/features/Promotions/components/PromotionBox';

import { HomeSliderImage } from './HomeSliderImage';
import * as S from './styles';
import { DotsContainer } from './DotsContainer';
import { Dot } from './Dot';
import { HomeSliderProps, SliderRef } from './types';

export const HomeSlider: FC<HomeSliderProps> = memo(
  ({ isThumbnail = false }) => {
    const {
      ssrPromotionsData: currentPromotions,
      ssrSliderItems: sortedSliderItems,
      ssrIsLogged,
    } = useHomePageContext();

    const isLogged = ssrIsLogged;

    const sliderRef = useRef<SliderRef>({});
    const { isPhone, isDesktop, isTablet } = useBreakpoints();
    const { locale } = useRouter();
    const isPhoneOrTablet = isPhone || isTablet;

    const customPagingFunc = useCallback(
      (currentPage: number) => <Dot sliderRef={sliderRef} currentPage={currentPage} />,
      [],
    );

    const appendDotFunc = useCallback(
      (children: ReactNode) => <DotsContainer isPhone={isPhone}>{children}</DotsContainer>,
      [isPhone],
    );

    const deviceType = useMemo(() => {
      if (isPhone) return 'mobile';

      if (isTablet) return 'desktop';

      if (isDesktop) return 'desktop';

      return 'desktop';
    }, [isPhone, isTablet, isDesktop]);

    const defaultLocale = 'en';

    // Memoize slider items with promotion filtering for better performance
    const validSliderItems = useMemo(() => {
      if (!sortedSliderItems || !currentPromotions) return [];

      return sortedSliderItems
        .map((item, index) => {
          const promotionItem = currentPromotions.find((promo: Promotion) => promo.bannerId === item.contentId);

          if (!promotionItem) return null;

          return {
            item,
            promotionItem,
            isFirst: index === 0,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
    }, [sortedSliderItems, currentPromotions]);

    if (!validSliderItems.length) {
      return null;
    }

    return (
      <S.StyledSlider
        ref={(ref) => {
          sliderRef.current.slideTo = (slideNumber: number) =>
            ref?.slickGoTo(isThumbnail && !isPhoneOrTablet ? slideNumber * 2 : slideNumber);
        }}
        arrows={false}
        slidesToShow={isThumbnail && !isPhoneOrTablet ? 2 : 1}
        slidesToScroll={isThumbnail && !isPhoneOrTablet ? 2 : 1}
        dots
        infinite
        autoplay
        isThumbnail={isThumbnail}
        autoplaySpeed={10000}
        swipe={isPhoneOrTablet}
        swipeToSlide={isPhoneOrTablet}
        customPaging={customPagingFunc}
        appendDots={appendDotFunc}
        lazyLoad="ondemand"
      >
        {validSliderItems.map(({ item, promotionItem, isFirst }) => {
          if (isThumbnail) {
            return (
              <PromotionBox
                key={promotionItem.key}
                promoKey={promotionItem.key}
                startDate={promotionItem.startDate}
                endDate={promotionItem.endDate}
                noHeaders
              />
            );
          }

          return (
            <Link href={`/promotion-details/${promotionItem.key}`} key={promotionItem.key}>
              <HomeSliderImage item={item} lang={locale || defaultLocale} device={deviceType} />
            </Link>
          );
        })}
      </S.StyledSlider>
    );
  },
  (prevProps, nextProps) => prevProps.isThumbnail === nextProps.isThumbnail,
);
