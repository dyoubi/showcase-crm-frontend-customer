import { ElementType, ReactNode } from 'react';
import { ComponentSize, CSSObject, Sizing } from 'styled-components';

export type TextProps = {
  align?: 'left' | 'center' | 'right';
  as?: ElementType;
  children?: ReactNode; // Add the children property
  color?: string;
  level: Exclude<ComponentSize, 'block'>;
  style?: CSSObject;
  type?: 'default' | 'subtle' | 'link';
  whiteSpace?: 'normal' | 'pre-line' | 'nowrap';
  marginBottom?: Sizing;
};

export type TextColors = {
  White: string;
  Green: string;
  darkGray: string;
};
