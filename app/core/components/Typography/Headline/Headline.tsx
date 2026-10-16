import { FC, ReactNode } from 'react';

import { StyledHeadline } from './Headline.styles';

export const Headline: FC<{ children?: ReactNode }> = ({ children, ...props }) => (
  <StyledHeadline {...props}>{children}</StyledHeadline>
);
