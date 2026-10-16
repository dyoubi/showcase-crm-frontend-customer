import { FC } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { Carousel } from '@/core/shared/Carousel';
import { CarouselThumbnailWrapper } from '@/core/shared/Carousel/CarouselThumbnailWrapper';
import { Thumbnail } from '@/core/components/Thumbnail';
import { BuiltInCategoriesSlugsEnum, useGetCategoriesQuery } from '@/core/domains/category';
import { routePaths } from '@/core/constants/routes';

import { RecommendedCarouselProps } from './RecommendedCarousel.types';
import { StyledIconHeart } from './RecommendedCarousel.styles';

export const RecommendedCarousel: FC<RecommendedCarouselProps> = ({ customSlidesToShow, ...props }) => {
  const { formatMessage } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();
  const { category } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      category: data?.find((cat) => cat.key === BuiltInCategoriesSlugsEnum.RECOMMANDED),
    }),
  });

  const machinesView = category?.machinesViews || [];

  return (
    <Carousel
      header={formatMessage({
        id: 'carousel.recommended',
        defaultMessage: 'Bitplay Picks',
      })}
      headerIcon={<StyledIconHeart />}
      slidesToShow={customSlidesToShow || (isTabletOrPhone ? 3 : 6)}
      infinite={false}
      isTabletOrPhone={isTabletOrPhone}
      {...props}
    >
      {machinesView.map((machineView) => (
        <CarouselThumbnailWrapper key={machineView?.id}>
          <Link href={`${routePaths.game}/${machineView.key}`}>
            <Thumbnail
              slug={machineView.key}
              title={machineView?.title}
              src={{
                mobile: machineView?.image?.mobile?.url,
                desktop: machineView?.image?.desktop?.url,
              }}
              itemId={machineView?.id}
              responsiveWidth
            />
          </Link>
        </CarouselThumbnailWrapper>
      ))}
    </Carousel>
  );
};
