import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconEuroSign = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="euro-icon"
      {...rest}
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#39D98A"
      />
      <path
        d="M16 17.2949C14.0892 18.6202 11.2578 17.9035 9.78995 16.5783C6.98543 14.0461 7.60671 8.82292 10.7452 6.78697C12.5387 5.62356 14.5669 5.85834 16 6.78698"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.99982 11L14.1816 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.99982 13L14.1816 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});
