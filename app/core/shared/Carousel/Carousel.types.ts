import { ReactNode } from 'react';
import { Settings } from 'react-slick';

export type CarouselProps = {
  arrows?: boolean;
  header?: string | ReactNode;
  headerIcon?: ReactNode;
  'data-testid'?: string;
  customLink?: string;
  isTabletOrPhone?: boolean;
  /** If true and device is tablet/phone, use native horizontal scroll with CSS scroll-snap instead of Slick */
  nativeMobileScroll?: boolean;
} & Settings;
