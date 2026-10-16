import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

import { IconBitcoin, IconEthereum, IconTron } from '@/core/shared/Icons';
import { ECryptoCodes, EInGameFiatCodes, useGetCryptoToFiatConversion } from '@/core/domains/currency';
import { Flex, Select } from '@/core/shared';
import { useTheme } from '@/core/hooks/useTheme';
import { SelectSize } from '@/core/shared/Select/Select.types';

import {
  CurrencyItem,
  CurrencyName,
  CurrencyValue,
  FlexContainer,
  IconWrapper,
  LeftContainer,
  NameSymbolWrapper,
  StyledHeading,
  WidgetBorder,
  WidgetContainer,
} from '../Leaderboard.styles';
import { BoardProps } from '../Leaderboard.types';

export const LeaderboardCurrencies = ({ switchBoard }: BoardProps) => {
  const { margin } = useTheme();

  const convertCryptoToFiat = useGetCryptoToFiatConversion();

  const [currentFiatCode, setCurrentFiatCode] = useState<keyof typeof EInGameFiatCodes>(EInGameFiatCodes.EUR);

  const currencies = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: <IconBitcoin size={30} />,
      value: convertCryptoToFiat({
        amount: 1,
        cryptoCode: ECryptoCodes.BTC,
        fiatCode: currentFiatCode,
      }),
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      icon: <IconEthereum size={30} />,
      value: convertCryptoToFiat({
        amount: 1,
        cryptoCode: ECryptoCodes.ETH,
        fiatCode: currentFiatCode,
      }),
    },
    {
      id: 3,
      name: 'TRON',
      symbol: 'TRX',
      icon: <IconTron size={30} />,
      value: convertCryptoToFiat({
        amount: 1,
        cryptoCode: ECryptoCodes.TRX,
        fiatCode: currentFiatCode,
      }),
    },
  ];

  const selectOptions: Array<{ value: keyof typeof EInGameFiatCodes; label: string }> = [
    { value: EInGameFiatCodes.EUR, label: 'EUR' },
    { value: EInGameFiatCodes.USD, label: 'USD' },
  ];

  return (
    <WidgetBorder>
      <WidgetContainer>
        <FlexContainer justify="space-between" mb={margin.m}>
          <StyledHeading size="h4">
            <FormattedMessage id="leaderboard.currencies" defaultMessage="Cryptocurrency" />
          </StyledHeading>
          <Flex style={{ marginTop: 2 }}>
            <Select
              // @ts-expect-error: ref null is needed here
              ref={null}
              size={SelectSize.Small}
              options={selectOptions}
              defaultValue={selectOptions[0]}
              onChange={(option) => setCurrentFiatCode((option as { value: keyof typeof EInGameFiatCodes }).value)}
            />
          </Flex>
        </FlexContainer>
        {currencies.map((item) => (
          <CurrencyItem key={item.id}>
            <LeftContainer>
              <IconWrapper>{item.icon}</IconWrapper>
              <NameSymbolWrapper>
                <CurrencyName>{item.name}</CurrencyName>
                <span>{item.symbol}</span>
              </NameSymbolWrapper>
            </LeftContainer>
            <CurrencyValue>
              {item.value ? `${currentFiatCode === 'EUR' ? '€' : '$'} ${item.value.toFixed(2)}` : 'N/A'}
            </CurrencyValue>
          </CurrencyItem>
        ))}
      </WidgetContainer>
    </WidgetBorder>
  );
};
