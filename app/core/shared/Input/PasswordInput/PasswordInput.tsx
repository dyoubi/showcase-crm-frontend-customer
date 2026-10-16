import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { IconEye, IconEyeSlash, IconLock } from '@/core/shared/Icons';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { Input } from '../Input';
import { StyledEyeButton } from './PasswordInput.styles';
import { InputProps } from '../Input.types';
import { VisuallyHidden } from '../Input.styles';

const PasswordInputWrapped: FC<InputProps> = ({ error, forwardedRef, caption, progress, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { isPhone } = useBreakpoints();

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      caption={caption}
      progress={progress}
      iconLeft={!isPhone && <IconLock />}
      ref={forwardedRef}
      error={error}
      iconRight={
        <StyledEyeButton type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <IconEye /> : <IconEyeSlash />}
          <VisuallyHidden>
            <FormattedMessage id="showPasswordButton" defaultMessage="Show password" />
          </VisuallyHidden>
        </StyledEyeButton>
      }
      {...props}
    />
  );
};

export const PasswordInput = forwardRefWrapper<InputProps>(PasswordInputWrapped);
