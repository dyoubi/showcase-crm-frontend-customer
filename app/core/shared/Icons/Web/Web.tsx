import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconWeb = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16.0006" cy="16.5005" r="14.8" stroke={iconColor} strokeWidth="1.5" />
      <path
        d="M15.143 1.69857C11.64 1.69857 8.80017 8.32475 8.80017 16.4986C8.80017 24.6724 11.64 31.2986 15.143 31.2986"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.8001 1.69857C20.3032 1.69857 23.1429 8.32475 23.1429 16.4986C23.1429 24.6724 20.3032 31.2986 16.8001 31.2986"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.19919 17.357C1.19919 20.8601 7.82538 23.6999 15.9992 23.6999C24.173 23.6999 30.7992 20.8601 30.7992 17.357"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.19919 15.7C1.19919 12.1969 7.82538 9.3571 15.9992 9.3571C24.173 9.3571 30.7992 12.1969 30.7992 15.7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
});
