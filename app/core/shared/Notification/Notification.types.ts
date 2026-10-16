import { ReactNode } from 'react';

export type NotificationType = 'info' | 'error' | 'success' | 'warning';

export type NotificationProps = {
  autoRemove?: boolean;
  autoRemoveDelay?: number;
  title: string | ReactNode;
  text: string | ReactNode;
  id?: string;
  onClick?: () => void;
  type: NotificationType;
  showCloseButton?: boolean;
};

export type NotificationBoxProps = {
  variant: NotificationType;
};
