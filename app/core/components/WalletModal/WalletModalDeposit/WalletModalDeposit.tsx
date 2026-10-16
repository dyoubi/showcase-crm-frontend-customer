import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import QRCode from 'react-qr-code';
import { useIntercom } from 'react-use-intercom';
import { useTheme } from 'styled-components';

import { useGetPlayerDepositAddressesQuery } from '@/core/domains/wallet';
import { CryptoIcon } from '@/core/shared/CryptoIcon';
import { CryptoCodes, ECryptoCodes } from '@/core/domains/currency';
import { IconLoader } from '@/core/shared/Icons';
import { Flex } from '@/core/shared';
import { useAppCookies } from '@/core/hooks/useAppCookies';
import { AnimatedLoader } from '@/core/shared/AnimatedLoader/AnimatedLoader';

import { Box } from '../../../shared/Box';
import { Dropdown, DropdownContainer, DropdownItem, DropdownMenu } from '../../Dropdown';
import { WalletCopyAddressInput } from './WalletCopyAddressInput/WalletCopyAddressInput';
import {
  CurrencyCopy,
  CurrencyLimitationBox,
  StyledQRBox,
  SupportButton,
  SupportText,
  WalletModalDepositContainer,
} from './WalletModalDeposit.styles';

const cryptoCopy: { [code in CryptoCodes]: JSX.Element } = {
  BTC: <FormattedMessage id="bitcoin" defaultMessage="Bitcoin" />,
  ETH: <FormattedMessage id="ethereum" defaultMessage="Ethereum" />,
  TRX: <FormattedMessage id="tron" defaultMessage="Tron" />,
};

const defaultCopy: { [code in CryptoCodes]: JSX.Element } = {
  BTC: (
    <FormattedMessage
      id="walletDeposit.btcCopy"
      defaultMessage="Only send BTC to this address, 1 confirmation(s) required. We do not accept BEP20 from Binance."
    />
  ),
  ETH: (
    <FormattedMessage
      id="walletDeposit.ethCopy"
      defaultMessage="Only send ETH to this address, 12 confirmation(s) required. We do not accept BEP20 from Binance."
    />
  ),
  TRX: (
    <FormattedMessage
      id="walletDeposit.trxCopy"
      defaultMessage="Only send TRX to this address, 1 confirmation(s) required. We do not accept BEP20 from Binance."
    />
  ),
};

const limitationCopy: { [code in CryptoCodes]: JSX.Element | null } = {
  BTC: null,
  ETH: (
    <FormattedMessage
      id="walletDeposit.ethLimitationCopy"
      defaultMessage="We only support ERC20 addresses on the Ethereum blockchain. Do not deposit or withdraw to anything other than an Ethereum address."
    />
  ),
  TRX: (
    <FormattedMessage
      id="walletDeposit.trxLimitationCopy"
      defaultMessage="BitPlay does not accept TRX smart contracts"
    />
  ),
};

export const WalletModalDeposit: FC = () => {
  const {
    cookies: { activeBalance = 'BTC' },
  } = useAppCookies();

  const [selectedCurrency, setSelectedCurrency] = useState<CryptoCodes>(activeBalance);

  const { show: openLiveSupport } = useIntercom();
  const theme = useTheme();

  const {
    data: depositAddressesMap,
    isLoading: isLoadingDepositAddresses,
    isError: isErrorDepositAddresses,
  } = useGetPlayerDepositAddressesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const depositAddresses = depositAddressesMap?.[selectedCurrency];
  const isActive = !!depositAddresses?.length;
  const address = depositAddresses?.[0]?.address ?? '';

  if (isLoadingDepositAddresses) {
    return (
      <WalletModalDepositContainer>
        <Flex justifyContent="center" alignItems="center">
          <AnimatedLoader />
        </Flex>
      </WalletModalDepositContainer>
    );
  }

  if (!isActive || isErrorDepositAddresses) {
    return (
      <WalletModalDepositContainer>
        <p>
          <FormattedMessage
            id="walletDeposit.inactiveCopy"
            defaultMessage="This crypto-currency is not available for deposits at the moment. You can still use other crypto-currencies available in the the list to perform a deposit."
          />
        </p>

        <p>
          <FormattedMessage
            id="walletDeposit.inactiveContact"
            defaultMessage="In case of any doubts, you can start a chat with our support"
          />

          <SupportButton onClick={openLiveSupport} title="Open live support">
            <SupportText>
              <FormattedMessage id="walletDeposit.inactiveContact.link" defaultMessage="here" />
            </SupportText>
          </SupportButton>
        </p>
      </WalletModalDepositContainer>
    );
  }

  return (
    <WalletModalDepositContainer>
      <Dropdown
        // we must set menu container above the modal
        zIndex={theme.zIndexes.modal + 1}
        content={
          <DropdownMenu width={180}>
            {Object.keys(ECryptoCodes).map((c) => {
              const cryptoCode = c as CryptoCodes;

              return (
                <DropdownItem
                  key={cryptoCode}
                  onClick={() => setSelectedCurrency(cryptoCode)}
                  iconLeft={<CryptoIcon code={cryptoCode} />}
                >
                  {cryptoCopy[cryptoCode]}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        }
      >
        <DropdownContainer displayArrow iconLeft={<CryptoIcon code={selectedCurrency} />}>
          {selectedCurrency}
        </DropdownContainer>
      </Dropdown>

      {limitationCopy[selectedCurrency] ? (
        <Box mt="l">
          <CurrencyLimitationBox>{limitationCopy[selectedCurrency]}</CurrencyLimitationBox>
        </Box>
      ) : null}

      <Box mt="l" data-mocked width="100%">
        <WalletCopyAddressInput value={address} />
      </Box>

      <StyledQRBox p="l" mt="l" data-mocked>
        <QRCode value={address} />
      </StyledQRBox>

      <Box mt="l">
        <CurrencyCopy>{defaultCopy[selectedCurrency]}</CurrencyCopy>
      </Box>
    </WalletModalDepositContainer>
  );
};
