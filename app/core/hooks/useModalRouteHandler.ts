import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  setIsIncompleteProfileModalOpen,
  setLoginRegisterModalActiveTab,
  toggleLoginRegisterModal,
  toggleUserProfileModal,
  toggleVIPModal,
  toggleWalletModal,
} from '@/core/store/metaSlice';
import { useAppDispatch } from '@/core/store/store';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { useGetPlayerQuery } from '@/core/domains/player';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';

export function useModalRouteHandler() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useIsLogged();
  const router = useRouter();

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!router.query.modal) return;
    const modalType = router.query.modal as string;

    if (modalType === 'deposit' && (isLoading || isFetching)) return;

    router.replace('/', undefined, { shallow: true });

    if (modalType === 'login') {
      dispatch(toggleLoginRegisterModal());
      dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Login));

      return;
    }

    if (modalType === 'register') {
      dispatch(toggleLoginRegisterModal());
      dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));

      return;
    }

    if (isLoggedIn) {
      switch (modalType) {
        case 'profile':
          dispatch(toggleUserProfileModal());
          break;
        case 'vip':
          dispatch(toggleVIPModal());
          break;
        case 'deposit': {
          const hasCompleteProfile =
            userData?.firstname && userData?.lastname && userData?.address?.city && userData?.gender;

          if (hasCompleteProfile) {
            dispatch(toggleWalletModal());
          } else {
            dispatch(setIsIncompleteProfileModalOpen(true));
          }
          break;
        }
        default:
          break;
      }

      return;
    }
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Login));
  }, [router.query.modal, isLoggedIn, userData, dispatch, router]);
}
