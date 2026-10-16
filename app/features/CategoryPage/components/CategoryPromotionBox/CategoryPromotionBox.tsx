import { FC, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { PromotionDevice } from '@/features/Promotions/Promotion.types';

import { getPromotionImage } from '@/utils/mediaHelpers';

import { CategoryPromotionBoxWrapper, CategoryPromotionImage } from './CategoryPromotionBox.styles';

type CategoryPromotionBoxProps = {
  promoKey: string;
  title?: string;
};

export const CategoryPromotionBox: FC<CategoryPromotionBoxProps> = ({ promoKey, title }) => {
  const { locale } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const device = isTabletOrPhone ? PromotionDevice.Mobile : PromotionDevice.Desktop;

  // Get the thumbnail URL using the new media utilities
  const isDesktop = device === PromotionDevice.Desktop;
  const thumbnail = getPromotionImage(promoKey, 'thumbnail', isDesktop, locale || 'en');

  // Check if this is a local API route or external URL
  const isLocalApiRoute = thumbnail?.startsWith('/api/');

  // Reset image state when promoKey changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [promoKey, thumbnail]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Optimized click handler for immediate navigation
  const handlePromotionClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      // Use router.push for instant client-side navigation
      router.push(`/promotion-details/${promoKey}`);
    },
    [router, promoKey],
  );

  // Prefetch the promotion details page on hover for instant loading
  const handleMouseEnter = useCallback(() => {
    router.prefetch(`/promotion-details/${promoKey}`);
  }, [router, promoKey]);

  return (
    <CategoryPromotionBoxWrapper onMouseEnter={handleMouseEnter}>
      <button
        type="button"
        onClick={handlePromotionClick}
        style={{
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          padding: 0,
          width: '100%',
          height: '100%',
        }}
        aria-label={`View details for ${title || promoKey}`}
      >
        <CategoryPromotionImage>
          {thumbnail && !imageError && isLocalApiRoute && (
            // Use regular img tag for local API routes
            <img
              src={thumbnail}
              alt={title || `${promoKey} promotion`}
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
              alt={title || `${promoKey} promotion`}
              fill
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={false}
              quality={85}
              style={{
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
              {title || 'Promotion'}
            </div>
          )}
        </CategoryPromotionImage>
      </button>
    </CategoryPromotionBoxWrapper>
  );
};
