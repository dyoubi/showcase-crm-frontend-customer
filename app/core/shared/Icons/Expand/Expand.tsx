import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconExpand = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.75 2H2M2 2V8.75M2 2L10.4375 10.4375M22.25 2H29M29 2V8.75M29 2L20.5625 10.4375M8.75 29H2M2 29V22.25M2 29L10.4375 20.5625M22.25 29H29M29 29V22.25M29 29L20.5625 20.5625"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
