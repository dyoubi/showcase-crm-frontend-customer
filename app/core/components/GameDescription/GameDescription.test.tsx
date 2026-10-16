import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { DATA_TEST_IDS } from '@/core/constants/constants';

import { theme } from '@/themes/main';

import { GameDescription } from './GameDescription';

const renderWithThemeAndIntl = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en" messages={{}}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('GameDescription', () => {
  const mockDescription = 'This is a test game description.';

  it('renders menu buttons correctly', () => {
    renderWithThemeAndIntl(<GameDescription description={mockDescription} />);

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('displays correct description when "Description" tab is active', () => {
    renderWithThemeAndIntl(<GameDescription description={mockDescription} />);

    expect(screen.getByTestId(DATA_TEST_IDS.GAME_DETAILS_DESCRIPTION)).toHaveTextContent(mockDescription);
  });
});
