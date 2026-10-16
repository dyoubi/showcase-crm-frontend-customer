import { Children, cloneElement, FC, isValidElement } from 'react';

import { ButtonGroupProps } from './ButtonGroup.types';
import { StyledButtonGroup } from './ButtonGroup.styles';

export const ButtonGroup: FC<ButtonGroupProps> = ({ ...rest }) => {
  const children = Children.map(rest.children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (isValidElement(child)) {
      return cloneElement<any>(child);
    }

    return child;
  });

  return <StyledButtonGroup {...rest}>{children}</StyledButtonGroup>;
};
