import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

import { InputWrapperProps } from '../InputWrapper';
import * as S from './styles';
import * as c from './constants';

export interface InputMaskProps extends InputWrapperProps {
  mask: string | RegExp | DateConstructor;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  pattern?: string;
  placeholder?: string;
  onAccept?: (value: string) => void;
  onComplete?: (value: string) => void;
  parse?: (str: string) => Date;
  format?: (str: Date) => string;
  'data-testid'?: string;
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  (
    {
      mask,
      value,
      pattern,
      disabled,
      readOnly,
      onAccept,
      onComplete,
      placeholder,
      parse,
      format,
      'data-testid': dataTestId,
      ...restProps
    },
    ref,
  ) => {
    const commonProps = {
      inputRef: ref,
      value,
      onAccept,
      onComplete,
      placeholder,
      className: c.MaskInputClassName,
      'data-testid': dataTestId,
    } as const;

    return (
      <S.Container {...restProps} disabled={disabled}>
        {typeof mask === 'string' && <IMaskInput mask={mask} {...commonProps} />}
        {mask instanceof RegExp && <IMaskInput mask={mask} {...commonProps} />}
        {mask === Date && (
          <IMaskInput
            mask={mask as any}
            pattern={pattern}
            disabled={disabled}
            readOnly={readOnly}
            {...commonProps}
            parse={parse}
            format={format}
            blocks={c.DateBlocks}
          />
        )}
      </S.Container>
    );
  },
);

InputMask.displayName = 'InputMask';
