import { FC, useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useGetPromotionQuery } from '@/core/domains/promotion';
import { IconArrowRight } from '@/core/shared/Icons';

import { createImageErrorHandler, getPromotionImage } from '@/utils/mediaHelpers';

import { PromotionBoxProps } from './PromotionBox.types';
import { PromotionDevice } from '../../Promotion.types';
import {
  PromotionBoxWrapper,
  PromotionHeaderContainer,
  PromotionHeadline,
  PromotionImage,
  PromotionSubheadline,
  PromotionSubHeadlineAndIconContainer,
} from './PromotionBox.styles';
import { PromotionBoxSkeleton } from './PromotionBoxSkeleton';

export const PromotionBox: FC<PromotionBoxProps> = ({ title, startDate, endDate, promoKey, noHeaders = false }) => {
  const { locale } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const device = isTabletOrPhone ? PromotionDevice.Mobile : PromotionDevice.Desktop;

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

  const { data, isLoading, error } = useGetPromotionQuery(
    {
      locale,
      slug: promoKey,
      device,
    },
    {
      // Skip query during SSR, initial hydration, and navigation to prevent state conflicts
      skip: !isMounted || isNavigating,
    },
  );

  // Get the thumbnail URL using the new media utilities
  const isDesktop = device === PromotionDevice.Desktop;
  const thumbnail = getPromotionImage(promoKey, 'thumbnail', isDesktop, locale || 'en');

  // Check if this is a local API route or external URL
  const isLocalApiRoute = thumbnail?.startsWith('/api/');

  // Ensure component is mounted before making API calls
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset image state when promoKey changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [promoKey, thumbnail]);

  const handleImageLoad = useCallback(() => {
    // Use timeout to defer state update and avoid render conflicts
    setTimeout(() => setImageLoaded(true), 0);
  }, []);

  const handleImageError = useCallback(() => {
    // Use timeout to defer state update and avoid render conflicts
    setTimeout(() => setImageError(true), 0);
  }, []);

  // Show skeleton while mounting, loading, navigating, or if there's an error loading the promotion data
  if (!isMounted || isLoading || isNavigating || error) {
    return <PromotionBoxSkeleton />;
  }

  return (
    <PromotionBoxWrapper>
      <Link href={`/promotion-details/${promoKey}`} prefetch>
        <PromotionImage>
          {thumbnail && !imageError && isLocalApiRoute && (
            // Use regular img tag for local API routes
            <img
              src={thumbnail}
              alt={data?.title?.contentText || `${promoKey} promotion`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            />
          )}
          {thumbnail && !imageError && !isLocalApiRoute && (
            // Use Next.js Image for external URLs
            <Image
              src={thumbnail}
              alt={data?.title?.contentText || `${promoKey} promotion`}
              width={454} // Fixed width to prevent layout shift
              height={200} // Fixed height to prevent layout shift
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={false} // Let Next.js handle priority
              quality={85}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {(!thumbnail || imageError) && (
            // Fallback for when image fails to load
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                color: '#666',
                fontSize: '14px',
              }}
            >
              {data?.title?.contentText || title || 'Promotion'}
            </div>
          )}
        </PromotionImage>
      </Link>
      {!noHeaders && (
        <PromotionHeaderContainer>
          <PromotionHeadline>{data?.title?.contentText || title}</PromotionHeadline>
          <PromotionSubHeadlineAndIconContainer>
            <PromotionSubheadline>
              <Link href={`/promotion-details/${promoKey}`}>
                <FormattedMessage id="page.promotions.moreDetails" defaultMessage="More details" tagName="span" />
              </Link>
            </PromotionSubheadline>
            <IconArrowRight color="primary" />
          </PromotionSubHeadlineAndIconContainer>
        </PromotionHeaderContainer>
      )}
    </PromotionBoxWrapper>
  );
};
