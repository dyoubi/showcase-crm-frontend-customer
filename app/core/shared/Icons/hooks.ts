import { useTheme } from 'styled-components';

import * as t from './types';

export const useIconSize = (size: t.IconProps['size']) => {
  const {
    sizes: { icons },
  } = useTheme();

  if (!size) {
    return icons.l;
  }

  if (typeof size === 'number' || !icons?.[size]) {
    return size;
  }

  return icons?.[size];
};

export const useIconColor = (color: t.IconProps['color'] = 'white'): string => {
  const theme = useTheme();
  const iconColor = color as t.ColorVariant;

  const colorsVariant = {
    primary: theme.rebrandingColors.colorsToBeDeprecated.blue[60],
    secondary: theme.rebrandingColors.colorsToBeDeprecated.dark[100],
    success: theme.rebrandingColors.palette.light[20],
    warning: theme.rebrandingColors.colorsToBeDeprecated.gray[60],
    danger: theme.rebrandingColors.palette.green[20],
    bottomMenu: theme.rebrandingColors.palette.light[60],
    notification: theme.rebrandingColors.palette.light[60],
  } as const;

  if (!colorsVariant?.[iconColor]) {
    return iconColor;
  }

  return colorsVariant?.[iconColor];
};
