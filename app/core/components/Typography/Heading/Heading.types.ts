import { ElementType, ReactNode } from 'react';
import { HeadingSize, TextAlign } from 'styled-components';

export type HeadingProps = {
  color?: string;
  align?: TextAlign;
  element?: HeadingSize | ElementType;
  size: HeadingSize;
  whiteSpace?: 'normal' | 'pre-line' | 'nowrap';
  children?: ReactNode;
};
