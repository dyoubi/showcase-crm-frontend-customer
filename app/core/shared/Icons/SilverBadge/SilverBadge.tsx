import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconSilverBadge = React.memo(({ size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-silver"
      {...rest}
    >
      <circle cx="30" cy="30" r="29.5" fill="url(#paint0_linear_562_12752)" stroke="#86A4B4" />
      <circle cx="30" cy="30" r="23" fill="#7487A4" />
      <mask
        id="mask0_562_12752"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="8"
        y="9"
        width="46"
        height="47"
      >
        <circle cx="31.2046" cy="32.3252" r="22.6929" fill="#B6C6DD" />
      </mask>
      <g mask="url(#mask0_562_12752)">
        <circle cx="29.9956" cy="29.9082" r="22.6929" fill="#B6C6DD" />
      </g>
      <path
        d="M30 14L35 23.6667L45 24.875L38.1333 32.3183L40 43L30 38.1667L20 43L21.8833 32.3183L15 24.875L25 23.6667L30 14Z"
        fill="url(#paint1_linear_562_12752)"
      />
      <path
        d="M26 34.996V33.82C26 33.1387 26.112 32.574 26.336 32.126C26.56 31.6687 26.882 31.2953 27.302 31.006C27.7313 30.7073 28.254 30.4647 28.87 30.278L29.808 29.984C30.1533 29.872 30.4427 29.7367 30.676 29.578C30.9093 29.41 31.0867 29.2093 31.208 28.976C31.3387 28.7427 31.404 28.4767 31.404 28.178V28.122C31.404 27.6553 31.2453 27.2867 30.928 27.016C30.6107 26.736 30.1767 26.596 29.626 26.596C29.0847 26.596 28.646 26.7453 28.31 27.044C27.9833 27.3333 27.82 27.7533 27.82 28.304V28.556H26.028V28.332C26.028 27.6227 26.1867 27.0207 26.504 26.526C26.8213 26.0313 27.2507 25.6533 27.792 25.392C28.3427 25.1307 28.954 25 29.626 25C30.298 25 30.9047 25.1307 31.446 25.392C31.9873 25.644 32.412 26.0033 32.72 26.47C33.0373 26.9273 33.196 27.4687 33.196 28.094V28.234C33.196 28.8593 33.0653 29.3913 32.804 29.83C32.552 30.2593 32.2067 30.614 31.768 30.894C31.3293 31.1647 30.83 31.3887 30.27 31.566L29.374 31.846C28.9727 31.9673 28.66 32.1027 28.436 32.252C28.212 32.392 28.0533 32.5507 27.96 32.728C27.876 32.896 27.834 33.1013 27.834 33.344V33.4H33.112V34.996H26Z"
        fill="#B6C6DD"
      />
      <defs>
        <linearGradient id="paint0_linear_562_12752" x1="30" y1="1" x2="30" y2="59" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C6E2FE" />
          <stop offset="1" stopColor="#CEE0F1" />
        </linearGradient>
        <linearGradient id="paint1_linear_562_12752" x1="30" y1="14" x2="30" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E9F8FF" />
          <stop offset="1" stopColor="#E2F1FB" />
        </linearGradient>
      </defs>
    </svg>
  );
});
