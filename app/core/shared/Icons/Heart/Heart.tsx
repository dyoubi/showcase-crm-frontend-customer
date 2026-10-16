import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

interface IconHeartProps extends t.IconProps {
  fillColor?: string;
}

export const IconHeart = React.memo(({ color, size, fillColor, ...rest }: IconHeartProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 35 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M18.1719 31.3905C17.7907 31.7363 17.2093 31.7363 16.8281 31.3905L14.9625 29.6981C5.95 21.5542 0 16.1657 0 9.59128C0 4.20272 4.235 0 9.625 0C12.2679 0 14.8185 1.06408 16.6932 2.79318C17.1426 3.20764 17.8574 3.20763 18.3068 2.79318C20.1815 1.06408 22.7321 0 25.375 0C30.765 0 35 4.20272 35 9.59128C35 16.1657 29.05 21.5542 20.0375 29.6981L18.1719 31.3905Z"
        stroke={color ? iconColor : 'currentColor'}
        strokeWidth={2}
        fill={fillColor}
      />
    </svg>
  );
});
