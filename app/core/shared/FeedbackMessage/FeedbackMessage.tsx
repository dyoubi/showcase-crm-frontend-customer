import { FC, useCallback } from 'react';

import { IconDanger, IconInfoCircle, IconTickCircle } from '@/core/shared/Icons';

import { FeedbackMessageTextWrapper, StyledFeedbackMessage } from './FeedbackMessage.styles';
import { FeedbackMessageProps, FieldVariant } from './FeedbackMessage.types';

export const FeedbackMessage: FC<FeedbackMessageProps> = ({
  children,
  withInput = false,
  variant = FieldVariant.Default,
  noIcon = false,
}) => {
  const renderIcon = useCallback(() => {
    switch (variant) {
      case FieldVariant.Valid:
        return <IconTickCircle data-testid="icon-tick-circle" />;
      case FieldVariant.Error:
        return <IconInfoCircle data-testid="icon-info-circle" />;
      case FieldVariant.Disabled:
        return <IconInfoCircle data-testid="icon-info-circle" />;
      default:
        return <IconInfoCircle data-testid="icon-info-circle" />;
    }
  }, [variant]);

  return (
    <StyledFeedbackMessage withInput={withInput} variant={variant}>
      {!noIcon && renderIcon()}
      <FeedbackMessageTextWrapper>{children}</FeedbackMessageTextWrapper>
    </StyledFeedbackMessage>
  );
};
