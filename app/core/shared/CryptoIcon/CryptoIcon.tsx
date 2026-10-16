import { memo } from 'react';

import { CryptoIconProps } from './CryptoIcon.types';
import { iconCurrencyComponentMap } from './CryptoIcon.constants';

export const CryptoIcon = memo(({ code, ...restProps }: CryptoIconProps) => {
  if (!code) {
    return null;
  }

  const IconComponent = iconCurrencyComponentMap[code];

  return <IconComponent {...restProps} ref={undefined} />;
});
