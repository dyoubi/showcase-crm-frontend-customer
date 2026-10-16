import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconHome = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.0302 1.06683C16.2886 0.448818 15.2114 0.448775 14.4697 1.06672L0.719782 12.5227C0.263706 12.9027 0 13.4656 0 14.0592V29.5C0 30.6046 0.895431 31.5 2 31.5H8.49738C9.60195 31.5 10.4974 30.6046 10.4974 29.5V23C10.4974 21.8954 11.3928 21 12.4974 21H19C20.1046 21 21 21.8954 21 23V29.5C21 30.6046 21.8954 31.5 23 31.5H29.4974C30.6019 31.5 31.4974 30.6046 31.4974 29.5V14.0591C31.4974 13.4656 31.2337 12.9027 30.7777 12.5227L17.0302 1.06683Z"
        fill={iconColor || 'currentColor'}
      />
    </svg>
  );
});
