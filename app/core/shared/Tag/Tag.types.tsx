import { ReactElement, ReactNode } from 'react';

export type TagProps = {
  content: ReactElement | ReactNode | string;
  onTagClick?: () => void;
  color?: string;
};
