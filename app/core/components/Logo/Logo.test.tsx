import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';

import { theme } from '@/themes/main';

import { Logo } from './Logo';

const renderComponent = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component} </ThemeProvider>);
};

describe('Logo Component', () => {
  it('should render the logo image', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText('Logo');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/Bitplay-logo.png');
  });

  it('should have the correct alt text for the logo image', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText('Logo');

    expect(logoImage).toHaveAttribute('alt', 'Logo');
  });

  it('should have the "LogoContainer" element as the parent', () => {
    render(<Logo />);

    const logoContainer = screen.getByRole('img').parentElement;

    expect(logoContainer).toBeInTheDocument();
  });
});
