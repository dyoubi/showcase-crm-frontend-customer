import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconWallet = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 31 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M26.1074 0.5C27.7049 0.500201 28.9999 1.6513 29 3.07129C29 3.54486 28.5679 3.92871 28.0352 3.92871H4.89258C4.35987 3.92878 3.92871 4.3126 3.92871 4.78613C3.92897 5.25947 4.36003 5.64251 4.89258 5.64258H27.8672C29.5556 5.64274 30.9284 6.79612 30.9287 8.21387V21.9287C30.9286 23.3466 29.5557 24.4998 27.8672 24.5H3.92871C1.79824 24.5 0.0712891 22.965 0.0712891 21.0713V3.92871C0.0712891 2.03496 1.79824 0.5 3.92871 0.5H26.1074ZM25.5 13C24.1193 13 23 13.8954 23 15C23 16.1046 24.1193 17 25.5 17C26.8807 17 28 16.1046 28 15C28 13.8954 26.8807 13 25.5 13Z"
        fill={color ? iconColor : 'currentColor'}
      />
    </svg>
  );
});
