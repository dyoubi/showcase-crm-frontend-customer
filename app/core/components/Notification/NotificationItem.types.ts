import { ReactNode } from 'react';

export enum NotificationItemVariant {
  Default = 'default',
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export type NotificationItemProps = {
  header?: string;
  icon?: ReactNode;
  variant: NotificationItemVariant;
  children?: ReactNode;
};

export type NotificationItemType = {
  onClick?: () => void;
  text: string | ReactNode;
  variant: NotificationItemVariant;
};
