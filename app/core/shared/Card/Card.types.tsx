import { DetailedHTMLProps, ReactNode } from 'react';
import { Sizing } from 'styled-components';

type NativeElementProps = DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export type CardProps = NativeElementProps & {
  children: ReactNode;
  backgroundColor?: string;
  minHeight?: string | number;
  padding?: Sizing;
};
