import { FC } from 'react';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { BasicInputProps } from '../Input.types';
import { StyledInput } from './BasicInput.styles';

export const BasicInputWrapped: FC<BasicInputProps> = ({ forwardedRef, selectable, variant, ...props }) => (
  <StyledInput selectable={selectable} variant={variant} ref={forwardedRef} {...props} />
);

export const BasicInput = forwardRefWrapper<BasicInputProps>(BasicInputWrapped);
