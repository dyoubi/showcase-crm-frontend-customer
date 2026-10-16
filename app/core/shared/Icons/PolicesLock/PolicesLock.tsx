import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconPolicesLock = React.memo(({ color, size, ...rest }: t.IconProps) => {
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
      <path
        d="M10.4902 2.23006L5.50016 4.11006C4.35016 4.54006 3.41016 5.90006 3.41016 7.12006V14.5501C3.41016 15.7301 4.19016 17.2801 5.14016 17.9901L9.44016 21.2001C10.8502 22.2601 13.1702 22.2601 14.5802 21.2001L18.8802 17.9901C19.8302 17.2801 20.6102 15.7301 20.6102 14.5501V7.12006C20.6102 5.89006 19.6702 4.53006 18.5202 4.10006L13.5302 2.23006C12.6802 1.92006 11.3202 1.92006 10.4902 2.23006Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="7.5" y="9.5" width="9" height="6" rx="1.5" stroke={iconColor} />
      <path
        d="M9.5 8C9.5 7.17157 10.1716 6.5 11 6.5H13C13.8284 6.5 14.5 7.17157 14.5 8V9.5H9.5V8Z"
        stroke={iconColor}
      />
      <circle cx="12" cy="12" r="1" fill={iconColor} />
    </svg>
  );
});
