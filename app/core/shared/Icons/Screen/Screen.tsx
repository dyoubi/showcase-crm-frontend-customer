import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconScreen = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M16.9286 14.5H0.5V0.5H16.9286V14.5ZM2.55357 11.6831H14.875V3.3169H2.55357V11.6831Z" fill={iconColor} />
    </svg>
  );
});
