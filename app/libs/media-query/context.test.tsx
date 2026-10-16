import { act, renderHook } from '@testing-library/react';
import { ReactNode, useContext } from 'react';

import { MediaContext, MediaContextProvider, resolveMediaContext } from './context';
import { MediaContextTypes } from './types';

describe('resolveMediaContext', () => {
  it('should return correct context for mobile device in portrait mode', () => {
    const width = 375;
    const height = 667;
    const expected: MediaContextTypes = {
      viewport: { width, height },
      isMobile: true,
      isMobilePlus: false,
      isTablet: false,
      isTabletPlus: false,
      isTabletOrPhone: true,
      isDesktop: false,
      isWidescreen: false,
      device: 'MOBILE',
      orientation: 'PORTRAIT',
    };

    expect(resolveMediaContext(width, height)).toEqual(expected);
  });

  it('should return correct context for tablet device in landscape mode', () => {
    const width = 1024;
    const height = 768;
    const expected: MediaContextTypes = {
      viewport: { width, height },
      isMobile: false,
      isMobilePlus: false,
      isTablet: false,
      isTabletPlus: true,
      isTabletOrPhone: false,
      isDesktop: false,
      isWidescreen: false,
      device: 'TABLET_PLUS',
      orientation: 'LANDSCAPE',
    };

    expect(resolveMediaContext(width, height)).toEqual(expected);
  });

  it('should return correct context for desktop device in widescreen mode', () => {
    const width = 2560;
    const height = 1440;
    const expected: MediaContextTypes = {
      viewport: { width, height },
      isMobile: false,
      isMobilePlus: false,
      isTablet: false,
      isTabletPlus: false,
      isTabletOrPhone: false,
      isDesktop: true,
      isWidescreen: true,
      device: 'DESKTOP',
      orientation: 'LANDSCAPE',
    };

    expect(resolveMediaContext(width, height)).toEqual(expected);
  });

  it('should return correct context for mobile plus device in portrait mode', () => {
    const width = 414;
    const height = 896;
    const expected: MediaContextTypes = {
      viewport: { width, height },
      isMobile: false,
      isMobilePlus: true,
      isTablet: false,
      isTabletPlus: false,
      isTabletOrPhone: true,
      isDesktop: false,
      isWidescreen: false,
      device: 'MOBILE_PLUS',
      orientation: 'PORTRAIT',
    };

    expect(resolveMediaContext(width, height)).toEqual(expected);
  });

  it('should return correct context for tablet plus device in landscape mode', () => {
    const width = 1024;
    const height = 768;
    const expected: MediaContextTypes = {
      viewport: { width, height },
      isMobile: false,
      isMobilePlus: false,
      isTablet: false,
      isTabletPlus: true,
      isTabletOrPhone: false,
      isDesktop: false,
      isWidescreen: false,
      device: 'TABLET_PLUS',
      orientation: 'LANDSCAPE',
    };

    expect(resolveMediaContext(width, height)).toEqual(expected);
  });
});
