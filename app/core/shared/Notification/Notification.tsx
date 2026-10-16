import { FC, useCallback, useEffect } from 'react';

import {
  ChildrenWrapper,
  CloseButton,
  Content,
  ContentWrapper,
  IconBox,
  NotificationBox,
  NotificationContainer,
  ProgressBar,
  ProgressBarWrapper,
  Title,
} from './Notification.styles';
import { NotificationProps } from './Notification.types';
import {
  IconCross,
  IconNotificationError,
  IconNotificationInfo,
  IconNotificationSuccess,
  IconNotificationWarning,
} from '../Icons';

export const Notification: FC<NotificationProps> = ({
  showCloseButton = true,
  autoRemove = true,
  autoRemoveDelay = 5000,
  onClick,
  text,
  type,
  title,
}) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (autoRemove && onClick) {
      const timeout = setTimeout(() => {
        onClick();
      }, autoRemoveDelay);

      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRemove, autoRemoveDelay]);

  const renderIcon = useCallback(() => {
    switch (type) {
      case 'error':
        return <IconNotificationError />;
      case 'success':
        return <IconNotificationSuccess />;
      case 'warning':
        return <IconNotificationWarning />;
      default:
        return <IconNotificationInfo />;
    }
  }, [type]);

  return (
    <NotificationContainer mb="m">
      <NotificationBox role="status" variant={type}>
        <div className="bg-layer" />
        <ContentWrapper>
          <IconBox mr="xs" variant={type}>
            {renderIcon()}
          </IconBox>
          <ChildrenWrapper>
            <Title>{title}</Title>
            <Content>{text}</Content>
          </ChildrenWrapper>
          {showCloseButton && (
            <CloseButton type="button" onClick={onClick}>
              <IconCross color="notification" size={24} />
            </CloseButton>
          )}
        </ContentWrapper>

        {autoRemoveDelay > 0 && (
          <ProgressBarWrapper data-testid="notification-progress-bar-wrapper">
            <ProgressBar duration={autoRemoveDelay} variant={type} data-testid="notification-progress-bar" />
          </ProgressBarWrapper>
        )}
      </NotificationBox>
    </NotificationContainer>
  );
};
