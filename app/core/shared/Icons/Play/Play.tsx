import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconPlay = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 25 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M23.0836 11.5097C25.1706 12.7146 25.1706 15.7268 23.0836 16.9317L5.47495 27.0981C3.38799 28.303 0.779296 26.7969 0.779296 24.3871L0.779297 4.05431C0.779297 1.6445 3.38799 0.138377 5.47495 1.34328L23.0836 11.5097Z"
        fill={iconColor}
      />
    </svg>
  );
});
