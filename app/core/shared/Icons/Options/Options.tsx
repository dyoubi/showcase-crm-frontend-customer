import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconOptions = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 36 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <circle cx="4" cy="4" r="4" fill={iconColor} />
      <circle cx="18" cy="4" r="4" fill={iconColor} />
      <circle cx="32" cy="4" r="4" fill={iconColor} />
    </svg>
  );
});
