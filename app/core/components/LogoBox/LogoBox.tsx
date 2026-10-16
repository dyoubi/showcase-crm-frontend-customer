import { FC, ReactNode } from 'react';

import { LogoBoxContainer, LogoBoxWrapper } from './LogoBox.styles';

export const LogoBox: FC<{ children: ReactNode }> = ({ children }) => (
  <LogoBoxWrapper>
    <LogoBoxContainer>{children}</LogoBoxContainer>
  </LogoBoxWrapper>
);
