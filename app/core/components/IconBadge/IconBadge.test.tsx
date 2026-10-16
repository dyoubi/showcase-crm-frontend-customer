import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { IconBadge } from './index';

jest.mock('@/core/hooks/useBreakpoints', () => ({
  useBreakpoints: jest.fn(),
}));
jest.mock('@/core/hooks/useBreakpoints', () => ({
  useBreakpoints: jest.fn(() => ({ isTabletOrPhone: false })),
}));

const renderComponent = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('IconBadge', () => {
  it('renders the correct icon based on the level', () => {
    renderComponent(<IconBadge level={0} />);
    expect(screen.getByTestId('icon-gold')).toBeInTheDocument();
  });

  it('renders silver badge when level is 1', () => {
    renderComponent(<IconBadge level={1} />);
    expect(screen.getByTestId('icon-silver')).toBeInTheDocument();
  });

  it('renders bronze badge when level is 2', () => {
    renderComponent(<IconBadge level={2} />);
    expect(screen.getByTestId('icon-bronze')).toBeInTheDocument();
  });

  it('returns null for an invalid level', () => {
    const { container } = renderComponent(<IconBadge level={99} />);

    expect(container.firstChild).toBeNull();
  });

  it('returns null when level is undefined', () => {
    const { container } = renderComponent(<IconBadge />);

    expect(container.firstChild).toBeNull();
  });
});
