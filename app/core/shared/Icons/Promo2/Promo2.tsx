import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconPromo2 = React.memo(({ color, size, ...rest }: t.IconProps) => {
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
        d="M10.1894 13.9067L6.38644 14.9257C5.31951 15.2116 4.22283 14.5784 3.93695 13.5115L3.51775 11.947C3.23186 10.8801 3.86503 9.78341 4.93196 9.49753L8.73496 8.47851"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50002 14.9998L7.74235 19.5555C7.88547 20.0804 8.42189 20.3945 8.94966 20.2626L9.0046 20.2488C9.55012 20.1125 9.87598 19.5533 9.72567 19.0114L8.49991 14.5925M10.9526 13.9433L17.9948 14.4844C18.6822 14.5372 19.2156 13.895 19.0374 13.229L16.6828 4.42518C16.5001 3.74219 15.6857 3.45927 15.119 3.8819L9.36683 8.17126C9.03858 8.41604 8.89272 8.83621 8.9987 9.23173L10.0633 13.205C10.1731 13.6149 10.5296 13.9108 10.9526 13.9433Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
