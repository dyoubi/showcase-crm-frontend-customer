import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom';

import { AvailableFiatCodes, FiatCodes } from '@/core/domains/currency';

import { theme } from '@/themes/main';

import { FiatModal, WalletModalFIATProps } from './FiatModal';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));
const renderWithThemeAndIntl = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en" messages={{}}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('FiatModal', () => {
  const mockProps: WalletModalFIATProps = {
    isOpen: true,
    setIsOpen: jest.fn(),
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with the correct content', () => {
    renderWithThemeAndIntl(<FiatModal {...mockProps} />);

    // Check if the modal is rendered
    expect(screen.getByText('Please note that these are currency approximations.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'All bets & transactions will be settled in the crypto equivalent. For further details feel free to contact our live support.',
      ),
    ).toBeInTheDocument();

    // Check if the radio group is rendered with the correct options
    AvailableFiatCodes.forEach((currency) => {
      expect(screen.getByLabelText(currency.toUpperCase())).toBeInTheDocument();
    });

    // Check if the save button is rendered
    expect(screen.getByText('Play now')).toBeInTheDocument();
  });

  it('calls onChange with the selected currency when the save button is clicked', () => {
    renderWithThemeAndIntl(<FiatModal {...mockProps} />);

    // Select a currency
    const currencyOption = screen.getByLabelText(AvailableFiatCodes[0].toUpperCase());

    fireEvent.click(currencyOption);

    // Click the save button
    const saveButton = screen.getByText('Play now');

    fireEvent.click(saveButton);

    // Check if onChange is called with the selected currency
    expect(mockProps.onChange).toHaveBeenCalledWith(AvailableFiatCodes[0] as FiatCodes);
  });
});
