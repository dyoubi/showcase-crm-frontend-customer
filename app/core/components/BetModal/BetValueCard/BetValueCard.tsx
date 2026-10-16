import { FC } from 'react';

import { CryptoIcon } from '@/core/shared';

import { Card, Title, Value } from './BetValueCard.styles';
import { BetValueCardProps } from './BetValueCard.types';

// TODO: Should use formatCryptoPrice to format the value based on the cryptoCode
export const BetValueCard: FC<BetValueCardProps> = ({ title, value, hasHighlight, cryptoCode }) => {
  return (
    <Card hasHighlight={hasHighlight}>
      <Title>{title}</Title>
      <Value>
        {value} {cryptoCode && <CryptoIcon code={cryptoCode} />}
      </Value>
    </Card>
  );
};
