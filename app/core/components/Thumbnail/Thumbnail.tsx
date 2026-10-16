import { useState } from 'react';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { FavoriteButton } from '@/features/GamePage/components/GameFooter/FavoriteButton';

import { FALLBACK_IMAGE_URL, getGameImageUrl } from '@/utils/mediaUtils';

import { useTitleParts } from './hooks';
import { ThumbnailProps, TitleParts } from './types';
import {
  FavoriteButtonContainer,
  GCContainer,
  GCImage,
  GCTopLayer,
  GCTopLayerText,
  GCTopLayerTextLine,
  GCTopLayerTextLinePart,
} from './Thumbnail.styles';

export const Thumbnail = ({ slug, src, title, itemId, responsiveWidth = false, disableHover }: ThumbnailProps) => {
  const { isDesktop } = useBreakpoints();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { getTitleParts } = useTitleParts();

  const titleParts: TitleParts = getTitleParts(title);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Determine the best image source based on device and available data
  const getImageSrc = () => {
    // If slug is provided, use the cached media endpoint
    if (slug) {
      const device = isDesktop ? 'desktop' : 'mobile';

      return getGameImageUrl(slug, device);
    }

    // Final fallback to example image
    return FALLBACK_IMAGE_URL;
  };

  const imageSrc = getImageSrc();

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;

    // If cached media images are not available, try src images as fallback
    if (src && img.src.includes('/api/bff/media')) {
      const preferredSrc = isDesktop ? src.desktop : src.mobile;

      if (preferredSrc && img.src !== preferredSrc) {
        img.src = preferredSrc;

        return;
      }

      // Try the other device type from src
      const fallbackSrc = isDesktop ? src.mobile : src.desktop;

      if (fallbackSrc && img.src !== fallbackSrc) {
        img.src = fallbackSrc;

        return;
      }
    }

    // Final fallback to example image
    img.src = FALLBACK_IMAGE_URL;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <GCContainer
      responsiveWidth={responsiveWidth}
      disableHover={disableHover}
      imageLoaded={imageLoaded}
      data-testid="thumbnail-container"
    >
      {itemId && (
        <FavoriteButtonContainer
          className="favorite-button-container"
          onClick={handleFavoriteClick}
          data-testid="favorite-button-container"
        >
          <FavoriteButton machineViewId={itemId} customColor="red" />
        </FavoriteButtonContainer>
      )}
      <GCImage
        src={imageSrc}
        overrideSrc={imageSrc}
        alt={`${title} - Game Thumbnail`}
        fill
        sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16.67vw"
        style={{
          objectFit: 'cover',
          opacity: imageLoaded ? 1 : 0,
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        priority={false}
        loading="lazy"
        unoptimized
      />
      <GCTopLayer>
        <GCTopLayerText>
          {titleParts.lines.map((line) => (
            <GCTopLayerTextLine key={line.parts[0].key}>
              {line.parts.map((part) => (
                <GCTopLayerTextLinePart numChars={part.length} key={part.key}>
                  {part.raw}
                </GCTopLayerTextLinePart>
              ))}
            </GCTopLayerTextLine>
          ))}
        </GCTopLayerText>
      </GCTopLayer>
    </GCContainer>
  );
};
