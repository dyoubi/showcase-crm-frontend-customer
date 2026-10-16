import { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { setLoginRegisterModalActiveTab, toggleLoginRegisterModal } from '@/core/store/metaSlice';
import { useAppDispatch } from '@/core/store/store';
import { DATA_TEST_IDS } from '@/core/constants/constants';
import { ButtonColor } from '@/core/shared/Button/Button.types';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';
import { LoginModal } from '@/features/Auth/components/LoginModal';

import { Logo } from '../Logo';
import { NavigationProgressBar, TopMenuContainer } from './TopMenu.styles';
import { TopMenuProps } from './TopMenu.types';
import { TopMenuActions } from './TopMenuActions/TopMenuActions';
import { PreAuthContainer, StyledButton } from './TopMenuActions/TopMenuActions.styles';

export const TopMenu: FC<TopMenuProps> = ({ children, isLogged, ...props }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [navigationProgress, setNavigationProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run navigation progress on client side
    if (!isClient) return;

    let progressInterval: NodeJS.Timeout;

    const handleRouteChangeStart = () => {
      setNavigationProgress(0);
      progressInterval = setInterval(() => {
        setNavigationProgress((prev) => {
          if (prev >= 90) {
            return prev;
          }

          return prev + Math.random() * 10;
        });
      }, 100);
    };

    const handleRouteChangeComplete = () => {
      setNavigationProgress(100);
      setTimeout(() => {
        setNavigationProgress(0);
      }, 300);

      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };

    const handleRouteChangeError = () => {
      setNavigationProgress(0);

      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);

      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [router.events, isClient]);

  const openLoginModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Login));
  }, [dispatch]);

  const openRegisterModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));
  }, [dispatch]);

  return (
    <TopMenuContainer {...props}>
      <Link style={{ display: 'flex', flex: 1 }} href="/">
        <Logo />
      </Link>

      {isLogged ? (
        <TopMenuActions />
      ) : (
        <>
          <PreAuthContainer>
            <StyledButton onClick={openRegisterModal} color={ButtonColor.Primary}>
              <FormattedMessage id="topBar.register" defaultMessage="Register" />
            </StyledButton>
            <StyledButton onClick={openLoginModal} color={ButtonColor.Secondary} data-testid={DATA_TEST_IDS.LOGIN_BTN}>
              <FormattedMessage id="topBar.login" defaultMessage="Login" />
            </StyledButton>
          </PreAuthContainer>
          <LoginModal />
        </>
      )}
      <NavigationProgressBar progress={navigationProgress} />
    </TopMenuContainer>
  );
};
