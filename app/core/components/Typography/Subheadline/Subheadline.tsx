import { FC, ReactNode } from 'react';

import { StyledSubheadline } from './Subheadline.styles';

export const Subheadline: FC<{ children: ReactNode }> = ({ children, ...props }) => (
  <StyledSubheadline {...props}>{children}</StyledSubheadline>
);
