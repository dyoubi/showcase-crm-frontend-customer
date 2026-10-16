import { FC } from 'react';

import { StyledHeading } from './Heading.styles';
import { HeadingProps } from './Heading.types';

export const Heading: FC<HeadingProps> = ({ align, children, color, element, size, whiteSpace, ...rest }) => (
  <StyledHeading align={align} as={element || size} color={color} size={size} whiteSpace={whiteSpace} {...rest}>
    {children}
  </StyledHeading>
);
