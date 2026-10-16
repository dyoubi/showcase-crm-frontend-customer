import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import { useAppCookies } from '@/core/hooks/useAppCookies';
import { useGetPlayerBalancesQuery } from '@/core/domains/balance';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useAppSelector } from '@/core/store/store';

import { theme } from '@/themes/main';

import { TopMenuWallet } from './TopMenuWallet';

// Mock dependencies
jest.mock('@/core/hooks/useAppCookies', () => ({
  useAppCookies: jest.fn(),
}));

jest.mock('@/core/domains/balance', () => ({
  useGetPlayerBalancesQuery: jest.fn(),
}));

jest.mock('@/core/hooks/useDisplayPrice', () => ({
  useDisplayPrice: jest.fn(),
}));

jest.mock('@/core/store/store', () => ({
  useAppSelector: jest.fn(),
}));

const mockSetCookie = jest.fn();
const mockRefetch = jest.fn();
const mockToggleWalletModalOpen = jest.fn();

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

const renderComponent = (component: React.ReactNode) =>
  render(
    <IntlProvider locale="en" messages={{}}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );

describe('TopMenuWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const userBalancesMock = [
    { coin: 'BTC', value: 1.5 },
    { coin: 'ETH', value: 3.2 },
  ];

  const mockUserBalancesQuery = {
    data: userBalancesMock,
    isLoading: false,
    refetch: mockRefetch,
  };

  const mockFormatCryptoPrice = jest.fn(({ amount, cryptoCode }) => `${amount} ${cryptoCode}`);

  it('renders balance and dropdown menu', async () => {
    (useAppCookies as jest.Mock).mockReturnValue({
      cookies: { activeBalance: 'BTC', displayInFiat: false },
      setCookie: mockSetCookie,
    });
    (useGetPlayerBalancesQuery as jest.Mock).mockReturnValue(mockUserBalancesQuery);
    (useDisplayPrice as jest.Mock).mockReturnValue({ formatCryptoPrice: mockFormatCryptoPrice });
    (useAppSelector as jest.Mock).mockReturnValue(false); // Not in-game

    renderComponent(<TopMenuWallet toggleWalletModalOpen={mockToggleWalletModalOpen} />);

    fireEvent.click(screen.getByTestId('dropdown-button'));
    expect(screen.getAllByText('1.5 BTC')).toHaveLength(2);
    expect(screen.getByText('3.2 ETH')).toBeInTheDocument();
  });

  it('opens FiatModal when clicking Display in Fiat button', async () => {
    (useAppCookies as jest.Mock).mockReturnValue({
      cookies: { displayInFiat: false },
      setCookie: mockSetCookie,
    });
    (useGetPlayerBalancesQuery as jest.Mock).mockReturnValue(mockUserBalancesQuery);
    (useDisplayPrice as jest.Mock).mockReturnValue({ formatCryptoPrice: mockFormatCryptoPrice });
    (useAppSelector as jest.Mock).mockReturnValue(false); // Not in-game

    renderComponent(<TopMenuWallet toggleWalletModalOpen={mockToggleWalletModalOpen} />);

    // Open dropdown
    fireEvent.click(screen.getByTestId('dropdown-button'));

    // Click "Display in Fiat"
    fireEvent.click(screen.getByText('Display in Fiat'));

    // Verify that the modal is open
    expect(screen.getByText('Please note that these are currency approximations.')).toBeInTheDocument();
  });

  it('should set active balance when clicking a currency', async () => {
    (useAppCookies as jest.Mock).mockReturnValue({
      cookies: { activeBalance: 'BTC', displayInFiat: false },
      setCookie: mockSetCookie,
    });
    (useGetPlayerBalancesQuery as jest.Mock).mockReturnValue(mockUserBalancesQuery);
    (useDisplayPrice as jest.Mock).mockReturnValue({ formatCryptoPrice: mockFormatCryptoPrice });
    (useAppSelector as jest.Mock).mockReturnValue(false); // Not in-game

    renderComponent(<TopMenuWallet toggleWalletModalOpen={mockToggleWalletModalOpen} />);

    // Open dropdown
    fireEvent.click(screen.getByTestId('dropdown-button'));

    // Click on ETH balance
    fireEvent.click(screen.getByText('3.2 ETH'));

    // Verify that setCookie was called to set active balance to ETH
    expect(mockSetCookie).toHaveBeenCalledWith('settings.activeBalance', 'ETH');
  });

  it('should display "Loading" when balance is being fetched', async () => {
    (useAppCookies as jest.Mock).mockReturnValue({
      cookies: { activeBalance: 'BTC', displayInFiat: false },
      setCookie: mockSetCookie,
    });
    (useGetPlayerBalancesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: mockRefetch,
    });
    (useDisplayPrice as jest.Mock).mockReturnValue({ formatCryptoPrice: mockFormatCryptoPrice });
    (useAppSelector as jest.Mock).mockReturnValue(false); // Not in-game

    renderComponent(<TopMenuWallet toggleWalletModalOpen={mockToggleWalletModalOpen} />);

    expect(screen.getByText(/^Loading/)).toBeInTheDocument();
  });

  it('should show "In Game" when the user is in a game', async () => {
    (useAppCookies as jest.Mock).mockReturnValue({
      cookies: { activeBalance: 'BTC', displayInFiat: false },
      setCookie: mockSetCookie,
    });
    (useGetPlayerBalancesQuery as jest.Mock).mockReturnValue(mockUserBalancesQuery);
    (useDisplayPrice as jest.Mock).mockReturnValue({ formatCryptoPrice: mockFormatCryptoPrice });
    (useAppSelector as jest.Mock).mockReturnValue(true); // In-game

    renderComponent(<TopMenuWallet toggleWalletModalOpen={mockToggleWalletModalOpen} />);

    expect(screen.getByText('In Game')).toBeInTheDocument();
  });
});
