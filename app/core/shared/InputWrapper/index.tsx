import { forwardRef, memo } from 'react';

import { FeedbackMessage, FieldVariant } from '../FeedbackMessage';
import * as S from './styles';
import * as c from './constants';
import * as t from './types';
import { Flex } from '../Flex';
import { Spacer } from '../Spacer';

export const InputWrapper = memo(
  forwardRef<HTMLDivElement, t.InputWrapperProps>(
    (
      {
        variant = FieldVariant.Default,
        colorVariant = 'default',
        buttonProps,
        buttonContent,
        iconLeft,
        iconRight,
        className,
        caption,
        label,
        children,
        ...restProps
      },
      ref,
    ) => {
      return (
        <S.Root ref={ref} className={className} {...restProps}>
          {label && <S.StyledLabel variant={variant}>{label}</S.StyledLabel>}
          <S.Container color={colorVariant}>
            <S.InputContainer
              className={c.CLASSNAMES.INPUT_CONTAINER}
              colorVariant={colorVariant}
              withButton={!!buttonContent}
            >
              {iconLeft && (
                <>
                  <Spacer size="xs" />
                  {iconLeft}
                  <Spacer size="xs" />
                </>
              )}
              <Flex flex={1}>{children}</Flex>
              {iconRight}
            </S.InputContainer>
            {buttonContent && (
              <S.Button type="button" color="primary" {...buttonProps} ref={undefined}>
                {buttonContent}
              </S.Button>
            )}
          </S.Container>
          {caption && (
            <FeedbackMessage variant={colorVariant === 'error' ? FieldVariant.Error : FieldVariant.Default}>
              {caption}
            </FeedbackMessage>
          )}
        </S.Root>
      );
    },
  ),
);

export const { CLASSNAMES } = c;

InputWrapper.displayName = 'InputWrapper';

export * from './types';
