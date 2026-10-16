import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconStar = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 35 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M15.8624 1.53305C16.6307 0.344623 18.3693 0.344623 19.1376 1.53305L23.7619 8.68599C24.025 9.09299 24.4303 9.38742 24.8986 9.5119L33.1305 11.6995C34.4982 12.0629 35.0354 13.7164 34.1426 14.8144L28.7687 21.4227C28.4629 21.7987 28.3081 22.2751 28.3345 22.7591L28.7978 31.264C28.8747 32.6771 27.4682 33.699 26.1481 33.1891L18.2026 30.1203C17.7505 29.9457 17.2495 29.9457 16.7974 30.1203L8.85191 33.1891C7.5318 33.699 6.12527 32.6771 6.20224 31.264L6.6655 22.7591C6.69186 22.2751 6.53706 21.7987 6.23129 21.4227L0.857425 14.8144C-0.035414 13.7164 0.501834 12.0629 1.86951 11.6995L10.1014 9.5119C10.5697 9.38742 10.975 9.09299 11.2381 8.68599L15.8624 1.53305Z"
        fill={iconColor}
      />
    </svg>
  );
});
