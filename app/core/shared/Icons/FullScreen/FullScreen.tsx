import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconFullScreen = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.12486 5.96875H0.0712891V0.5H6.4887V2.25H2.12486V5.96875Z" fill={iconColor} />
      <path d="M16.4999 5.96875H14.4464V2.25H10.0825V0.5H16.4999V5.96875Z" fill={iconColor} />
      <path d="M6.4887 14.5H0.0712891V9.03125H2.12486V12.75H6.4887V14.5Z" fill={iconColor} />
      <path d="M16.4999 14.5H10.0825V12.75H14.4464V9.03125H16.4999V14.5Z" fill={iconColor} />
    </svg>
  );
});
