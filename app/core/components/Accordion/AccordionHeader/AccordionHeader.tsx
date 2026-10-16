import { FC } from 'react';

import { IconChevronDown, IconChevronUp } from '@/core/shared/Icons';

import { StyledHeader, StyledHeaderLabel } from './AccordionHeader.styles';
import { AccordionHeaderProps } from '../Accordion.types';

export const AccordionHeader: FC<AccordionHeaderProps> = ({
  iconLeft,
  isActive,
  onClick,
  title,
  variant,
  ...props
}) => (
  <StyledHeader isActive={isActive} onClick={onClick} variant={variant} {...props}>
    <StyledHeaderLabel>
      {iconLeft && iconLeft}
      {title}
    </StyledHeaderLabel>
    {isActive ? <IconChevronUp /> : <IconChevronDown />}
  </StyledHeader>
);
