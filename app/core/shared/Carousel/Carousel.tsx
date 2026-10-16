import { FC } from 'react';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { Url } from 'next-router-mock';
import { FormattedMessage } from 'react-intl';

import { IconArrowLeft, IconArrowRight } from '@/core/shared/Icons';

import {
  CarouselContainer,
  CarouselCustomButton,
  CarouselHeader,
  CarouselNextArrow,
  CarouselPrevArrow,
  NativeScrollItem,
  NativeScrollViewport,
} from './Carousel.styles';
import { Headline } from '../../components/Typography';
import { CarouselProps } from './Carousel.types';
import { ButtonColor, ButtonSize } from '../Button/Button.types';

interface ExtendedCustomArrowProps extends CustomArrowProps {
  customLink: Url;
  isTabletOrPhone: boolean;
}

const SampleNextArrow: FC<CustomArrowProps> = ({ onClick }) => (
  <CarouselNextArrow
    onClick={onClick}
    color={ButtonColor.Tertiary}
    size={ButtonSize.Small}
    data-testid="icon-next"
    aria-label="Next slide"
  >
    <IconArrowRight size="m" />
  </CarouselNextArrow>
);

const SamplePrevArrow: FC<ExtendedCustomArrowProps> = ({ onClick, customLink, isTabletOrPhone }) => (
  <>
    {customLink !== '' && (
      <Link href={customLink} aria-label="See all items">
        <CarouselCustomButton color={ButtonColor.Tertiary} size={ButtonSize.Small}>
          <FormattedMessage id="carousel.seeAll" defaultMessage="See All" />
        </CarouselCustomButton>
      </Link>
    )}
    {!isTabletOrPhone && (
      <CarouselPrevArrow
        onClick={onClick}
        color={ButtonColor.Tertiary}
        size={ButtonSize.Small}
        data-testid="icon-prev"
        aria-label="Previous slide"
      >
        <IconArrowLeft size="m" />
      </CarouselPrevArrow>
    )}
  </>
);

export const Carousel: FC<CarouselProps> = ({
  initialSlide = 0,
  autoplay = false,
  arrows = true,
  centerMode = false,
  children,
  dots = false,
  header,
  headerIcon,
  slidesToShow = 6,
  slidesToScroll = 1,
  customLink = '',
  slidesPerRow = 1,
  rows = 1,
  isTabletOrPhone = false,
  nativeMobileScroll = false,
  speed = 500,
  'data-testid': dataTestId,
  ...props
}) => {
  const useNative = nativeMobileScroll && isTabletOrPhone;

  const settings: Settings = {
    arrows,
    initialSlide,
    autoplay,
    dots,
    speed,
    slidesToShow,
    slidesToScroll,
    centerMode,
    slidesPerRow,
    rows,
    prevArrow: <SamplePrevArrow customLink={customLink} isTabletOrPhone={isTabletOrPhone} />,
    // eslint-disable-next-line react/jsx-no-useless-fragment
    nextArrow: isTabletOrPhone ? <></> : <SampleNextArrow />,
    ...props,
  };

  return (
    <CarouselContainer data-testid={dataTestId}>
      <CarouselHeader>
        {headerIcon && headerIcon}
        {header && <Headline>{header}</Headline>}
      </CarouselHeader>
      {useNative ? (
        <NativeScrollViewport>
          {/* Derive item basis from slidesToShow to keep parity with Slick config */}
          {Array.isArray(children)
            ? children.map((child, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <NativeScrollItem key={idx} style={{ width: `${100 / (slidesToShow || 1)}%` }}>
                  {child}
                </NativeScrollItem>
              ))
            : children}
        </NativeScrollViewport>
      ) : (
        <Slider {...settings}>{children}</Slider>
      )}
    </CarouselContainer>
  );
};
