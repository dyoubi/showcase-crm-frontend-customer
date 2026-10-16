/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntercom } from 'react-use-intercom';

import { StickySidebar } from '@/core/components/StickySidebar';
import { routePaths } from '@/core/constants/routes';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import {
  IconBitplayPicks,
  IconCasino,
  IconChevronDown,
  IconChevronUp,
  IconClose,
  IconFlame,
  IconHeart,
  IconHome,
  IconLightning,
  IconLive,
  IconLive2,
  IconLogout,
  IconNew,
  IconPromotion,
  IconSettings,
  IconSlot,
  IconVIP3,
  IconWallet,
} from '@/core/shared/Icons';
import { logout, useGetPlayerQuery } from '@/core/domains/player';
import {
  setIsIncompleteProfileModalOpen,
  setLoginRegisterModalActiveTab,
  toggleLoginRegisterModal,
  toggleVIPModal,
  toggleWalletModal,
} from '@/core/store/metaSlice';
import { Divider } from '@/core/shared/Divider';
import { useAppDispatch } from '@/core/store/store';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';

import { LateralMenuProps } from './LateralMenu.types';
import {
  CloseButton,
  ExpandedMenuContainer,
  LateralMenuContainer,
  LateralMenuItem,
  LateralMenuWrapper,
  MenuIcon,
  MenuItemContainer,
  StyledLateralMenu,
} from './LateralMenu.styles';

export const LateralMenu: FC<LateralMenuProps> = ({ setIsOpen }) => {
  const { isTabletOrPhone } = useBreakpoints();
  const [isCasinoSectionExpanded, setIsCasinoSectionExpanded] = useState(false);
  const isLogged = useIsLogged();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: userData } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const closeModal = () => setIsOpen(false);
  const toggleCasinoSection = () => setIsCasinoSectionExpanded((prev) => !prev);

  const { trackEvent } = useIntercom();
  const { locale: currentLocale, asPath } = router;

  const setIsWalletModalOpen = useCallback(
    (opened: boolean) => {
      if (userData) {
        if (userData?.firstname && userData?.lastname && userData?.address?.city && userData?.gender)
          dispatch(toggleWalletModal(opened));
        else dispatch(setIsIncompleteProfileModalOpen(true));
      }
    },
    [dispatch, userData],
  );

  const handleWallet = () => {
    if (!isLogged) {
      openRegisterModal();
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const openRegisterModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));
  }, [dispatch]);

  const openLoginModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Login));
  }, [dispatch]);

  return (
    <StickySidebar offsetTop={0} offsetBottom={0} className="lateral-sticky-menu">
      <LateralMenuWrapper onClick={closeModal}>
        <LateralMenuContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeModal}>
            <IconClose color="white" />
          </CloseButton>
          <StyledLateralMenu>
            <LateralMenuItem>
              <Link href={routePaths.home}>
                <MenuItemContainer active={asPath === routePaths.home}>
                  <MenuIcon>
                    <IconHome size={18} />
                  </MenuIcon>
                  <FormattedMessage id="home" defaultMessage="Home" tagName="span" />
                </MenuItemContainer>
              </Link>
            </LateralMenuItem>
            <LateralMenuItem>
              <Link href={routePaths.promotions} prefetch>
                <MenuItemContainer active={asPath === routePaths.promotions}>
                  <MenuIcon>
                    <IconPromotion size={18} />
                  </MenuIcon>
                  <FormattedMessage id="promotions" defaultMessage="Promotions" tagName="span" />
                </MenuItemContainer>
              </Link>
            </LateralMenuItem>
            <Divider m="xxs" />
            {!isTabletOrPhone && (
              <>
                {isLogged && (
                  <LateralMenuItem data-mocked>
                    <Link href={routePaths.favorite}>
                      <MenuItemContainer active={asPath === routePaths.favorite}>
                        <MenuIcon>
                          <IconHeart size={18} />
                        </MenuIcon>
                        <FormattedMessage id="favourites" defaultMessage="Favourites" tagName="span" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                )}
                <LateralMenuItem data-mocked>
                  <Link href={`${routePaths.category}/recommanded`} prefetch>
                    <MenuItemContainer active={asPath === `${routePaths.category}/recommanded`}>
                      <MenuIcon>
                        <IconBitplayPicks size={18} />
                      </MenuIcon>
                      <FormattedMessage id="carousel.recommended" defaultMessage="Bitplay Picks" tagName="span" />
                    </MenuItemContainer>
                  </Link>
                </LateralMenuItem>
                <LateralMenuItem>
                  <Link href={`${routePaths.category}/slots`} prefetch>
                    <MenuItemContainer active={asPath === `${routePaths.category}/slots`}>
                      <MenuIcon>
                        <IconSlot size={18} />
                      </MenuIcon>
                      <FormattedMessage id="slots" defaultMessage="Slots" />
                    </MenuItemContainer>
                  </Link>
                </LateralMenuItem>
                <LateralMenuItem>
                  <Link href={`${routePaths.category}/livecasino`} prefetch>
                    <MenuItemContainer active={asPath === `${routePaths.category}/livecasino`}>
                      <MenuIcon>
                        <IconLive2 size={18} />
                      </MenuIcon>
                      <FormattedMessage id="liveCasino" defaultMessage="Live Casino" tagName="span" />
                    </MenuItemContainer>
                  </Link>
                </LateralMenuItem>
                <LateralMenuItem>
                  <Link href={`${routePaths.category}/gameshow`} prefetch>
                    <MenuItemContainer active={asPath === `${routePaths.category}/gameshow`}>
                      <MenuIcon>
                        <IconFlame size={18} />
                      </MenuIcon>
                      <FormattedMessage id="gamesShow" defaultMessage="Game Shows" tagName="span" />
                    </MenuItemContainer>
                  </Link>
                </LateralMenuItem>
                <LateralMenuItem>
                  <Link href={`${routePaths.category}/new`} prefetch>
                    <MenuItemContainer active={asPath === `${routePaths.category}/new`}>
                      <MenuIcon>
                        <IconNew size={18} />
                      </MenuIcon>
                      <FormattedMessage id="newReleases" defaultMessage="New Games" tagName="span" />
                    </MenuItemContainer>
                  </Link>
                </LateralMenuItem>
                <LateralMenuItem>
                  <Link href={`${routePaths.category}/buyinfeature`} prefetch>
                    <MenuItemContainer active={asPath === `${routePaths.category}/buyinfeature`}>
                      <MenuIcon>
                        <IconLightning size={18} />
                      </MenuIcon>
                      <FormattedMessage id="featuresBuyIn" defaultMessage="Bonus Buy" tagName="span" />
                    </MenuItemContainer>
                  </Link>
                </LateralMenuItem>
              </>
            )}
            {isTabletOrPhone && (
              <>
                <LateralMenuItem onClick={toggleCasinoSection}>
                  <MenuItemContainer active={false}>
                    <MenuIcon>
                      <IconCasino size={18} />
                    </MenuIcon>
                    <FormattedMessage id="casino" defaultMessage="Casino" tagName="span" />
                    {isCasinoSectionExpanded ? (
                      <IconChevronUp style={{ marginLeft: 5 }} />
                    ) : (
                      <IconChevronDown style={{ marginLeft: 5 }} />
                    )}
                  </MenuItemContainer>
                </LateralMenuItem>
                <ExpandedMenuContainer isExpanded={isCasinoSectionExpanded}>
                  {isLogged && (
                    <LateralMenuItem data-mocked>
                      <Link href={routePaths.favorite}>
                        <MenuItemContainer active={asPath === routePaths.favorite}>
                          <MenuIcon>
                            <IconHeart size={18} />
                          </MenuIcon>
                          <FormattedMessage id="favourites" defaultMessage="Favourites" tagName="span" />
                        </MenuItemContainer>
                      </Link>
                    </LateralMenuItem>
                  )}
                  <LateralMenuItem>
                    <Link href={`${routePaths.category}/recommanded`}>
                      <MenuItemContainer active={asPath === `${routePaths.category}/recommanded`}>
                        <MenuIcon>
                          <IconBitplayPicks size={18} />
                        </MenuIcon>
                        <FormattedMessage id="carousel.recommended" defaultMessage="Bitplay Picks" tagName="span" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                  <LateralMenuItem>
                    <Link href={`${routePaths.category}/slots`}>
                      <MenuItemContainer active={asPath === `${routePaths.category}/slots`}>
                        <MenuIcon>
                          <IconSlot size={18} />
                        </MenuIcon>
                        <FormattedMessage id="slots" defaultMessage="Slots" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                  <LateralMenuItem>
                    <Link href={`${routePaths.category}/livecasino`}>
                      <MenuItemContainer active={asPath === `${routePaths.category}/livecasino`}>
                        <MenuIcon>
                          <IconLive2 size={18} />
                        </MenuIcon>
                        <FormattedMessage id="liveCasino" defaultMessage="Live Casino" tagName="span" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                  <LateralMenuItem>
                    <Link href={`${routePaths.category}/gameshow`}>
                      <MenuItemContainer active={asPath === `${routePaths.category}/gameshow`}>
                        <MenuIcon>
                          <IconFlame size={18} />
                        </MenuIcon>
                        <FormattedMessage id="gamesShow" defaultMessage="Game Shows" tagName="span" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                  <LateralMenuItem>
                    <Link href={`${routePaths.category}/new`}>
                      <MenuItemContainer active={asPath === `${routePaths.category}/new`}>
                        <MenuIcon>
                          <IconNew size={18} />
                        </MenuIcon>
                        <FormattedMessage id="newReleases" defaultMessage="New Games" tagName="span" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                  <LateralMenuItem>
                    <Link href={`${routePaths.category}/buyinfeature`}>
                      <MenuItemContainer active={asPath === `${routePaths.category}/buyinfeature`}>
                        <MenuIcon>
                          <IconLightning size={18} />
                        </MenuIcon>
                        <FormattedMessage id="featuresBuyIn" defaultMessage="Bonus Buy" tagName="span" />
                      </MenuItemContainer>
                    </Link>
                  </LateralMenuItem>
                </ExpandedMenuContainer>
              </>
            )}

            <Divider m="xxs" />
            <LateralMenuItem onClick={handleWallet}>
              <MenuItemContainer active={false}>
                <MenuIcon>
                  <IconWallet size={18} />
                </MenuIcon>
                <FormattedMessage id="topBar.menuWallet" defaultMessage="Wallet" tagName="span" />
              </MenuItemContainer>
            </LateralMenuItem>

            <LateralMenuItem>
              <Link href={currentLocale === 'en' ? routePaths.vip.en : routePaths.vip.fr}>
                <MenuItemContainer active={asPath === (currentLocale === 'en' ? routePaths.vip.en : routePaths.vip.fr)}>
                  <MenuIcon>
                    <IconVIP3 size={18} />
                  </MenuIcon>

                  <FormattedMessage id="vipClub" defaultMessage="VIP Club" tagName="span" />
                </MenuItemContainer>
              </Link>
            </LateralMenuItem>

            <Divider m="xxs" />
            {isLogged ? (
              <LateralMenuItem>
                <Link href={`${routePaths.settings.account}`}>
                  <MenuItemContainer active={false}>
                    <MenuIcon>
                      <IconSettings size={18} />
                    </MenuIcon>
                    <FormattedMessage id="page.settings" defaultMessage="Settings" tagName="span" />
                  </MenuItemContainer>
                </Link>
              </LateralMenuItem>
            ) : (
              <LateralMenuItem onClick={openRegisterModal}>
                <MenuItemContainer active={false}>
                  <MenuIcon>
                    <IconSettings size={18} />
                  </MenuIcon>
                  <FormattedMessage id="page.settings" defaultMessage="Settings" tagName="span" />
                </MenuItemContainer>
              </LateralMenuItem>
            )}
            {isLogged && (
              <LateralMenuItem onClick={() => logout(trackEvent, isTabletOrPhone ? 'MOBILE' : 'DESKTOP')}>
                <MenuItemContainer active={false}>
                  <MenuIcon>
                    <IconLogout size={18} />
                  </MenuIcon>
                  <FormattedMessage id="topBar.menuLogout" defaultMessage="Logout" tagName="span" />
                </MenuItemContainer>
              </LateralMenuItem>
            )}
            {!isLogged && (
              <LateralMenuItem onClick={openLoginModal}>
                <MenuItemContainer active={false}>
                  <MenuIcon>
                    <IconLogout size={18} />
                  </MenuIcon>
                  <FormattedMessage id="topBar.login" defaultMessage="Login" tagName="span" />
                </MenuItemContainer>
              </LateralMenuItem>
            )}
          </StyledLateralMenu>
        </LateralMenuContainer>
      </LateralMenuWrapper>
    </StickySidebar>
  );
};
