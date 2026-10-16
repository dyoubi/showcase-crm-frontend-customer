import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconDollarSign = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="dollar-icon"
      {...rest}
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#39D98A"
      />
      <path
        d="M15.1667 7.41667L14.8159 7.14105C14.2873 6.72575 13.6346 6.5 12.9624 6.5H10.75C9.23122 6.5 8 7.73122 8 9.25V9.25C8 10.7688 9.23122 12 10.75 12H13.25C14.7688 12 16 13.2312 16 14.75V14.75C16 16.2688 14.7688 17.5 13.25 17.5H10.167C9.41638 17.5 8.69307 17.2186 8.13978 16.7115L8 16.5833"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 19L12 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});
