import { ReactNode } from 'react';

import { Flex } from '@/core/shared/Flex';

import * as t from '../types';

interface AlignProps {
  align?: t.Align;
  children: ReactNode;
}

export const Align = ({ align, children }: AlignProps) => {
  return <Flex justifyContent={(align !== 'justify' && align) || undefined}>{children}</Flex>;
};
