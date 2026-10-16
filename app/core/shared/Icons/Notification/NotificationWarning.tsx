import React from 'react';

import * as t from '../types';

export const IconNotificationWarning = React.memo(({ color, size, ...rest }: t.IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none" {...rest}>
      <path
        d="M12.2492 1.7312C12.6341 1.06453 13.5964 1.06453 13.9813 1.7312L23.5075 18.2312C23.8924 18.8979 23.4113 19.7312 22.6415 19.7312H3.58895C2.81915 19.7312 2.33803 18.8979 2.72293 18.2312L12.2492 1.7312Z"
        fill="#150F30"
      />
      <rect x="12.1152" y="7.2312" width="2" height="7.33333" rx="0.5" fill="#F8D102" />
      <rect x="12.1152" y="15.7312" width="2" height="2" rx="0.5" fill="#F8D102" />
    </svg>
  );
});
