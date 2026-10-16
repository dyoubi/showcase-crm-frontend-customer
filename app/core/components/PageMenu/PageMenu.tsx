import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { StyledDropdownContainer } from './PageMenu.styles';
import { PageMenuProps } from './PageMenu.types';
import { Dropdown, DropdownItem, DropdownMenu } from '../Dropdown';
import { MenuButtonGroup } from '../MenuButtonGroup/MenuButtonGroup';

export const PageMenu = ({ menuItems, isDropdown = false }: PageMenuProps) => {
  const { asPath } = useRouter();
  const activePolicy = useMemo(() => {
    return menuItems.find((menuItem) => menuItem.path === asPath);
  }, [asPath]);

  const [menuClosed, setMenuClosed] = useState(false);

  if (isDropdown) {
    return (
      <Dropdown
        isClosed={menuClosed}
        contentPosition="left"
        content={
          <DropdownMenu width="100%">
            {menuItems?.map((menuItem) => (
              <Link href={menuItem.path} key={menuItem.id} onClick={() => setMenuClosed(!menuClosed)}>
                <DropdownItem key={menuItem.id} data-testid="menu-item">
                  {menuItem.title}
                </DropdownItem>
              </Link>
            ))}
          </DropdownMenu>
        }
      >
        <StyledDropdownContainer displayArrow data-testid="dropdown-container">
          {activePolicy?.title}
        </StyledDropdownContainer>
      </Dropdown>
    );
  }

  return <MenuButtonGroup menuList={menuItems} currentPath={asPath} />;
};
