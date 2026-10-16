import styled from 'styled-components';

import { theme } from '@/themes/main';

import { VIPBadgeLevel, VIPBadgeSize } from './VIPBadge.types';

const baseHeight = 158;
const baseWidth = 316;

const getBadgeSizeScale = (size: VIPBadgeSize) => {
  if (size === VIPBadgeSize.Small) {
    return 0.691;
  }

  if (size === VIPBadgeSize.Medium) {
    return 0.76;
  }

  return 0.94;
};
const badgeFontSize = {
  [VIPBadgeSize.Small]: theme.typography.subheadline.fontSize,
  [VIPBadgeSize.Medium]: theme.typography.subheadline.fontSize,
  [VIPBadgeSize.Large]: theme.typography.headline.fontSize,
};
const getBadgeStyles = (level: VIPBadgeLevel) =>
  ({
    [VIPBadgeLevel.Default]: {
      backgroundPosition: 'bottom 22px center',
      color: theme.rebrandingColors.colorsToBeDeprecated.dark[20],
    },
    [VIPBadgeLevel.Bronze]: {
      backgroundPosition: 'bottom 15px center',
      color: theme.rebrandingColors.colorsToBeDeprecated.orange[20],
    },
    [VIPBadgeLevel.Silver]: {
      backgroundPosition: 'bottom center',
      color: theme.rebrandingColors.colorsToBeDeprecated.blue[20],
    },
    [VIPBadgeLevel.Gold]: {
      backgroundPosition: 'bottom 5px center',
      color: theme.rebrandingColors.colorsToBeDeprecated.yellow[20],
    },
    [VIPBadgeLevel.Platinum1]: {
      backgroundPosition: 'bottom -13px center',
      color: theme.rebrandingColors.palette.light[20],
    },
    [VIPBadgeLevel.Platinum2]: {
      backgroundPosition: 'bottom -6px center',
      color: theme.rebrandingColors.palette.light[20],
    },
    [VIPBadgeLevel.Platinum3]: {
      backgroundPosition: 'bottom -4px center',
      color: theme.rebrandingColors.palette.light[20],
    },
    [VIPBadgeLevel.Platinum4]: {
      backgroundPosition: 'bottom center',
      color: theme.rebrandingColors.palette.light[20],
    },
  }[level]);

export const VIPBadgeContainer = styled.div<{ level: VIPBadgeLevel; size: VIPBadgeSize }>(({ size }) => ({
  position: 'relative',
  height: `${getBadgeSizeScale(size) * baseHeight}px`,
  width: `${getBadgeSizeScale(size) * baseWidth}px`,
}));

export const VIPBadgeBackground = styled.div<{ level: VIPBadgeLevel; size: VIPBadgeSize }>(({ level, size }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  height: `${baseHeight}px`,
  width: `${baseWidth}px`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('/images/badges/${level || 'default'}.svg')`,
  transform: `scale(${getBadgeSizeScale(size)})`,
  transformOrigin: '0 0',
  ...getBadgeStyles(level),
}));

export const Username = styled.p<{ size: VIPBadgeSize }>(({ size }) => ({
  zIndex: 1,
  height: '56px',
  margin: '0 0 35px',
  lineHeight: '56px',
  fontSize: badgeFontSize[size],
}));
