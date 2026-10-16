import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconVIP3 = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 35 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5.43252 20C4.58399 20 3.85221 19.4039 3.6806 18.5729L1.00331 5.6084C0.664463 3.96759 2.56504 2.80304 3.87307 3.84999L9.40403 8.27694C10.2248 8.9339 11.4325 8.74479 12.0131 7.86836L16.3976 1.2508C17.1051 0.183007 18.6727 0.183009 19.3802 1.2508L23.7646 7.86836C24.3453 8.74479 25.553 8.9339 26.3738 8.27694L31.9047 3.84999C33.2127 2.80304 35.1133 3.96759 34.7745 5.6084L32.0972 18.5729C31.9256 19.4039 31.1938 20 30.3453 20H5.43252ZM31.8025 25.25C31.8025 26.3 31.0074 27 29.8148 27H5.96296C4.77037 27 3.97531 26.3 3.97531 25.25C3.97531 24.2835 4.75881 23.5 5.72531 23.5H30.0525C31.019 23.5 31.8025 24.2835 31.8025 25.25Z"
        fill={color ? iconColor : 'currentColor'}
      />
    </svg>
  );
});
