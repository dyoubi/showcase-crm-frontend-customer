/* eslint-disable import/no-import-module-exports */
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import { apiSlice } from '@/core/store/apiSlice';
import { rootReducer } from '@/core/store/rootReducer';
import { config } from '@/core/config';

const storeConfig = {
  devTools: config.nodeEnv === 'development',
  reducer: rootReducer,
  middleware: (gDM: CurriedGetDefaultMiddleware) => gDM().concat(apiSlice.middleware),
};

export const createStore = () => configureStore(storeConfig);
export const createStoreWithPreloadedState = (preloadedState: RootState) =>
  configureStore({
    ...storeConfig,
    preloadedState,
  });

const store = createStore();

export type StoreType = typeof store;

export const makeStore = () => store;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
