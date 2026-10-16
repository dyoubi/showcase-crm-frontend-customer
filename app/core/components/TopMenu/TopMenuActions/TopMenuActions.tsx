import { FC, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useIntercom } from 'react-use-intercom';

import { routePaths } from '@/core/constants/routes';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import {
  selectIsIncompleteProfileModalOpen,
  selectIsWalletModalOpen,
  setIsIncompleteProfileModalOpen,
  toggleUserProfileModal,
  toggleVIPModal,
  toggleWalletModal,
} from '@/core/store/metaSlice';
import { VIPModal } from '@/core/components/VIPModal';
import { logout, useGetPlayerQuery } from '@/core/domains/player';
import { IconLogout, IconSettings, IconTips3, IconUser, IconVIP3, IconWallet } from '@/core/shared/Icons';
import { useMediaContext } from '@/core/hooks/useMediaContext';

import { CompleteRegistrationModal } from '@/features/Auth/components/CompleteRegistrationModal';

import { Dropdown, DropdownItem, DropdownMenu } from '../../Dropdown';
import { TopMenuActionsContainer } from './TopMenuActions.styles';
import { UserProfileModal } from '../../UserProfileModal';
import { TopMenuWallet } from '../TopMenuWallet/TopMenuWallet';
import { WalletModal } from '../../WalletModal';
import { TopMenuUser } from '../TopMenuUser/TopMenuUser';

export const TopMenuActions: FC = () => {
  const dispatch = useAppDispatch();

  const { device } = useMediaContext();

  const { trackEvent, hardShutdown } = useIntercom();

  const { data: userData } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const isIncompleteProfileModalOpen = useAppSelector(selectIsIncompleteProfileModalOpen);

  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const isProfileCompleted = () => {
    setIsProfileComplete(true);
  };

  const handleLogout = async () => {
    // Prevent multiple logout attempts
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      hardShutdown();
      await logout(trackEvent, device);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const isWalletModalOpen = useAppSelector(selectIsWalletModalOpen);

  const openUserProfileModal = useCallback(() => {
    dispatch(toggleUserProfileModal());
  }, [dispatch]);

  const toggleWalletModalOpen = useCallback(() => {
    if (userData) {
      if (
        isProfileComplete ||
        (userData?.firstname && userData?.lastname && userData?.address?.city && userData?.gender)
      ) {
        dispatch(toggleWalletModal());
      } else {
        dispatch(setIsIncompleteProfileModalOpen(true));
      }
    }
  }, [dispatch, userData, isProfileComplete]);

  return (
    <TopMenuActionsContainer>
      <TopMenuWallet toggleWalletModalOpen={toggleWalletModalOpen} />

      <Dropdown
        content={
          <DropdownMenu width={190}>
            <DropdownItem onClick={openUserProfileModal} data-mocked iconLeft={<IconUser />}>
              <FormattedMessage id="topBar.menuProfile" defaultMessage="Profile" />
            </DropdownItem>
            <DropdownItem onClick={toggleWalletModalOpen} data-mocked iconLeft={<IconWallet />}>
              <FormattedMessage id="topBar.menuWallet" defaultMessage="Wallet" />
            </DropdownItem>

            <DropdownItem onClick={() => dispatch(toggleVIPModal())} iconLeft={<IconVIP3 />}>
              <FormattedMessage id="topBar.menuVIP" defaultMessage="VIP" />
            </DropdownItem>

            <DropdownItem iconLeft={<IconTips3 />} href={routePaths.transactions.deposits}>
              <FormattedMessage id="topBar.menuTransactions" defaultMessage="Transactions" />
            </DropdownItem>

            <DropdownItem iconLeft={<IconSettings />} href={routePaths.settings.account}>
              <FormattedMessage id="topBar.menuSettings" defaultMessage="Settings" />
            </DropdownItem>

            <DropdownItem onClick={handleLogout} iconLeft={<IconLogout />}>
              <FormattedMessage id="topBar.menuLogout" defaultMessage="Logout" />
            </DropdownItem>
          </DropdownMenu>
        }
        contentPosition="right"
      >
        <TopMenuUser username={userData?.nickname} />
      </Dropdown>

      <UserProfileModal />
      <VIPModal />
      <WalletModal isOpen={isWalletModalOpen} setIsOpen={toggleWalletModalOpen} />

      <CompleteRegistrationModal
        isSubmitted={isProfileCompleted}
        isOpen={isIncompleteProfileModalOpen}
        setIsOpen={() => dispatch(setIsIncompleteProfileModalOpen(false))}
      />
    </TopMenuActionsContainer>
  );
};
