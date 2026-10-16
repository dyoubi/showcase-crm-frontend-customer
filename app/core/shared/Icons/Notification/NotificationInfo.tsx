import React from 'react';

import * as t from '../types';

export const IconNotificationInfo = React.memo(({ color, size, ...rest }: t.IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none" {...rest}>
      <path
        d="M-1.81993e-06 19.2314C-1.86821e-06 19.7837 0.447714 20.2314 0.999998 20.2314L16 20.2314C16.5523 20.2314 17 19.7837 17 19.2314L17 5.82282C17 5.56036 16.8968 5.30842 16.7127 5.12137L12.1938 0.529989C12.0059 0.339 11.7491 0.231447 11.4811 0.231447L1 0.231446C0.447716 0.231446 -1.98034e-07 0.679161 -2.46316e-07 1.23145L-1.81993e-06 19.2314Z"
        fill="#150F30"
      />
      <rect width="2" height="7.33333" rx="0.5" transform="matrix(1 0 0 -1 7.11523 15.7314)" fill="#0166FF" />
      <rect width="2" height="2" rx="0.5" transform="matrix(1 0 0 -1 7.11523 7.23145)" fill="#0166FF" />
    </svg>
  );
});
