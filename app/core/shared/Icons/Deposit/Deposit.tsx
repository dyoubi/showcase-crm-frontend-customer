import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconDeposit = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 8L16.5 25" stroke="#9EA4B9" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M25 16.5L8 16.5" stroke="#9EA4B9" strokeWidth="3.5" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.82143 3.61607H28.9286C29.2483 3.61607 29.5548 3.74306 29.7809 3.96911C30.0069 4.19516 30.1339 4.50175 30.1339 4.82143V28.9286C30.1339 29.2483 30.0069 29.5548 29.7809 29.7809C29.5548 30.0069 29.2483 30.1339 28.9286 30.1339H4.82143C4.50175 30.1339 4.19516 30.0069 3.96911 29.7809C3.74306 29.5548 3.61607 29.2483 3.61607 28.9286V4.82143C3.61607 4.50175 3.74306 4.19516 3.96911 3.96911C4.19516 3.74306 4.50175 3.61607 4.82143 3.61607ZM0 4.82143C0 3.54271 0.507971 2.31636 1.41216 1.41216C2.31636 0.507971 3.54271 0 4.82143 0H28.9286C30.2073 0 31.4336 0.507971 32.3378 1.41216C33.242 2.31636 33.75 3.54271 33.75 4.82143V28.9286C33.75 30.2073 33.242 31.4336 32.3378 32.3378C31.4336 33.242 30.2073 33.75 28.9286 33.75H4.82143C3.54271 33.75 2.31636 33.242 1.41216 32.3378C0.507971 31.4336 0 30.2073 0 28.9286V4.82143Z"
        fill={iconColor}
      />
    </svg>
  );
});
