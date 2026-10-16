import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconCollapse = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M2 2L2 25" stroke={iconColor} strokeWidth="3" strokeLinecap="round" />
      <path
        d="M16.4199 25.041L26.055 15.1016C26.6483 14.4896 26.6483 13.5104 26.055 12.8983L16.4199 2.95902C15.8266 2.34699 14.8773 2.34699 14.284 2.95902C13.6907 3.57105 13.6907 4.55029 14.284 5.16232L21.3324 12.4332L8.01884 12.4332C7.18823 12.4332 6.5 13.1432 6.5 14C6.5 14.8568 7.18823 15.5668 8.01884 15.5668L21.3324 15.5668L14.284 22.8377C13.6907 23.4497 13.6907 24.429 14.284 25.041C14.8773 25.653 15.8266 25.653 16.4199 25.041Z"
        fill={iconColor}
      />
    </svg>
  );
});
