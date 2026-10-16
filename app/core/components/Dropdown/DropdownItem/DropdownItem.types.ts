import { ReactNode } from 'react';

import { NativeDivProps } from '@/utils/typescript';

export interface DropdownItemProps extends Omit<NativeDivProps, 'ref'> {
  children?: ReactNode;
  iconLeft?: ReactNode;
  href?: string;
  className?: string;
}
