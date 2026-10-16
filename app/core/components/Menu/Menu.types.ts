import { MouseEventHandler, ReactNode } from 'react';

export enum MenuVariant {
  Lateral = 'lateral',
  Tooltip = 'tooltip',
}

export type MenuProps = {
  variant?: MenuVariant;
  children?: ReactNode;
};

export type MenuItemProps = {
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
  isActive?: boolean;
  variant?: MenuVariant;
  children?: ReactNode;
};
