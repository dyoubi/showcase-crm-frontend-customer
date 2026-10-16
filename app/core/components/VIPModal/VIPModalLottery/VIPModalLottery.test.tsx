import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { VIPModalLottery } from './VIPModalLottery';

const renderComponent = () => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <VIPModalLottery />
      </ThemeProvider>
    </IntlProvider>,
  );
};

describe('VIPModalLottery', () => {
  it('renders the lottery heading correctly', () => {
    renderComponent();

    // Check if the heading "$10,000 Monthly Lottery" is rendered
    const heading = screen.getByRole('heading', { name: '$10,000 Monthly Lottery' });

    expect(heading).toBeInTheDocument();
  });

  it('renders the lottery copy explaining the rules', () => {
    renderComponent();

    // Check if the lottery description is rendered correctly
    const lotteryCopy = screen.getByText(
      /Wager to earn tickets into a giveaway where anybody can win\. Just one ticket could see you sharing in \$10,000 every months\./,
    );

    expect(lotteryCopy).toBeInTheDocument();
  });

  it('renders the number of tickets correctly', () => {
    renderComponent();

    // Check if the ticket count (5) is displayed in the correct text
    const ticketText = screen.getByText('Your number of tickets: 5');

    expect(ticketText).toBeInTheDocument();
  });

  it('renders bold text within the footer correctly', () => {
    renderComponent();

    const boldText = screen.getByText('official announcement');

    expect(boldText).toHaveStyle('font-weight: bold');
  });
});
