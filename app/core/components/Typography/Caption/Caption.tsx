import { FC } from 'react';

import { StyledCaption } from './Caption.styles';
import { CaptionProps } from './Caption.types';

export const Caption: FC<CaptionProps> = ({ children, ...rest }) => <StyledCaption {...rest}>{children}</StyledCaption>;
