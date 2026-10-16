import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconPreferences = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 33 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M3 15L30 15" stroke={iconColor} strokeWidth="5" strokeLinecap="round" />
      <path d="M3 25L30 25" stroke={iconColor} strokeWidth="5" strokeLinecap="round" />
      <path d="M3 5L30 5" stroke={iconColor} strokeWidth="5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="5" fill={iconColor} />
      <circle cx="23" cy="15" r="5" fill={iconColor} />
      <circle cx="13" cy="25" r="5" fill={iconColor} />
    </svg>
  );
});
