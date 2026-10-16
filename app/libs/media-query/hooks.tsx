import { useContext, useEffect, useState } from 'react';

import { CheckUAForMobile } from '@/utils/mobile';

import { MediaContext } from './context';
import { MediaContextTypes } from './types';

/**
 * Custom hook to access the media context
 */
export const useMedia = (): MediaContextTypes => {
  return useContext(MediaContext);
};

/**
 * Custom hook to detect if the current device is mobile based on user agent
 * This is used for client-side detection only
 */
export const useIsMobileDevice = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      const { userAgent } = navigator;

      const isMobileDevice = CheckUAForMobile(userAgent);

      setIsMobile(isMobileDevice);
    }
  }, []);

  return isMobile;
};
