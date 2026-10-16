import { ReactElement } from 'react';

export interface MenuItemProps {
  id: string;
  title: string | ReactElement;
  path: string;
}

export type PageMenuProps = {
  menuItems: Array<MenuItemProps>;
  isDropdown?: boolean;
};
