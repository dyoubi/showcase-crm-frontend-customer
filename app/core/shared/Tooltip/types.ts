import { ReactElement } from 'react';

export type TooltipPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

export interface TooltipProps {
  displayOn?: 'mouseenter' | 'mouseenter focus' | 'click' | 'focusin' | 'manual';
  message?: ReactElement | string | number;
  children?: ReactElement | string;
  position?: TooltipPosition;
  hideOnClick?: boolean;
  visible?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  zIndex?: number;
  className?: string;
}

export type TooltipRef = {
  show: () => void;
  hide: () => void;
} | null;
