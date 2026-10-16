import React from 'react';

import * as t from '../types';

export const IconNotificationError = React.memo(({ color, size, ...rest }: t.IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none" {...rest}>
      <circle cx="9" cy="9.23145" r="9" fill="#150F30" />
      <rect x="8" y="4.23145" width="2" height="7.33333" rx="0.5" fill="#FF015C" />
      <rect x="8" y="12.7314" width="2" height="2" rx="0.5" fill="#FF015C" />
    </svg>
  );
});
