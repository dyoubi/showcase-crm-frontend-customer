import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconDice = React.memo(({ color, size, ...rest }: t.IconProps) => {
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
        d="M20.3871 7.15762L11.9997 12.0002L3.60889 7.1499"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 12V21" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="7.5" cy="14" rx="0.5" ry="1" fill={iconColor} />
      <ellipse cx="14.5" cy="14" rx="0.5" ry="1" fill={iconColor} />
      <ellipse cx="14.5" cy="18" rx="0.5" ry="1" fill={iconColor} />
      <ellipse cx="18.5" cy="11" rx="0.5" ry="1" fill={iconColor} />
      <ellipse cx="18.5" cy="15" rx="0.5" ry="1" fill={iconColor} />
      <ellipse cx="12" cy="5.5" rx="1" ry="0.5" fill={iconColor} />
      <ellipse cx="12" cy="8.5" rx="1" ry="0.5" fill={iconColor} />
      <path
        d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
