import { FC, ReactNode, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import { IconCasino, IconMenu, IconSearch, IconWallet } from '@/core/shared/Icons';
import { routePaths } from '@/core/constants/routes';
import { useAppDispatch } from '@/core/store/store';
import {
  setIsIncompleteProfileModalOpen,
  setLoginRegisterModalActiveTab,
  toggleLoginRegisterModal,
  toggleWalletModal,
} from '@/core/store/metaSlice';
import { useGetPlayerQuery } from '@/core/domains/player';
import { useIsLogged } from '@/core/hooks/useIsLogged';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';

import { SearchModal } from '../SearchBar';
import { BottomMenuContainer, BottomMenuItem } from './BottomMenu.styles';

type BottomMenuProps = {
  setMenuOpen?: (arg0: boolean) => void;
  children?: ReactNode;
};

export const BottomMenu: FC<BottomMenuProps> = ({ children, setMenuOpen, ...props }) => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const isLogged = useIsLogged();

  const { data: userData } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const toggleWalletModalOpen = useCallback(() => {
    if (userData) {
      if (userData?.firstname && userData?.lastname && userData?.address?.city && userData?.gender) {
        dispatch(toggleWalletModal());
      } else {
        dispatch(setIsIncompleteProfileModalOpen(true));
      }
    }
  }, [dispatch, userData]);

  const handleWallet = () => {
    if (!isLogged) {
      openRegisterModal();
    } else {
      toggleWalletModalOpen();
    }
  };

  const openRegisterModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));
  }, [dispatch]);

  return (
    <BottomMenuContainer {...props}>
      <BottomMenuItem as="span" onClick={() => setMenuOpen?.(true)}>
        <IconMenu color="bottomMenu" size={25} />
        <FormattedMessage id="bottomBar.menu" defaultMessage="Menu" />
      </BottomMenuItem>
      <BottomMenuItem as="span">
        <Link href={routePaths.casino}>
          <IconCasino color="bottomMenu" size={25} />
          <FormattedMessage id="bottomBar.casino" defaultMessage="Casino" />
        </Link>
      </BottomMenuItem>
      <BottomMenuItem as="span" onClick={handleWallet}>
        <IconWallet color="bottomMenu" size={25} />
        <FormattedMessage id="bottomBar.wallet" defaultMessage="Wallet" />
      </BottomMenuItem>
      <BottomMenuItem as="span" onClick={() => setSearchModalOpen(true)}>
        <IconSearch color="bottomMenu" size={25} />
        <FormattedMessage id="topBar.search" defaultMessage="Search" />
      </BottomMenuItem>
      <SearchModal isOpen={isSearchModalOpen} setIsOpen={setSearchModalOpen} />
    </BottomMenuContainer>
  );
};
