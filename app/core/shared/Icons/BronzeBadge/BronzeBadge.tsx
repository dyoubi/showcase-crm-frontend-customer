import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconBronzeBadge = React.memo(({ size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-bronze"
      {...rest}
    >
      <circle cx="30" cy="30" r="29.5" fill="url(#paint0_linear_562_12753)" stroke="#A34B25" />
      <circle cx="30" cy="30" r="23" fill="#A34B25" />
      <mask
        id="mask0_562_12753"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="8"
        y="9"
        width="46"
        height="47"
      >
        <circle cx="31.2046" cy="32.3252" r="22.6929" fill="#C28B37" />
      </mask>
      <g mask="url(#mask0_562_12753)">
        <circle cx="29.9956" cy="29.9082" r="22.6929" fill="#CC8776" />
      </g>
      <path
        d="M30 14L35 23.6667L45 24.875L38.1333 32.3183L40 43L30 38.1667L20 43L21.8833 32.3183L15 24.875L25 23.6667L30 14Z"
        fill="url(#paint1_linear_562_12753)"
      />
      <path
        d="M29.78 34.996C29.0427 34.996 28.3893 34.8653 27.82 34.604C27.2507 34.3427 26.8027 33.9693 26.476 33.484C26.1587 32.9893 26 32.406 26 31.734V31.482H27.792V31.678C27.792 32.2007 27.974 32.6207 28.338 32.938C28.702 33.246 29.1827 33.4 29.78 33.4C30.3867 33.4 30.8533 33.2553 31.18 32.966C31.516 32.6767 31.684 32.3127 31.684 31.874V31.734C31.684 31.4353 31.6093 31.1927 31.46 31.006C31.3107 30.8193 31.11 30.684 30.858 30.6C30.606 30.5067 30.3213 30.46 30.004 30.46H28.044V28.5L31.208 26.82V26.596H26.252V25H33.196V27.38L30.242 28.948V29.172H30.76C31.1987 29.172 31.6233 29.2607 32.034 29.438C32.454 29.6153 32.7993 29.8907 33.07 30.264C33.3407 30.628 33.476 31.104 33.476 31.692V31.86C33.476 32.4947 33.322 33.05 33.014 33.526C32.706 33.9927 32.272 34.3567 31.712 34.618C31.1613 34.87 30.5173 34.996 29.78 34.996Z"
        fill="#CC8776"
      />
      <defs>
        <linearGradient
          id="paint0_linear_562_12753"
          x1="12.4974"
          y1="56.4617"
          x2="-2.53559"
          y2="-0.849219"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EFB3AF" />
          <stop offset="1" stopColor="#D7896F" />
        </linearGradient>
        <linearGradient id="paint1_linear_562_12753" x1="30" y1="14" x2="30" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBFA" />
          <stop offset="1" stopColor="#F0DDD3" />
        </linearGradient>
      </defs>
    </svg>
  );
});
