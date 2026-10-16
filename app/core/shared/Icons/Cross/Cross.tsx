import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconCross = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <rect width="22" height="22" rx="6" fill="#150F30" />
      <rect x="7" y="6" width="12.7274" height="1.41416" rx="0.707079" transform="rotate(45 7 6)" fill={iconColor} />
      <rect
        x="16"
        y="7.00098"
        width="12.7274"
        height="1.41416"
        rx="0.707079"
        transform="rotate(135 16 7.00098)"
        fill={iconColor}
      />
    </svg>
  );
});
