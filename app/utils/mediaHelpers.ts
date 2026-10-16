/**
 * Extended media utilities for promotions and carousel components
 */

import { FALLBACK_IMAGE_URL, getCarouselImageUrl, getPromotionImageUrl } from './mediaUtils';

/**
 * Gets the appropriate promotion image URL based on image type and device
 * @param promotionKey - The promotion key
 * @param imageType - The type of image needed
 * @param isDesktop - Whether the user is on desktop
 * @param locale - The current locale
 * @returns The promotion image URL
 */
export const getPromotionImage = (
  promotionKey: string,
  imageType: 'banner' | 'header' | 'thumbnail',
  isDesktop: boolean,
  locale = 'en',
): string => {
  const device = isDesktop ? 'desktop' : 'mobile';

  return getPromotionImageUrl(promotionKey, imageType, device, locale);
};

/**
 * Gets the appropriate carousel image URL based on device
 * @param carouselKey - The carousel key
 * @param contentId - The content ID
 * @param isDesktop - Whether the user is on desktop
 * @param locale - The current locale
 * @returns The carousel image URL
 */
export const getCarouselImage = (carouselKey: string, contentId: string, isDesktop: boolean, locale = 'en'): string => {
  const device = isDesktop ? 'desktop' : 'mobile';

  return getCarouselImageUrl(carouselKey, contentId, device, locale);
};

/**
 * Creates an error handler for images that tries alternative device types and fallbacks
 * @param slug - The game/item slug
 * @param isDesktop - Whether the user is on desktop
 * @param alternativeUrls - Additional URLs to try as fallbacks
 * @returns Image error handler function
 */
export const createImageErrorHandler = (slug?: string, isDesktop?: boolean, alternativeUrls: Array<string> = []) => {
  return (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    const currentSrc = img.src;

    // Track which URLs we've already tried to avoid infinite loops
    const triedUrls = img.dataset.triedUrls ? JSON.parse(img.dataset.triedUrls) : [];

    triedUrls.push(currentSrc);
    img.dataset.triedUrls = JSON.stringify(triedUrls);

    // If we have a slug and are using cached media, try alternative device type
    if (slug && currentSrc.includes('/api/bff/media') && isDesktop !== undefined) {
      // For carousel images, try different media types
      if (currentSrc.includes('type=carousel')) {
        const alternativeDevice = isDesktop ? 'mobile' : 'desktop';
        const alternativeUrl = `/api/bff/media?type=carousel&filename=${slug}-${alternativeDevice}.png`;

        if (!triedUrls.includes(alternativeUrl)) {
          img.src = alternativeUrl;

          return;
        }
      }

      // For game images, try different device type
      if (currentSrc.includes('type=games')) {
        const alternativeDevice = isDesktop ? 'mobile' : 'desktop';
        const alternativeUrl = `/api/bff/media?type=games&filename=${slug}-${alternativeDevice}.png`;

        if (!triedUrls.includes(alternativeUrl)) {
          img.src = alternativeUrl;

          return;
        }
      }
    }

    // Try alternative URLs provided
    const nextUrl = alternativeUrls.find((url) => !triedUrls.includes(url));

    if (nextUrl) {
      img.src = nextUrl;

      return;
    }

    // Final fallback
    if (!triedUrls.includes(FALLBACK_IMAGE_URL)) {
      img.src = FALLBACK_IMAGE_URL;
    }
  };
};
