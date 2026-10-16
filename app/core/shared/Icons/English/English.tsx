import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconEnglish = React.memo(({ size, ...rest }: t.IconProps) => {
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
      <path d="M35.99 0H0V23.96H35.99V0Z" fill="white" />
      <path
        d="M35.9898 9.59H20.1498V0H15.8198V9.59H0.00976562V14.38H15.8198V23.96H20.1498V14.38H35.9898V9.59Z"
        fill="#E53535"
      />
      <path d="M0 2.79004V8.01004H7.85L0 2.79004Z" fill="#3E59B0" />
      <path d="M4.33021 0L4.22021 0.01L14.3902 6.81V0H4.33021Z" fill="#3E59B0" />
      <path d="M12.08 7.98L0 0V1.88L9.2 7.98H12.08Z" fill="#E53535" />
      <path d="M23.9199 15.98L35.9999 23.96V22.08L26.7999 15.98H23.9199Z" fill="#E53535" />
      <path d="M0 21.2102V15.9902H7.85L0 21.2102Z" fill="#3E59B0" />
      <path d="M4.33021 23.9999L4.22021 23.9899L14.3902 17.1899V23.9999H4.33021Z" fill="#3E59B0" />
      <path d="M12.0198 15.98L0.00976562 23.95L2.81977 23.96L14.4098 16.31V15.98H12.0198Z" fill="#E53535" />
      <path d="M35.9999 2.79004V8.01004H28.1499L35.9999 2.79004Z" fill="#3E59B0" />
      <path d="M31.6699 0L31.7799 0.01L21.6099 6.81V0H31.6699Z" fill="#3E59B0" />
      <path d="M35.9901 0.00976562H33.2901L21.6201 7.70977V7.97977H24.0901L35.9901 0.00976562Z" fill="#E53535" />
      <path d="M35.9999 21.2102V15.9902H28.1499L35.9999 21.2102Z" fill="#3E59B0" />
      <path d="M31.6699 23.9999L31.7799 23.9899L21.6099 17.1899V23.9999H31.6699Z" fill="#3E59B0" />
    </svg>
  );
});
