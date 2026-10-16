import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconLive = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 33 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M26.8569 1.98193C29.7118 4.48422 31.4998 8.06521 31.4998 12.0415C31.4998 16.0177 29.7118 19.5987 26.8569 22.101"
        stroke={iconColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.14286 22.101C3.28802 19.5985 1.5 16.0173 1.5 12.0423C1.5 8.06727 3.28802 4.48442 6.14286 1.98193"
        stroke={iconColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.2144 6.62476C23.6352 7.92886 24.5358 9.87259 24.5358 12.0414C24.5358 14.2103 23.6352 16.1525 22.2144 17.4581"
        stroke={iconColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7858 17.4581C9.36497 16.1538 8.46436 14.2098 8.46436 12.0407C8.46436 9.8715 9.36497 7.92904 10.7858 6.62476"
        stroke={iconColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4999 15.2562C18.2751 15.2562 19.7142 13.8171 19.7142 12.0419C19.7142 10.2667 18.2751 8.82764 16.4999 8.82764C14.7247 8.82764 13.2856 10.2667 13.2856 12.0419C13.2856 13.8171 14.7247 15.2562 16.4999 15.2562Z"
        fill={iconColor}
      />
    </svg>
  );
});
