/**
 * Utility functions for handling cached media URLs
 */

export type MediaType = 'games' | 'promotions' | 'carousel' | 'articles';

/**
 * Constructs a URL for cached media content via the BFF media endpoint
 * @param type - The type of media (games, promotions, carousel, articles)
 * @param filename - The filename of the media asset
 * @returns The constructed media URL
 */
export const getMediaUrl = (type: MediaType, filename: string): string => {
  return `/api/bff/media?type=${encodeURIComponent(type)}&filename=${encodeURIComponent(filename)}`;
};

/**
 * Constructs a game image URL for a specific device type
 * @param slug - The game slug/key
 * @param device - The device type ('desktop' or 'mobile')
 * @returns The constructed game image URL
 */
export const getGameImageUrl = (slug: string, device: 'desktop' | 'mobile'): string => {
  const filename = `${slug}-${device}.png`;

  return getMediaUrl('games', filename);
};

/**
 * Constructs a promotion image URL
 * @param promotionKey - The promotion key
 * @param imageType - The type of image ('banner', 'header', 'thumbnail')
 * @param device - The device type ('desktop' or 'mobile')
 * @param locale - The locale (e.g., 'en', 'es')
 * @returns The constructed promotion image URL
 */
export const getPromotionImageUrl = (
  promotionKey: string,
  imageType: 'banner' | 'header' | 'thumbnail',
  device: 'desktop' | 'mobile',
  locale: string,
): string => {
  const filename = `${promotionKey}-${imageType}-${device}-${locale}.png`;

  return getMediaUrl('promotions', filename);
};

/**
 * Constructs a carousel image URL
 * @param carouselKey - The carousel key
 * @param contentId - The content ID
 * @param device - The device type ('desktop' or 'mobile')
 * @param locale - The locale (e.g., 'en', 'es')
 * @returns The constructed carousel image URL
 */
export const getCarouselImageUrl = (
  carouselKey: string,
  contentId: string,
  device: 'desktop' | 'mobile',
  locale: string,
): string => {
  const filename = `${carouselKey}-${contentId}-${device}-${locale}.png`;

  return getMediaUrl('carousel', filename);
};

/**
 * Checks if a media URL is a cached media URL (served by our BFF endpoint)
 * @param url - The URL to check
 * @returns True if it's a cached media URL
 */
export const isCachedMediaUrl = (url: string): boolean => {
  return url.startsWith('/api/bff/media');
};

/**
 * Fallback image URL for when cached images are not available
 */
export const FALLBACK_IMAGE_URL = '/images/example-thumbnail.png';
