import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconTips3 = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 29 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M6.39954 27.9952C4.17947 27.9302 2.39941 26.1101 2.39941 23.8701V10.1196C2.39941 7.83957 4.24447 5.99451 6.52455 5.99451H15.9448"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.4002 5.99939C24.6202 6.06439 26.4003 7.88445 26.4003 10.1245V23.875C26.4003 26.155 24.5552 28.0001 22.2752 28.0001H12.7349"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0454 9.99977L16.3105 6.37965C16.5456 6.17965 16.5456 5.81463 16.3105 5.61963L12.0454 1.99951"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M16.7549 23.9993L12.4897 27.6194C12.2547 27.8194 12.2547 28.1844 12.4897 28.3794L16.7549 31.9995"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
});
