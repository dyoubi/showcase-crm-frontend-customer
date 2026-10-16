import { FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Box } from '@/core/shared/Box';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import {
  selectLoginRegisterModalOptions,
  setIsOpenLoginRegisterModal,
  setLoginRegisterModalActiveTab,
  toggleLoginRegisterModal,
} from '@/core/store/metaSlice';
import { Toggle } from '@/core/shared/Toggle/Toggle';

import { StyledModal, TabContainer } from './LoginModal.styles';
import { LoginModalTab } from './LoginModal.types';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgetPasswordForm } from '../ForgetPasswordForm';

export const LoginModal: FC = () => {
  const dispatch = useAppDispatch();
  const modalOptions = useAppSelector(selectLoginRegisterModalOptions);
  const { formatMessage } = useIntl();

  const toggleLabels = [
    formatMessage({
      id: 'loginModal.login',
      defaultMessage: 'Login',
    }),
    formatMessage({
      id: 'loginModal.register',
      defaultMessage: 'Register',
    }),
  ];

  const activeTabIndex = useMemo(() => {
    return modalOptions.activeTab === LoginModalTab.Login ? 0 : 1;
  }, [modalOptions.activeTab]);

  const toggleModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
  }, [dispatch]);

  const setIsOpenModal = useCallback(
    (payload: any) => {
      dispatch(setIsOpenLoginRegisterModal(payload));
    },
    [dispatch],
  );
  const toggleModals = (selectedIndex: number) => {
    if (selectedIndex === 0) {
      dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Login));
    } else {
      dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));
    }
  };

  const openForgottenPasswordTab = useCallback(() => {
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.ForgetPassword));
  }, [dispatch]);

  return (
    <StyledModal
      fullWidth
      header={
        <TabContainer>
          <Toggle labels={toggleLabels} activeIndex={activeTabIndex} onSelect={toggleModals} />
        </TabContainer>
      }
      isOpen={modalOptions.isModalOpen}
      setIsOpen={setIsOpenModal}
      className="login-modal"
    >
      <Box mt="l">
        {modalOptions.activeTab === LoginModalTab.Login && (
          <LoginForm setIsModalOpen={toggleModal} onPasswordForgottenClick={openForgottenPasswordTab} />
        )}
        {modalOptions.activeTab === LoginModalTab.Register && <RegisterForm setIsModalOpen={toggleModal} />}
        {modalOptions.activeTab === LoginModalTab.ForgetPassword && <ForgetPasswordForm setIsModalOpen={toggleModal} />}
      </Box>
    </StyledModal>
  );
};
