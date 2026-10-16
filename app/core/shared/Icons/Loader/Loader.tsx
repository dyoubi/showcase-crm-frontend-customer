import React from 'react';
import { useIntl } from 'react-intl';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconLoader = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);
  const { formatMessage } = useIntl();

  return (
    <svg
      aria-label={formatMessage({ id: 'global.loading', defaultMessage: 'Loading' })}
      width={iconSize}
      height={iconSize}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...rest}
    >
      <path
        fill={iconColor}
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
});
