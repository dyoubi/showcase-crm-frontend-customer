import { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { Device, MediaContextTypes, Orientation } from './types';
import { viewports } from './media';
import { debounce } from './debounce';

export function resolveMediaContext(width: number, height: number): MediaContextTypes {
  const { device } = viewports.filter((v) => !v.max || width <= v.max).shift()!;
  const orientation: Orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

  return {
    viewport: {
      width,
      height,
    },
    isMobile: device === 'MOBILE',
    isMobilePlus: device === 'MOBILE_PLUS',
    isTablet: device === 'TABLET',
    isTabletPlus: device === 'TABLET_PLUS',
    isTabletOrPhone: device === 'MOBILE' || device === 'MOBILE_PLUS' || device === 'TABLET',
    isDesktop: device === 'DESKTOP',
    isWidescreen: device === 'DESKTOP' && width > 1920,
    device: device as Device, // MOBILE, MOBILE_PLUS, TABLET, TABLET_PLUS, DESKTOP
    orientation, // PORTRAIT | LANDSCAPE
  };
}

export const defaultMediaContextMobile: MediaContextTypes = {
  viewport: {
    // most common mobile screen size
    width: 375,
    height: 743,
  },
  device: 'MOBILE', // MOBILE, MOBILE_PLUS, TABLET, TABLET_PLUS, DESKTOP
  orientation: 'PORTRAIT', // PORTRAIT | LANDSCAPE
  isMobile: true,
  isMobilePlus: false,
  isTablet: false,
  isTabletPlus: false,
  isTabletOrPhone: true,
  isDesktop: false,
  isWidescreen: false,
};

export const defaultMediaContextDesktop: MediaContextTypes = {
  viewport: {
    // most common desktop screen size
    width: 1920,
    height: 1080,
  },
  device: 'DESKTOP', // MOBILE, MOBILE_PLUS, TABLET, TABLET_PLUS, DESKTOP
  orientation: 'LANDSCAPE', // PORTRAIT | LANDSCAPE
  isMobile: false,
  isMobilePlus: false,
  isTablet: false,
  isTabletPlus: false,
  isTabletOrPhone: false,
  isDesktop: true,
  isWidescreen: true,
};

export const MediaContext = createContext<MediaContextTypes>(defaultMediaContextDesktop);

const MediaContextProviderCL: FC<{ isMobileDevice?: boolean; children?: ReactNode }> = ({
  children,
  isMobileDevice,
}) => {
  // Always start with a consistent default value for SSR
  const [contextValue, setContextValue] = useState<MediaContextTypes>(
    isMobileDevice ? defaultMediaContextMobile : defaultMediaContextDesktop,
  );

  // Flag to track if we're in the client
  const [isClient, setIsClient] = useState(false);

  // Effect to set isClient to true once mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  const resolveContextValue = useCallback((): MediaContextTypes => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return isMobileDevice ? defaultMediaContextMobile : defaultMediaContextDesktop;
    }
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    return resolveMediaContext(width, height);
  }, [isMobileDevice]);

  const updateContextValue = useCallback(() => {
    if (isClient) {
      setContextValue(resolveContextValue());
    }
  }, [isClient, resolveContextValue]);

  // Only run effects on the client side
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isClient) {
      // Set initial context value
      updateContextValue();

      // Add resize listener
      const handleResize = debounce(updateContextValue, 150);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isClient, updateContextValue]);

  return <MediaContext.Provider value={contextValue}>{children}</MediaContext.Provider>;
};

// Create a client-side only version of MediaContextProvider
const MediaContextProvider = dynamic(
  () =>
    Promise.resolve(({ children, isMobileDevice }: { children: React.ReactNode; isMobileDevice?: boolean }) => (
      <MediaContextProviderCL isMobileDevice={isMobileDevice}>{children}</MediaContextProviderCL>
    )),
  {
    ssr: false,
  },
);

export { MediaContextProvider };
