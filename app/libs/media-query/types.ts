/** most common mobile screen size */
export interface Viewport {
  height: number;
  width: number;
}

/**
 *type of device
 * e.g MOBILE, MOBILE_PLUS, TABLET, TABLET_PLUS, TABLET_OR_PHONE, DESKTOP
 */
export type Device = 'MOBILE' | 'MOBILE_PLUS' | 'TABLET' | 'TABLET_PLUS' | 'TABLET_OR_PHONE' | 'DESKTOP';

/**
 * Orientation of the device
 * e.g PORTRAIT | LANDSCAPE
 */
export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export interface MediaContextTypes {
  device: Device;
  isDesktop: boolean;
  isMobile: boolean;
  isMobilePlus: boolean;
  isTablet: boolean;
  isTabletPlus: boolean;
  isTabletOrPhone: boolean;
  isWidescreen: boolean;
  orientation: Orientation;
  viewport: Viewport;
}
