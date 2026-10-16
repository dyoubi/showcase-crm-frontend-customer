import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconUsd = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="6" cy="6" r="6" fill="url(#paint0_linear_4723_5612)" />
      <path
        d="M5.32 2.51H6.376V3.334C7.552 3.438 8.312 4.006 8.312 4.998V5.262H7.032V4.998C7.032 4.55 6.616 4.326 5.928 4.326H5.784C5.088 4.326 4.68 4.534 4.68 4.838V4.918C4.68 5.286 5 5.39 6.296 5.606C7.76 5.87 8.408 6.294 8.408 7.198V7.278C8.408 8.102 7.736 8.71 6.376 8.814V9.63H5.32V8.806C3.984 8.694 3.304 8.062 3.304 7.054V6.814H4.584V7.054C4.584 7.622 5.024 7.806 5.808 7.806H5.952C6.696 7.806 7.112 7.63 7.112 7.286V7.214C7.112 6.87 6.728 6.718 5.44 6.51C4.088 6.294 3.384 5.886 3.384 4.974V4.87C3.384 3.982 4.112 3.438 5.32 3.326V2.51Z"
        fill="#231B47"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4723_5612"
          x1="5.03119"
          y1="13.814"
          x2="12.6959"
          y2="13.7989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0066FE" />
          <stop offset="1" stopColor="#00D1FF" />
        </linearGradient>
      </defs>
    </svg>
  );
});
