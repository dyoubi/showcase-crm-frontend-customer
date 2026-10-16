import { FC } from 'react';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';
import { genID } from '@/utils/idgen';

import { CheckboxContainer, CheckboxWrapper, HiddenInput, StyledLabel } from './Checkbox.styles';
import { FeedbackMessage, FieldVariant } from '../FeedbackMessage';
import { CheckboxProps } from './Checkbox.types';
import { Flex } from '../Flex';

const CheckboxWrapped: FC<CheckboxProps> = ({
  children,
  disabled,
  forwardedRef,
  error,
  isOutlined = false,
  ...props
}) => {
  const id = genID(props.id);

  return (
    <CheckboxWrapper data-testid="checkbox">
      <Flex flexDirection="row" alignItems="center" {...props}>
        <CheckboxContainer {...props} error={!!error}>
          <HiddenInput
            id={id}
            disabled={disabled}
            ref={forwardedRef}
            type="checkbox"
            data-testid={props.name}
            isOutlined={isOutlined}
            {...props}
          />
        </CheckboxContainer>
        <StyledLabel htmlFor={id} disabled={disabled} error={!!error}>
          {children}
        </StyledLabel>
      </Flex>
      {error && <FeedbackMessage variant={FieldVariant.Error}>{error}</FeedbackMessage>}
    </CheckboxWrapper>
  );
};

export const Checkbox = forwardRefWrapper<CheckboxProps>(CheckboxWrapped);
