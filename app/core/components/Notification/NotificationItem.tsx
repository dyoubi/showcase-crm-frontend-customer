import { FC, useCallback } from 'react';

import { IconDanger, IconInfoCircle, IconInformation, IconTickCircle } from '@/core/shared/Icons';

import {
  ChildrenWrapper,
  NotificationItemHeader,
  StyledIconBox,
  StyledNotificationItem,
  TopSection,
} from './NotificationItem.styles';
import { NotificationItemProps, NotificationItemVariant } from './NotificationItem.types';

export const NotificationItem: FC<NotificationItemProps> = ({
  children,
  header,
  icon,
  variant = NotificationItemVariant.Default,
  ...props
}) => {
  const renderIcon = useCallback(() => {
    switch (variant) {
      case NotificationItemVariant.Error:
        return <IconInfoCircle />;
      case NotificationItemVariant.Success:
        return <IconTickCircle />;
      case NotificationItemVariant.Warning:
        return <IconDanger />;
      default:
        return <IconInformation />;
    }
  }, [variant]);

  return (
    <StyledNotificationItem variant={variant} {...props}>
      <TopSection>
        {icon && variant === NotificationItemVariant.Default ? (
          <StyledIconBox mr="xs" variant={variant}>
            {icon || renderIcon()}
          </StyledIconBox>
        ) : (
          renderIcon()
        )}
        <ChildrenWrapper>
          {!!header && <NotificationItemHeader variant={variant}>{header}</NotificationItemHeader>}
          {children}
        </ChildrenWrapper>
      </TopSection>
    </StyledNotificationItem>
  );
};
