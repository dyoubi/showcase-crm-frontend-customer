import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconMenu = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 33 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13L30 13" stroke={iconColor} strokeWidth="5" strokeLinecap="round" />
      <path d="M3 23L30 23" stroke={iconColor} strokeWidth="5" strokeLinecap="round" />
      <path d="M3 3L30 3" stroke={iconColor} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
});
