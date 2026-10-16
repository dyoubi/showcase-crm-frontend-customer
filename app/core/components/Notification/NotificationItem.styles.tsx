import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { Box } from '../../shared/Box';
import { NotificationItemVariant } from './NotificationItem.types';

export const StyledNotificationItem = styled.div<{ variant: NotificationItemVariant }>(({ theme, variant }) => ({
  display: 'flex',
  flexDirection: 'column',

  padding: theme.padding.m,

  border: `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.dark[20]}`,
  background: theme.rebrandingColors.colorsToBeDeprecated.dark[100],

  ...(variant === NotificationItemVariant.Default
    ? {
        ...getTypography(theme.typography.body.small),
        fontWeight: 300,
      }
    : {}),

  a: {
    color: theme.rebrandingColors.palette.light[20],

    '&:hover': {
      color: theme.rebrandingColors.colorsToBeDeprecated.gray[20],
    },
  },
}));

export const NotificationItemHeader = styled.p<{ variant: NotificationItemVariant }>(({ theme, variant }) => ({
  margin: 0,
  fontWeight: 700,

  ...(variant === NotificationItemVariant.Default
    ? {
        fontSize: 18,
        fontWeight: 600,
      }
    : {}),

  ...(variant === NotificationItemVariant.Info
    ? {
        color: theme.rebrandingColors.colorsToBeDeprecated.link,
      }
    : {}),

  ...(variant === NotificationItemVariant.Error
    ? {
        color: theme.theme.rebrandingColors.colorsToBeDeprecated.red[40],
      }
    : {}),

  ...(variant === NotificationItemVariant.Success
    ? {
        color: theme.rebrandingColors.palette.green[20],
      }
    : {}),

  ...(variant === NotificationItemVariant.Warning
    ? {
        color: theme.rebrandingColors.colorsToBeDeprecated.orangeWarning,
      }
    : {}),
}));

export const ChildrenWrapper = styled.div({
  display: 'block',
  flexGrow: 1,
  whiteSpace: 'pre-line',
});

export const StyledIconBox = styled(Box)<{ variant: NotificationItemVariant }>(({ theme, variant }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginRight: theme.padding.m,

  minWidth: 40,
  height: 40,

  borderRadius: '100%',

  ...(variant === NotificationItemVariant.Info
    ? {
        background: theme.rebrandingColors.colorsToBeDeprecated.link,
      }
    : {}),

  ...(variant === NotificationItemVariant.Error
    ? {
        background: theme.rebrandingColors.colorsToBeDeprecated.red[40],
      }
    : {}),

  ...(variant === NotificationItemVariant.Success
    ? {
        background: theme.rebrandingColors.palette.green[20],
      }
    : {}),

  ...(variant === NotificationItemVariant.Warning
    ? {
        background: theme.rebrandingColors.colorsToBeDeprecated.orangeWarning,
      }
    : {}),
}));

export const TopSection = styled.div({
  display: 'flex',
  flexRirection: 'row',
  lineHeight: '24px',
});
