import { Children, cloneElement, createElement, FC, Fragment, isValidElement, ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { StyledMenu, StyledMenuItem } from './Menu.styles';
import { MenuItemProps, MenuProps } from './Menu.types';

export const Menu: FC<MenuProps> = ({ children, variant, ...props }) => {
  const childrenWithProps: any = (items: ReactNode) =>
    Children.map(items, (child) => {
      if (isValidElement(child)) {
        if (child?.type === Fragment) {
          return childrenWithProps((child as ReactElement).props.children);
        }

        return cloneElement<any>(child, { variant });
      }

      return child;
    });

  return <StyledMenu {...props}>{childrenWithProps(children)}</StyledMenu>;
};

const MenuItemWrapper: FC<{ children: any }> = ({ children }) => {
  const element = Array.isArray(children) ? children[0] : children;

  return element.type !== Link && (typeof element !== 'object' || element.type !== 'a') ? (
    <div>{children}</div>
  ) : (
    children
  );
};

export const MenuItem: FC<MenuItemProps> = ({ children, ...props }) => {
  const childrenWithProps: any = (items: ReactNode) =>
    Children.map(items, (child) => {
      if (isValidElement(child) && child?.type === Link) {
        return cloneElement<any>(child, { children: childrenWithProps((child as ReactElement).props.children)[0] });
      }

      if (isValidElement(child) && child?.type === 'a') {
        return cloneElement<any>(child, { children: childrenWithProps((child as ReactElement).props.children) });
      }

      if (typeof child === 'string' || (isValidElement(child) && child?.type === FormattedMessage)) {
        return createElement('span', null, child);
      }

      return child;
    });

  return (
    <StyledMenuItem {...props}>
      <MenuItemWrapper>{childrenWithProps(children)}</MenuItemWrapper>
    </StyledMenuItem>
  );
};
