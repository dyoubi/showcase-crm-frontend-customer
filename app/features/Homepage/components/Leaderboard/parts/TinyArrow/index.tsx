import { IconChevronDown, IconChevronUp } from '@/core/shared/Icons';
import { ButtonColor } from '@/core/shared/Button/Button.types';

import * as S from './styles';

interface TinyArrowProps {
  direction: 'top' | 'bottom';
  onClick: () => void;
  isSelected: boolean;
}

export const TinyArrow = ({ direction, onClick, isSelected }: TinyArrowProps) => (
  <S.Button color={ButtonColor.Tertiary} isSelected={isSelected} isTop={direction === 'top'} onClick={onClick}>
    {direction === 'top' ? (
      <IconChevronUp size="xs" color="currentColor" />
    ) : (
      <IconChevronDown size="xs" color="currentColor" />
    )}
  </S.Button>
);
