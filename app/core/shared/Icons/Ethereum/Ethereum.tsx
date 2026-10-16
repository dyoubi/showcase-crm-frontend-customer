import React from 'react';

import { useIconSize } from '../hooks';
import * as t from '../types';

export const IconEthereum = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon-ethereum"
      {...rest}
    >
      <path
        d="M24.0664 12.0683C24.0664 18.6957 18.6939 24.0684 12.0665 24.0684C5.43899 24.0684 0.0664062 18.6957 0.0664062 12.0683C0.0664062 5.44091 5.43899 0.0683594 12.0665 0.0683594C18.6938 0.0683594 24.0664 5.44091 24.0664 12.0683Z"
        fill="#325AC9"
      />
      <g opacity="0.8">
        <path
          d="M12.0282 6.50049L11.9541 6.75242V14.0628L12.0282 14.1367L15.4216 12.1309L12.0282 6.50049Z"
          fill="white"
        />
        <path d="M12.0282 6.50049L8.63477 12.1309L12.0282 14.1368V10.5885V6.50049Z" fill="white" />
        <path
          d="M12.0281 15.2411L11.9863 15.2921V17.8962L12.0281 18.0181L15.4235 13.2363L12.0281 15.2411Z"
          fill="white"
        />
        <path d="M12.0282 18.0182V15.2411L8.63477 13.2363L12.0282 18.0182Z" fill="white" />
        <path d="M12.0283 14.1365L15.4217 12.1308L12.0283 10.5884V14.1365Z" fill="white" />
        <path d="M8.63477 12.1308L12.0281 14.1366V10.5884L8.63477 12.1308Z" fill="white" />
      </g>
    </svg>
  );
});
