import { ReactNode } from 'react';

import * as S from './styles';

interface DotProps {
  children?: ReactNode;
  isPhone?: boolean;
}

export const DotsContainer = ({ children, isPhone }: DotProps) => (
  <S.Container justifyContent="center">
    <S.Box isPhone={isPhone}>
      <S.Ul>{children}</S.Ul>
    </S.Box>
  </S.Container>
);
