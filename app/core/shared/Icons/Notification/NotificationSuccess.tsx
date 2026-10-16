import React from 'react';

import * as t from '../types';

export const IconNotificationSuccess = React.memo(({ color, size, ...rest }: t.IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" {...rest}>
      <circle cx="9" cy="9" r="9" fill="#150F30" />
      <path
        d="M13 6L8.78847 11.4161C8.57114 11.6956 8.14019 11.6669 7.96184 11.3611L6 7.99713"
        stroke="#33FF00"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
});
