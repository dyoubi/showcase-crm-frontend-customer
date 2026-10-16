import { ReactNode } from 'react';

export type WidgetProps = {
  header?: string;
  children: ReactNode;
  backgroundColor?: string;
  hasMoreButton?: boolean;
  moreButtonOnClick?: () => void;
};
