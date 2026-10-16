import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconBuyCrypto = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.2204 30C16.2906 30 20.4008 25.8898 20.4008 20.8197C20.4008 15.7495 16.2906 11.6393 11.2204 11.6393C6.15023 11.6393 2.04004 15.7495 2.04004 20.8197C2.04004 25.8898 6.15023 30 11.2204 30Z"
        fill={iconColor}
        stroke={iconColor}
        strokeWidth="3.49064"
        strokeMiterlimit="10"
      />
      <path
        d="M20.8195 20.4008C25.8897 20.4008 29.9999 16.2906 29.9999 11.2204C29.9999 6.15023 25.8897 2.04004 20.8195 2.04004C15.7494 2.04004 11.6392 6.15023 11.6392 11.2204C11.6392 16.2906 15.7494 20.4008 20.8195 20.4008Z"
        stroke={iconColor}
        strokeWidth="3.49064"
        strokeMiterlimit="10"
      />
    </svg>
  );
});
