import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconChat = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 35 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <ellipse cx="9.59326" cy="12.125" rx="2.53125" ry="2.53125" fill={iconColor} />
      <ellipse cx="17.187" cy="12.125" rx="2.53125" ry="2.53125" fill={iconColor} />
      <ellipse cx="24.7808" cy="12.125" rx="2.53125" ry="2.53125" fill={iconColor} />
      <path
        d="M5.375 22.25H12.125V30.6875L20.5625 22.25H29C29.8951 22.25 30.7535 21.8944 31.3865 21.2615C32.0194 20.6285 32.375 19.7701 32.375 18.875V5.375C32.375 4.47989 32.0194 3.62145 31.3865 2.98851C30.7535 2.35558 29.8951 2 29 2H5.375C4.47989 2 3.62145 2.35558 2.98851 2.98851C2.35558 3.62145 2 4.47989 2 5.375V18.875C2 19.7701 2.35558 20.6285 2.98851 21.2615C3.62145 21.8944 4.47989 22.25 5.375 22.25Z"
        stroke={iconColor}
        strokeWidth="3.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
