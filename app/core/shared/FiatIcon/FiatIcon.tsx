import { memo } from 'react';

import { FiatIconProps } from './FiatIcon.types';
import { iconFiatComponentMap } from './FiatIcon.constants';

export const FiatIcon = memo(({ code, ...restProps }: FiatIconProps) => {
  if (!code) {
    return null;
  }

  const IconComponent = iconFiatComponentMap[code];

  return <IconComponent {...restProps} ref={undefined} />;
});
