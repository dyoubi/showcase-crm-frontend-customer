import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconSearch = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14.8125" cy="14.8125" r="11.8125" stroke={iconColor} strokeWidth="4.21875" />
      <path d="M23.25 23.25L31.6875 31.6875" stroke={iconColor} strokeWidth="4.21875" strokeLinecap="round" />
    </svg>
  );
});
