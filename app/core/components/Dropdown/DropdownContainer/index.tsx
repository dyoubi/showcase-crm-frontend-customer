import { FC } from 'react';

import { IconChevronDown } from '@/core/shared/Icons';

import * as S from './DropdownContainer.styles';
import { DropdownContainerProps } from './DropdownContainer.types';
import { CLASSNAMES } from '../constants';

export const DropdownContainer: FC<DropdownContainerProps> = ({
  iconLeft,
  children,
  displayArrow = false,
  ...props
}) => {
  return (
    <S.DropdownContainer {...props}>
      <S.IconAndContentWrapper>
        {iconLeft && <S.IconWrapper>{iconLeft}</S.IconWrapper>}
        <S.ItemContent>{children}</S.ItemContent>
      </S.IconAndContentWrapper>
      {displayArrow && (
        <S.ArrowsContainer>
          <IconChevronDown className={CLASSNAMES.ARROW_UP} />
        </S.ArrowsContainer>
      )}
    </S.DropdownContainer>
  );
};
