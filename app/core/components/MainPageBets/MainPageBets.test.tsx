import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

import { useIsLogged } from '@/core/hooks/useIsLogged';
import { rootReducer } from '@/core/store/rootReducer';

import { theme } from '@/themes/main';

import { MainPageBets } from './MainPageBets';
import { BetsTable } from '../BetsTable';

jest.mock('@/core/hooks/useIsLogged', () => ({
  useIsLogged: jest.fn(),
}));
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));
jest.mock('@/core/components/BetsTable', () => ({
  BetsTable: jest.fn(() => <div data-testid="bets-table" />),
}));

describe('MainPageBets', () => {
  const renderComponent = (isLogged = false) => {
    (useIsLogged as jest.Mock).mockReturnValue(isLogged);

    return render(
      <Provider store={configureStore({ reducer: rootReducer })}>
        <SessionProvider session={null}>
          <IntlProvider locale="en" messages={{ 'betsTable.noLogged': 'You must log in to view your bet history.' }}>
            <ThemeProvider theme={theme}>
              <MainPageBets />
            </ThemeProvider>
          </IntlProvider>
        </SessionProvider>
      </Provider>,
    );
  };

  it('renders toggle and default table', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /all bets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my bets/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /my bets/i }));

    expect(screen.getByText(/you must log in to view your bet history/i)).toBeInTheDocument();
  });

  it('displays bet table when logged in', () => {
    renderComponent(true);
    expect(screen.getByTestId('bets-table')).toBeInTheDocument();
  });

  it('toggles bet modes correctly', () => {
    renderComponent(true);

    fireEvent.click(screen.getByRole('button', { name: /my bets/i }));

    expect(BetsTable).toHaveBeenCalledWith(expect.objectContaining({ selectedMode: 'MY_BETS' }), expect.anything());
  });
});
