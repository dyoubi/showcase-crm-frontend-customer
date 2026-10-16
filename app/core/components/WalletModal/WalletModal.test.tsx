import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { WalletModal } from './WalletModal';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

// Mocking WalletModalDeposit and WalletModalWithdraw
jest.mock('./WalletModalDeposit/WalletModalDeposit', () => ({
  WalletModalDeposit: jest.fn(() => <div>Mocked WalletModalDeposit</div>),
}));

jest.mock('./WalletModalWithdraw/WalletModalWithdraw', () => ({
  WalletModalWithdraw: jest.fn(() => <div>Mocked WalletModalWithdraw</div>),
}));

// Helper function to render the component
const renderComponent = (isOpen: boolean, setIsOpen: (open: boolean) => void) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <WalletModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </ThemeProvider>
    </IntlProvider>,
  );
};

describe('WalletModal', () => {
  it('renders the modal when isOpen is true', () => {
    const setIsOpen = jest.fn();

    renderComponent(true, setIsOpen);

    // Check if the modal is rendered with the header text
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(screen.getByText('Deposit')).toBeInTheDocument();
    expect(screen.getByText('Withdraw')).toBeInTheDocument();
  });

  it('renders the WalletModalDeposit component when Deposit tab is selected', () => {
    const setIsOpen = jest.fn();

    renderComponent(true, setIsOpen);

    // Select the Deposit tab
    fireEvent.click(screen.getByText('Deposit'));

    // Check if the WalletModalDeposit component is rendered
    expect(screen.getByText('Mocked WalletModalDeposit')).toBeInTheDocument(); // Ensure the Deposit text is there
    expect(screen.queryByText('Mocked WalletModalWithdraw')).not.toBeInTheDocument(); // Ensure Withdraw text is not visible
  });

  it('renders the WalletModalWithdraw component when Withdraw tab is selected', () => {
    const setIsOpen = jest.fn();

    renderComponent(true, setIsOpen);

    // Select the Withdraw tab
    fireEvent.click(screen.getByText('Withdraw'));

    // Check if the WalletModalWithdraw component is rendered
    expect(screen.getByText('Mocked WalletModalWithdraw')).toBeInTheDocument(); // Ensure Withdraw text is there
    expect(screen.queryByText('Mocked WalletModalDeposit')).not.toBeInTheDocument(); // Ensure Deposit text is not visible
  });

  it('closes the modal when isOpen is false', () => {
    const setIsOpen = jest.fn();

    renderComponent(false, setIsOpen);

    // The modal should not be in the document when isOpen is false
    expect(screen.queryByText('Wallet')).not.toBeInTheDocument();
  });

  it('renders the correct header and tab labels', () => {
    const setIsOpen = jest.fn();

    renderComponent(true, setIsOpen);

    // Ensure the modal header is correctly rendered
    expect(screen.getByText('Wallet')).toBeInTheDocument();

    // Ensure the tab labels are rendered correctly
    expect(screen.getByText('Deposit')).toBeInTheDocument();
    expect(screen.getByText('Withdraw')).toBeInTheDocument();
  });
});
