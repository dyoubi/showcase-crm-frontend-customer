import { FC } from 'react';

import { StyledText } from './Text.styles';
import { TextColors, TextProps } from './Text.types';

export const Text: FC<TextProps> = ({ children, type = 'default', level = 'medium', ...props }) => {
  return (
    <StyledText level={level} type={type} {...props}>
      {children}
    </StyledText>
  );
};
