import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useAppCookies } from '@/core/hooks/useAppCookies';
import { FiatModal } from '@/core/components/FiatModal';
import { ACTIVE_BALANCE, ACTIVE_FIAT_CURRENCY, DISPLAY_IN_FIAT } from '@/core/constants/cookies';
import { useAppSelector } from '@/core/store/store';
import { Dropdown, DropdownItem, DropdownMenu } from '@/core/components/Dropdown';
import { CryptoIcon } from '@/core/shared/CryptoIcon';
import { selectInGame } from '@/core/domains/machineView';
import { useGetPlayerBalancesQuery } from '@/core/domains/balance';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { FiatCodes } from '@/core/domains/currency';
import { IconWallet } from '@/core/shared/Icons';
import { Button } from '@/core/shared/Button';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';

import {
  FiatButtonIcon,
  StyledDropdownContainer,
  TinyCryptoIcon,
  TopMenuWalletContainer,
  TopMenuWalletWrapper,
  WalletButton,
} from './TopMenuWallet.styles';
import { TopMenuWalletProps } from '../TopMenu.types';

export const TopMenuWallet: FC<TopMenuWalletProps> = ({ children, toggleWalletModalOpen, ...props }) => {
  const { isTabletOrPhone } = useBreakpoints();
  const { cookies, setCookie } = useAppCookies();
  const {
    data: userBalances,
    isLoading: isBalanceLoading,
    refetch,
  } = useGetPlayerBalancesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { formatCryptoPrice } = useDisplayPrice();
  const isInGame = useAppSelector(selectInGame);
  const [isFiatModalOpen, setIsFiatModalOpen] = useState<boolean>(false);

  const handleDisplayInFiat = () => {
    if (cookies.displayInFiat) {
      setCookie(ACTIVE_FIAT_CURRENCY, null);
      setCookie(DISPLAY_IN_FIAT, false);
    } else {
      setIsFiatModalOpen(true);
    }
  };

  const handleActiveFiat = (fiatCode?: FiatCodes) => {
    if (!fiatCode) {
      return;
    }
    setCookie(ACTIVE_FIAT_CURRENCY, fiatCode);
    setCookie(DISPLAY_IN_FIAT, true);
    setIsFiatModalOpen(false);
  };

  const activeBalanceObj = userBalances?.find((balance) => balance.coin === cookies.activeBalance);

  const renderUserBalance = () => {
    if (isBalanceLoading || !activeBalanceObj) {
      return (
        <>
          <FormattedMessage id="topBar.balanceLoading" defaultMessage="Loading" />
          ...
        </>
      );
    }

    if (isInGame) {
      return <FormattedMessage id="topBar.inGame" defaultMessage="In Game" />;
    }

    return (
      <>
        {formatCryptoPrice({
          amount: activeBalanceObj?.value,
          cryptoCode: activeBalanceObj?.coin,
          maximumFractionDigits: 8,
        })}
        {isTabletOrPhone && <TinyCryptoIcon code={activeBalanceObj?.coin} size="xs" />}
      </>
    );
  };

  return (
    <TopMenuWalletWrapper {...props} onClick={() => refetch()}>
      <TopMenuWalletContainer>
        <Dropdown
          disabled={isInGame}
          content={
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {!isInGame && (
                <DropdownMenu width="100%" minWidth="auto">
                  {userBalances?.map((balance) => (
                    <DropdownItem
                      key={balance?.coin}
                      iconLeft={<CryptoIcon code={balance?.coin} />}
                      onClick={() => setCookie(ACTIVE_BALANCE, balance?.coin)}
                    >
                      {formatCryptoPrice({
                        amount: balance?.value,
                        cryptoCode: balance?.coin,
                        precision: balance?.precision,
                        maximumFractionDigits: 8,
                      })}
                    </DropdownItem>
                  ))}
                  <DropdownItem onClick={(evt) => evt.stopPropagation()}>
                    <Button
                      color={ButtonColor.Tertiary}
                      size={ButtonSize.Small}
                      iconLeft={<FiatButtonIcon isSelected={cookies.displayInFiat} />}
                      isSelected={cookies.displayInFiat}
                      onClick={handleDisplayInFiat}
                    >
                      <FormattedMessage id="topBar.walletDisplayInFiat" defaultMessage="Display in Fiat" />
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </>
          }
        >
          <StyledDropdownContainer iconLeft={!isTabletOrPhone && <CryptoIcon code={activeBalanceObj?.coin} size="l" />}>
            {renderUserBalance()}
          </StyledDropdownContainer>
        </Dropdown>

        <WalletButton onClick={toggleWalletModalOpen} color={ButtonColor.Secondary}>
          <IconWallet />

          <span>
            <FormattedMessage id="topBar.walletButton" defaultMessage="Connect your Wallet" />
          </span>
        </WalletButton>

        <FiatModal isOpen={isFiatModalOpen} setIsOpen={setIsFiatModalOpen} onChange={handleActiveFiat} />
      </TopMenuWalletContainer>
    </TopMenuWalletWrapper>
  );
};
