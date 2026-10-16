import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconLightning = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 25 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.31085 0.928303C6.56149 0.363585 7.12002 0 7.73889 0H20.0807C21.2411 0 21.9976 1.22227 21.4778 2.26196L17.9672 9.28303H23.1626C24.5551 9.28303 25.2513 10.9664 24.2673 11.9504L5.77398 30.4437C4.60742 31.6103 2.66417 30.4097 3.18711 28.8455L7.12931 17.0189H1.56258C1.30226 17.0189 1.04607 16.9538 0.817275 16.8297C0.588478 16.7055 0.394327 16.5261 0.252456 16.3079C0.110585 16.0896 0.0254883 15.8394 0.00489674 15.5798C-0.0156948 15.3203 0.0288707 15.0598 0.134545 14.8219L6.31085 0.928303Z"
        fill={color ? iconColor : 'currentColor'}
      />
    </svg>
  );
});
