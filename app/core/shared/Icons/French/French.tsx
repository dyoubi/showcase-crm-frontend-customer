import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconFrench = React.memo(({ size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M0 2C0 0.89543 0.895431 0 2 0H12V24H2C0.895431 24 0 23.1046 0 22V2Z" fill="#628CE9" />
      <path d="M12 0H24V24H12V0Z" fill="white" />
      <path d="M24 0H34C35.1046 0 36 0.895431 36 2V22C36 23.1046 35.1046 24 34 24H24V0Z" fill="#E53535" />
    </svg>
  );
});
