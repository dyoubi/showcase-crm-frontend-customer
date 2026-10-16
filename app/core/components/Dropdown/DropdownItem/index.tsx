import { FC } from 'react';
import Link from 'next/link';

import * as S from './DropdownItem.styles';
import { DropdownItemProps } from './DropdownItem.types';

export const DropdownItem: FC<DropdownItemProps> = ({ iconLeft, href, children, ...rest }) => {
  const content = (
    <S.DropdownMenuItem {...rest}>
      {iconLeft && <S.IconWrapper>{iconLeft}</S.IconWrapper>}
      <S.ItemContent>{children}</S.ItemContent>
    </S.DropdownMenuItem>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
