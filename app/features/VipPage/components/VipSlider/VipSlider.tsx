import { FC, ReactNode, useRef, useState } from 'react';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { VipButton } from './VipButton/VipButton';
import { VipButtonContainer } from './VipButtonContainer/VipButtonContainer';
import { StyledSlider } from './VipSlider.styles';
import { SliderRef, VipLevel } from './VipSlider.types';
import { VIP_TIERS } from './constants';
import { VIPCard } from './VipCard/VipCard';

export const VipSlider: FC = () => {
  const { isPhone, isTablet } = useBreakpoints();
  const sliderRef = useRef<SliderRef>({});
  const [activeVIPLevel, setActiveVipLevel] = useState<VipLevel>(VIP_TIERS[0]);

  const updateActiveColor = (slideNumber: number) => {
    const selected = VIP_TIERS[slideNumber];

    setActiveVipLevel(selected);
  };

  const customPagingFunc = (currentIndex: number) => <VipButton sliderRef={sliderRef} currentIndex={currentIndex} />;

  const appendDotsFunc = (children: ReactNode) => (
    <VipButtonContainer activeColor={activeVIPLevel.featureColor}>{children}</VipButtonContainer>
  );

  return (
    <StyledSlider
      ref={(ref) => {
        sliderRef.current.slideTo = (slideNumber) => {
          ref?.slickGoTo(slideNumber);
          updateActiveColor(slideNumber);
        };
      }}
      arrows={false}
      slidesToShow={isPhone || isTablet ? 1 : 3}
      centerMode
      infinite
      dots
      initialSlide={0}
      swipe={isPhone || isTablet}
      swipeToSlide={isPhone || isTablet}
      focusOnSelect
      beforeChange={(currentSlideIndex, nextSlideIndex) => {
        updateActiveColor(nextSlideIndex);
      }}
      customPaging={customPagingFunc}
      appendDots={appendDotsFunc}
    >
      {VIP_TIERS.map((article) => {
        return <VIPCard key={article.id} {...article} />;
      })}
    </StyledSlider>
  );
};
