import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconClose = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M29.3887 9.68481L10.2968 28.7767" stroke={iconColor} strokeWidth="5.0625" strokeLinecap="round" />
      <path d="M29.3887 28.7761L10.2968 9.68424" stroke={iconColor} strokeWidth="5.0625" strokeLinecap="round" />
    </svg>
  );
});
