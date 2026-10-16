import { FC } from 'react';

import { getVariant } from '@/utils/helpers';
import { forwardRefWrapper } from '@/utils/forwardRefWrapper';
import { genID } from '@/utils/idgen';

import {
  InputWrapper,
  // TODO: to uncomment after add ProgressBar component
  // ProgressBarWrapper,
  StyledLabel,
} from './Input.styles';
import { InputProps, InputSizes } from './Input.types';
import { IconInput } from './IconInput/IconInput';
import { FeedbackMessage, FieldVariant } from '../FeedbackMessage';

// TODO: to uncomment after add ProgressBar component
// import { ProgressBar } from '../ProgressBar';

const InputWrapped: FC<InputProps> = ({
  button,
  caption,
  disabled = false,
  error,
  forwardedRef,
  isValid = false,
  label,
  onChange,
  onKeyDown,
  placeholder,
  progress,
  selectable = true,
  noErrorIcon = false,
  'data-testid': dataTestId,
  ...props
}) => {
  const id = genID(props.id);
  const variant = getVariant<FieldVariant>({
    [FieldVariant.Disabled]: disabled,
    [FieldVariant.Error]: !!error,
    [FieldVariant.Valid]: isValid,
    [FieldVariant.Default]: true,
  });

  return (
    <InputWrapper {...props}>
      {label && (
        <StyledLabel htmlFor={id} variant={variant}>
          {label}
        </StyledLabel>
      )}
      <IconInput
        aria-invalid={!!error || undefined}
        button={button}
        disabled={disabled}
        id={id}
        data-testid={dataTestId || props.name || id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        selectable={selectable}
        placeholder={placeholder}
        ref={forwardedRef}
        variant={variant}
        {...props}
      />
      {(caption || error) && (
        <>
          {/* TODO: to uncomment after add ProgressBar component
          {!!progress && (
            <ProgressBarWrapper>
              <ProgressBar progress={progress} />
            </ProgressBarWrapper>
          )} */}
          <FeedbackMessage withInput variant={variant} noIcon={noErrorIcon}>
            {error || caption}
          </FeedbackMessage>
        </>
      )}
    </InputWrapper>
  );
};

export const Input = forwardRefWrapper<InputProps>(InputWrapped);
