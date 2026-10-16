import React from 'react';
import { Sizing } from 'styled-components';

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'bottomMenu' | 'notification';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * TODO When refactoring theme remove all these values &
   * use primary, secondary & tertiary from theme export
   * */
  color?: string | ColorVariant;
  size?: Sizing | number | undefined;
}
