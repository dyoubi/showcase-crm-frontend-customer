import { ReactNode } from 'react';

import { Container } from './VipButtonContainer.styles';

interface VipButtonContainerProps {
  children: ReactNode;
  activeColor: string;
}

export const VipButtonContainer = ({ children, activeColor }: VipButtonContainerProps) => (
  <Container justifyContent="flex-start" activeColor={activeColor}>
    {children}
  </Container>
);
