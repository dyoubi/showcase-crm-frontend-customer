import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '@/core/store/store';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';

import { BonusAssignation } from '../domains/bonus';
import { EInGameFiatCodes, InGameFiatCodes } from '../domains/currency';

interface MetaState {
  isAppHydrated: boolean;
  isIncompleteProfileModalOpen: boolean;
  isUserProfileModalOpen: boolean;
  isVIPModalOpen: boolean;
  toggleUserNotActivatedNotification: boolean;
  playIn: InGameFiatCodes;
  loginRegisterModalOptions: {
    isModalOpen: boolean;
    activeTab: LoginModalTab;
  };
  isWalletModalOpen: boolean;
  activeReloadBonus: BonusAssignation | null;
}

const initialState: MetaState = {
  isAppHydrated: false,
  playIn: EInGameFiatCodes.EUR,
  isIncompleteProfileModalOpen: false,
  isUserProfileModalOpen: false,
  isVIPModalOpen: false,
  toggleUserNotActivatedNotification: false,
  loginRegisterModalOptions: {
    isModalOpen: false,
    activeTab: LoginModalTab.Login,
  },
  isWalletModalOpen: false,
  activeReloadBonus: null,
};

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setIsIncompleteProfileModalOpen(state, action) {
      state.isIncompleteProfileModalOpen = action.payload;
    },
    toggleUserProfileModal(state) {
      state.isUserProfileModalOpen = !state.isUserProfileModalOpen;
    },
    toggleVIPModal(state) {
      state.isVIPModalOpen = !state.isVIPModalOpen;
    },
    toggleUserNotActivatedNotification(state, action: PayloadAction<boolean | undefined>) {
      state.toggleUserNotActivatedNotification = action?.payload ?? !state.toggleUserNotActivatedNotification;
    },
    toggleLoginRegisterModal(state) {
      state.loginRegisterModalOptions.isModalOpen = !state.loginRegisterModalOptions.isModalOpen;
    },
    toggleWalletModal(state, action: PayloadAction<boolean | undefined>) {
      state.isWalletModalOpen = action?.payload ?? !state.isWalletModalOpen;
    },
    setIsOpenLoginRegisterModal(state, action) {
      state.loginRegisterModalOptions.isModalOpen = action.payload;
    },
    setLoginRegisterModalActiveTab(state, action) {
      state.loginRegisterModalOptions.activeTab = action.payload;
    },
    setPlayIn(state, action: PayloadAction<InGameFiatCodes>) {
      state.playIn = action.payload;
    },
    setActiveReloadBonus(state, action) {
      state.activeReloadBonus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      state.isAppHydrated = true;
    });
  },
});

export const {
  setIsIncompleteProfileModalOpen,
  toggleUserProfileModal,
  toggleVIPModal,
  toggleUserNotActivatedNotification,
  toggleLoginRegisterModal,
  setIsOpenLoginRegisterModal,
  setLoginRegisterModalActiveTab,
  setPlayIn,
  toggleWalletModal,
  setActiveReloadBonus,
} = metaSlice.actions;

const metaSelector = (state: RootState): MetaState => state.meta;

export const selectIsIncompleteProfileModalOpen = createSelector(
  metaSelector,
  (state) => state.isIncompleteProfileModalOpen,
);
export const selectIsUserProfileModalOpen = createSelector(metaSelector, (state) => state.isUserProfileModalOpen);
export const selectIsVIPModalOpen = createSelector(metaSelector, (state) => state.isVIPModalOpen);
export const selectIsUserNotActivatedNotification = createSelector(
  metaSelector,
  (state) => state.toggleUserNotActivatedNotification,
);
export const selectLoginRegisterModalOptions = createSelector(metaSelector, (state) => state.loginRegisterModalOptions);
export const selectPlayIn = createSelector(metaSelector, (state) => state.playIn);
export const selectIsWalletModalOpen = createSelector(metaSelector, (state) => state.isWalletModalOpen);
export const selectActiveReloadBonus = createSelector(metaSelector, (state) => state.activeReloadBonus);
export default metaSlice.reducer;
