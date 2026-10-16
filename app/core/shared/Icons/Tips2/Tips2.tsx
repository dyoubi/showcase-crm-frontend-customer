import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconTips2 = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M8 6H2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18H2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H2" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22 12.5C22 16.09 19.09 19 15.5 19C11.91 19 9 16.09 9 12.5C9 8.91 11.91 6 15.5 6C15.67 6 15.85 6.00999 16.02 6.01999C19.19 6.26999 21.73 8.81001 21.98 11.98C21.99 12.15 22 12.33 22 12.5Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.62 11.62L15.5 10L16.38 11.62L18 12.5L16.38 13.38L15.5 15L14.62 13.38L13 12.5L14.62 11.62Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
