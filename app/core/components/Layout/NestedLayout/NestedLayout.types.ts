import { ReactNode } from 'react';

import { MenuItemProps } from '../../PageMenu/PageMenu.types';

export interface NestedLayoutProps {
  children: ReactNode;
  title: ReactNode;
  menuItems: Array<MenuItemProps>;
  bannerURL?: string;
  hasDropdownMenu?: boolean;
}
