import { ReactNode } from 'react';

import { NativeDivProps } from '@/utils/typescript';

export interface DropdownContainerProps extends Omit<NativeDivProps, 'ref'> {
  iconLeft?: ReactNode;
  displayArrow?: boolean;
}
