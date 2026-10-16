import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconArrowUp = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      data-testid="icon-arrow-up"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M28.0765 13.3139L16.0326 1.26996C15.291 0.52834 14.1044 0.52834 13.3628 1.26996L1.31891 13.3139C0.57729 14.0555 0.57729 15.2421 1.31891 15.9837C2.06053 16.7253 3.24712 16.7253 3.98874 15.9837L12.7992 7.17325V23.8152C12.7992 24.8535 13.6595 25.7137 14.6977 25.7137C15.736 25.7137 16.5963 24.8535 16.5963 23.8152V7.17325L25.4067 15.9837C26.1483 16.7253 27.3349 16.7253 28.0765 15.9837C28.8182 15.2421 28.8182 14.0555 28.0765 13.3139Z"
        fill={iconColor}
      />
    </svg>
  );
});
