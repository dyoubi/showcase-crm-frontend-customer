import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconLogout = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M27.0032 6.48591C31.7825 9.25218 34.9953 14.4181 34.9953 20.3372C34.9953 29.1693 27.8297 36.3349 18.9977 36.3349C10.1656 36.3349 3 29.1759 3 20.3372C3 14.4181 6.21953 9.24551 10.9988 6.47925"
        stroke={color ? iconColor : 'currentColor'}
        strokeWidth="4.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M18.9976 3V18.9977"
        stroke={color ? iconColor : 'currentColor'}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
