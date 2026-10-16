import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconGoldBadge = React.memo(({ size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-gold"
      {...rest}
    >
      <circle cx="30" cy="30" r="29.5" fill="url(#paint0_linear_562_12751)" stroke="#C79E0D" />
      <circle cx="30" cy="30" r="23" fill="#A88300" />
      <mask
        id="mask0_562_12751"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="8"
        y="9"
        width="46"
        height="47"
      >
        <circle cx="31.2046" cy="32.3252" r="22.6929" fill="#C28B37" />
      </mask>
      <g mask="url(#mask0_562_12751)">
        <circle cx="29.9956" cy="29.9082" r="22.6929" fill="#EBB92E" />
      </g>
      <path
        d="M30 14L35 23.6667L45 24.875L38.1333 32.3183L40 43L30 38.1667L20 43L21.8833 32.3183L15 24.875L25 23.6667L30 14Z"
        fill="url(#paint1_linear_562_12751)"
      />
      <path d="M29.444 35.0002V26.5162H29.192L27.876 29.6242H26L28.002 25.2002H31.236V35.0002H29.444Z" fill="#EBB92E" />
      <defs>
        <linearGradient id="paint0_linear_562_12751" x1="30" y1="1" x2="30" y2="59" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8D241" />
          <stop offset="1" stopColor="#FCE998" />
        </linearGradient>
        <linearGradient id="paint1_linear_562_12751" x1="30" y1="14" x2="30" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFCDD" />
          <stop offset="1" stopColor="#FEF838" />
        </linearGradient>
      </defs>
    </svg>
  );
});
