import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconUser = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 26 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-user"
      {...rest}
    >
      <path
        d="M2.53125 30.375C2.53125 30.375 0 30.375 0 27.8438C0 25.3125 2.53125 17.7188 12.6562 17.7188C22.7812 17.7188 25.3125 25.3125 25.3125 27.8438C25.3125 30.375 22.7812 30.375 22.7812 30.375H2.53125ZM12.6562 15.1875C14.6702 15.1875 16.6017 14.3874 18.0258 12.9633C19.4499 11.5392 20.25 9.60774 20.25 7.59375C20.25 5.57976 19.4499 3.64826 18.0258 2.22416C16.6017 0.800054 14.6702 0 12.6562 0C10.6423 0 8.71076 0.800054 7.28665 2.22416C5.86255 3.64826 5.0625 5.57976 5.0625 7.59375C5.0625 9.60774 5.86255 11.5392 7.28665 12.9633C8.71076 14.3874 10.6423 15.1875 12.6562 15.1875Z"
        fill={iconColor}
      />
    </svg>
  );
});
