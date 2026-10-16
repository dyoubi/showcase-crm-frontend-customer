import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { useSession } from 'next-auth/react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

import { useGetBetsQuery } from '@/core/domains/bet/betSlice';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { GameResponse } from '@/core/domains/bet';

import { theme } from '@/themes/main';

import { BetModes } from './BetsTable.types';
import { BetsTable } from './BetsTable';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/core/hooks/useIsLogged', () => ({
  useIsLogged: jest.fn(),
}));

jest.mock('@/core/domains/bet/betSlice', () => ({
  useGetBetsQuery: jest.fn(),
}));

jest.mock('@/core/hooks/useBreakpoints', () => ({
  useBreakpoints: jest.fn(() => ({ isTabletOrPhone: false })),
}));

jest.mock('@/core/hooks/useDisplayPrice', () => ({
  useDisplayPrice: () => ({
    formatCryptoPrice: jest.fn(({ amount, cryptoCode }) => `${amount} ${cryptoCode}`),
  }),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(), // Make sure to mock useRouter directly
}));

jest.mock('@/core/components/BetModal', () => ({
  BetModal: ({ bet, isOpen, setIsOpen }: any) => {
    if (!isOpen) return null;

    return (
      <div data-testid="bet-modal">
        <p>{bet.id}</p>
        <button onClick={() => setIsOpen(false)} type="button">
          Close
        </button>
      </div>
    );
  },
}));
beforeEach(() => {
  jest.clearAllMocks();
  (useSession as jest.Mock).mockReturnValue({ data: { accessToken: 'mockToken' } });
  (useIsLogged as jest.Mock).mockReturnValue(true);
  (useRouter as jest.Mock).mockReturnValue({
    locale: 'en',
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  });
  (useGetBetsQuery as jest.Mock).mockReturnValue({
    data: [
      {
        player: { nickname: 'TestUser' },
        action: {
          amount: '100',
          coin: 'ETH',
          multiplier: 2.5,
          payout: '250',
          timestamp: '2024-03-31T12:00:00Z',
        },
        machine: { title: 'Poker Game' },
      },
    ],
    error: null,
    isLoading: false,
  });
});

describe('BetsTable Integration Test', () => {
  it('should display a message when user is not logged in', () => {
    (useIsLogged as jest.Mock).mockReturnValue(false);

    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <BetsTable selectedMode={BetModes.MY_BETS} />
        </ThemeProvider>
      </IntlProvider>,
    );

    expect(screen.getByText(/You must log in to view your bet history/i)).toBeInTheDocument();
  });

  it('should render empty state when there are no bets', () => {
    (useGetBetsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });

    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <BetsTable selectedMode={BetModes.MY_BETS} />
        </ThemeProvider>
      </IntlProvider>,
    );

    expect(screen.getByText(/No results for bets history/i)).toBeInTheDocument();
  });

  it('should render user game actions table', () => {
    const mockUserGameActions: Array<GameResponse> = [
      {
        id: 'game123',
        finished: false,
        inGameCurrency: 'USD',
        balanceCurrency: 'BTC',
        actions: [
          {
            id: 'action123',
            createdAt: '2024-03-30T12:00:00Z',
            createdBy: 'user1',
            updatedAt: '2024-03-30T12:05:00Z',
            updatedBy: 'user1',
            externalId: 'ext123',
            type: 'bet',
            state: 'pending',
            amount: 100,
            data: {
              action: 'bet',
              amount: 100,
              action_id: 'action123',
            },
            balanceBefore: 500,
            balanceAfter: 400,
            gameId: 'game123',
            operation: {
              id: 'op123',
              createdAt: '2024-03-30T12:00:00Z',
              createdBy: 'user1',
              updatedAt: '2024-03-30T12:01:00Z',
              updatedBy: 'user1',
              reference: 'ref123',
              value: '-100',
              coin: 'BTC',
              type: 1,
              category: 'bet',
              lookup: 'lookup123',
              externalId: 'extOp123',
              balanceId: 'balance123',
              accountId: 'account123',
            },
          },
        ],
        machine: {
          key: 'slot_machine_01',
          id: 'machine123',
          title: 'Slot Machine',
        },
        machineId: 'machine123',
        payout: 1000,
      },
    ];

    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <BetsTable selectedMode={BetModes.MY_BETS} userGameActions={mockUserGameActions} />
        </ThemeProvider>
      </IntlProvider>,
    );

    expect(screen.getByText('Slot Machine')).toBeInTheDocument();
    expect(screen.getByText('100 BTC')).toBeInTheDocument();
  });

  it('should render live bets table', async () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <BetsTable selectedMode={BetModes.MY_BETS} />
        </ThemeProvider>
      </IntlProvider>,
    );

    expect(screen.getByText(/Poker Game/i)).toBeInTheDocument();
    expect(screen.getByText('100 ETH')).toBeInTheDocument();
    expect(screen.getByText('2.50X')).toBeInTheDocument();
  });

  it('should open BetModal when a bet row is clicked', async () => {
    (useGetBetsQuery as jest.Mock).mockReturnValue({
      data: [
        {
          player: { nickname: 'TestUser' },
          action: {
            amount: '100',
            coin: 'ETH',
            multiplier: 2.5,
            payout: '250',
            timestamp: '2024-03-31T12:00:00Z',
            data: { id: 'bet123' },
          },
          machine: { title: 'Poker Game' },
        },
      ],
      error: null,
      isLoading: false,
    });

    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <BetsTable selectedMode={BetModes.MY_BETS} />
        </ThemeProvider>
      </IntlProvider>,
    );

    const betRow = screen.getByText('Poker Game');

    fireEvent.click(betRow);

    await waitFor(() => {
      expect(screen.getByTestId('bet-modal')).toBeInTheDocument();
    });
  });

  it('should close BetModal when close button is clicked', async () => {
    (useGetBetsQuery as jest.Mock).mockReturnValue({
      data: [
        {
          player: { nickname: 'TestUser' },
          action: {
            amount: '100',
            coin: 'ETH',
            multiplier: 2.5,
            payout: '250',
            timestamp: '2024-03-31T12:00:00Z',
            data: { id: 'bet123' },
          },
          machine: { title: 'Poker Game' },
        },
      ],
      error: null,
      isLoading: false,
    });

    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <BetsTable selectedMode={BetModes.MY_BETS} />
        </ThemeProvider>
      </IntlProvider>,
    );

    const betRow = screen.getByText('Poker Game');

    fireEvent.click(betRow);

    await waitFor(() => {
      expect(screen.getByTestId('bet-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close');

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('bet-modal')).not.toBeInTheDocument();
    });
  });
});
