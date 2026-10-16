import { ReactElement, ReactNode } from 'react';

type RenderHeaderProps = {
  isExpanded: boolean;
  onClick: () => void;
};

export enum AccordionVariant {
  Default = 'default',

  Simple = 'simple',
}

export type AccordionProps = {
  iconLeft?: ReactNode;
  isOpenByDefault?: boolean;
  renderHeader?: (...args: [RenderHeaderProps]) => ReactElement;
  variant?: AccordionVariant;
  children?: ReactNode;
} & Pick<AccordionHeaderProps, 'title'>;

export type AccordionHeaderProps = {
  iconLeft?: ReactNode;
  isActive: boolean;
  onClick: () => void;
  title?: ReactElement | string;
  variant: AccordionVariant;
};
