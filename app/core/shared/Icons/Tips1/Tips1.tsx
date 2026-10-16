import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconTips1 = React.memo(({ color, size, ...rest }: t.IconProps) => {
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
      <rect x="0.75" y="5.75" width="22.5" height="12.5" rx="2.25" stroke={iconColor} strokeWidth="1.5" />
      <path
        d="M5 6C5 7.06087 4.57857 8.07828 3.82843 8.82843C3.07828 9.57857 2.06087 10 1 10"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 14C2.06087 14 3.07828 14.4214 3.82843 15.1716C4.57857 15.9217 5 16.9391 5 18"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 18C19 16.9391 19.4214 15.9217 20.1716 15.1716C20.9217 14.4214 21.9391 14 23 14"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 10C21.9391 10 20.9217 9.57857 20.1716 8.82843C19.4214 8.07828 19 7.06087 19 6"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.25" stroke={iconColor} strokeWidth="1.5" />
    </svg>
  );
});
