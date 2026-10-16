/* eslint-disable react/require-default-props */
// auto-mock this as the SessionProvider will throw errors otherwise
import 'mocks/next-auth/react';

import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createNextState } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';
import { Session as SessionType } from 'next-auth';
import { render, RenderOptions } from '@testing-library/react';

import { createStore, createStoreWithPreloadedState, RootState } from '@/core/store/store';
import { Nullable } from '@/core/interfaces/common';

import { theme as defaultTheme } from '@/themes/main';

type Props = {
  children?: ReactNode;
};

type MergeStateFunction = (current: RootState) => RootState | void;
type ProviderValues = {
  theme?: typeof defaultTheme;
  session?: Nullable<SessionType>;
  storeState?: MergeStateFunction;
};

const defaultProviderValues: Required<ProviderValues> = {
  session: null,
  storeState: (state) => state,
  theme: defaultTheme,
};

const getStoreState = (storeState: MergeStateFunction, initialState = createStore().getState()) =>
  createNextState(initialState, (draft: RootState) => storeState(draft));

const getProviders =
  (values?: ProviderValues) =>
  ({ children }: Props) => {
    const storeState = values?.storeState ?? defaultProviderValues.storeState;
    const store = createStoreWithPreloadedState(getStoreState(storeState));

    return (
      <Provider store={store}>
        <ThemeProvider theme={values?.theme ?? defaultProviderValues.theme}>
          <SessionProvider session={values?.session ?? defaultProviderValues.session}>{children}</SessionProvider>
        </ThemeProvider>
      </Provider>
    );
  };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>, providerValues?: ProviderValues) =>
  render(ui, {
    wrapper: getProviders(providerValues),
    ...options,
  });

export * from '@testing-library/dom';
export { customRender as render };
