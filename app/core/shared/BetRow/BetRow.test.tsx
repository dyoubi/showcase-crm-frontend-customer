import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import { theme } from '@/themes/main';

import { BetRow, Props } from './BetRow';

jest.mock('@/core/hooks/useTheme', () => ({
  useTheme: jest.fn(() => ({
    rebrandingColors: {
      palette: {
        light: { 40: '#A0A0A0' },
        green: { 20: '#00FF00' },
      },
    },
  })),
}));

const renderComponent = (props: Partial<Props> = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <IntlProvider locale="en">
        <table>
          <tbody>
            <BetRow
              username="TestUser"
              amountBet="100"
              multiplier="2.5"
              amountWon="250"
              machineTitle="Lucky Spin"
              date="2024-03-28"
              coin="BTC"
              onRowClick={jest.fn()}
              onUsernameClick={jest.fn()}
              {...props}
            />
          </tbody>
        </table>
      </IntlProvider>
    </ThemeProvider>,
  );
};

describe('BetRow Component', () => {
  it('renders the bet details correctly', () => {
    renderComponent();

    expect(screen.getByText('Lucky Spin')).toBeInTheDocument();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('2.50X')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
  });

  it('calls onRowClick when clicked', () => {
    const onRowClick = jest.fn();

    renderComponent({ onRowClick });

    fireEvent.click(screen.getByRole('row'));
    expect(onRowClick).toHaveBeenCalled();
  });

  it('calls onUsernameClick when username is clicked', () => {
    const onUsernameClick = jest.fn();

    renderComponent({ onUsernameClick });

    fireEvent.click(screen.getByText('TestUser'));
    expect(onUsernameClick).toHaveBeenCalled();
  });
});
