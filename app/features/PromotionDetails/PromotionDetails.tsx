import React, { Suspense, useState } from 'react';
import { useIntl } from 'react-intl';

import { ContentContainer } from '@/core/components/Layout';
import { Headline } from '@/core/components/Typography';
import { RichText } from '@/core/components/RichText';
import { URLDateFormatsByLanguage } from '@/core/constants/constants';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { AnimatedLoader } from '@/core/shared/AnimatedLoader/AnimatedLoader';

import { formatDateString } from '@/utils/date';
import { createImageErrorHandler, getPromotionImage } from '@/utils/mediaHelpers';

import {
  DateHeadline,
  DescriptionContainer,
  DescriptionText,
  FooterText,
  PromotionDetailsImageContainer,
} from './PromotionDetails.styles';
import { usePromotionDetailsContext } from './context';
import { PromotionDetailsSkeleton } from './PromotionDetailsSkeleton';

// Create a client-side only component for the image
const PromotionImage = ({
  headerURL,
  altText,
  onError,
  onLoad,
}: {
  headerURL: string;
  altText: string;
  onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: () => void;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);

    if (onLoad) onLoad(); // Call the onLoad prop if provided
  };

  return (
    <PromotionDetailsImageContainer>
      {!isImageLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedLoader />
        </div>
      )}
      <img
        src={headerURL}
        alt={altText}
        onError={onError}
        onLoad={handleImageLoad}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          opacity: isImageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          display: 'block',
        }}
      />
    </PromotionDetailsImageContainer>
  );
};

export const PromotionDetailsPage = () => {
  const { promotionDetails } = usePromotionDetailsContext();
  const { locale } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();

  const urlDateFormat = URLDateFormatsByLanguage[locale as string] || URLDateFormatsByLanguage.default;

  // Show error message if no promotion data
  if (promotionDetails === null) {
    return (
      <ContentContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Promotion not found</h2>
          <p>The promotion you&apos;re looking for could not be loaded.</p>
        </div>
      </ContentContainer>
    );
  }

  // Show skeleton while waiting for data
  if (!promotionDetails) {
    return <PromotionDetailsSkeleton />;
  }

  // Get the header image URL using the new media utilities
  const isDesktop = !isTabletOrPhone;
  const headerURL = getPromotionImage(promotionDetails.key, 'header', isDesktop, locale || 'en');

  // Create error handler for fallback images
  const handleImageError = createImageErrorHandler(undefined, isDesktop, [
    promotionDetails.header?.contentURL || '', // Fallback to the original header URL if available
  ]);

  return (
    <ContentContainer>
      <Suspense fallback={<PromotionDetailsSkeleton />}>
        <PromotionImage
          headerURL={headerURL}
          altText={promotionDetails.title.contentText || 'Promotion header'}
          onError={handleImageError}
        />
      </Suspense>
      {!!promotionDetails.startDate && !!promotionDetails.endDate && (
        <DateHeadline>{`${formatDateString(promotionDetails.startDate, urlDateFormat)} - ${formatDateString(
          promotionDetails.endDate,
          urlDateFormat,
        )}`}</DateHeadline>
      )}
      <DescriptionContainer>
        <Headline>{promotionDetails.title.contentText || ''}</Headline>
        <DescriptionText>
          <RichText data={promotionDetails.body?.content} />
        </DescriptionText>
        <FooterText>
          <RichText data={promotionDetails.terms?.content} />
        </FooterText>
      </DescriptionContainer>
    </ContentContainer>
  );
};
