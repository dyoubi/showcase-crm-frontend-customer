import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { FiatIcon } from './FiatIcon';

describe('FiatIcon Component', () => {
  it('renders the Euro icon when symbol is EUR', () => {
    render(
      <ThemeProvider theme={theme}>
        <FiatIcon code="EUR" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('euro-icon')).toBeInTheDocument();
  });

  it('renders the Dollar icon when symbol is USD', () => {
    render(
      <ThemeProvider theme={theme}>
        <FiatIcon code="USD" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('dollar-icon')).toBeInTheDocument();
  });

  it('returns null when no symbol is provided', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <FiatIcon />
      </ThemeProvider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
