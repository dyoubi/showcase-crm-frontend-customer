import { FC } from 'react';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { IconInputProps } from '../Input.types';
import { IconInputWrapper, IconLeftWrapper, IconRightWrapper, StyledIconInput } from './IconInput.styles';

const IconInputWrapped: FC<IconInputProps> = ({ button, forwardedRef, iconLeft, iconRight, variant, ...props }) => (
  <IconInputWrapper hasButton={!!button} variant={variant}>
    {iconLeft && <IconLeftWrapper>{iconLeft}</IconLeftWrapper>}
    <StyledIconInput
      hasButton={!!button}
      iconLeft={!!iconLeft}
      iconRight={!button && !!iconRight}
      variant={variant}
      ref={forwardedRef}
      {...props}
    />
    {!button && iconRight && <IconRightWrapper>{iconRight}</IconRightWrapper>}
    {button && button}
  </IconInputWrapper>
);

export const IconInput = forwardRefWrapper<IconInputProps>(IconInputWrapped);
