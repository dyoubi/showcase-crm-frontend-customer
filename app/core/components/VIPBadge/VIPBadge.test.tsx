// VIPBadge.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { VIPBadge } from './VIPBadge';
import { VIPBadgeLevel, VIPBadgeSize } from './VIPBadge.types';

const renderComponent = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Test default render without props
describe('VIPBadge', () => {
  it('renders without crashing', () => {
    renderComponent(<VIPBadge>Test User</VIPBadge>);

    const username = screen.getByText('Test User');

    expect(username).toBeInTheDocument();
  });

  it('renders the username correctly', () => {
    const testUsername = 'Test User';

    renderComponent(<VIPBadge>{testUsername}</VIPBadge>);

    const username = screen.getByText(testUsername);

    expect(username).toBeInTheDocument();
  });

  // Test if the default level and size are applied
  it('applies the default level and size', () => {
    renderComponent(<VIPBadge>Test User</VIPBadge>);

    const badgeBackground = screen.getByTestId('badge-vip-level');
    const username = screen.getByText('Test User');

    // Default level is VIPBadgeLevel.Default, size is VIPBadgeSize.Large
    expect(badgeBackground).toHaveStyle(`background-image: url('/images/badges/default.svg')`);
    expect(username).toHaveStyle('font-size:24px');
  });

  // Test with custom size prop
  it('applies custom size prop correctly', () => {
    renderComponent(<VIPBadge size={VIPBadgeSize.Large}>Test User</VIPBadge>);

    const username = screen.getByText('Test User');

    // Check that the username size style is applied
    expect(username).toHaveStyle('font-size:24px');
  });

  // Test with both custom level and size
  it('applies both custom level and size props correctly', () => {
    renderComponent(
      <VIPBadge level={VIPBadgeLevel.Platinum1} size={VIPBadgeSize.Medium}>
        Test User
      </VIPBadge>,
    );

    const badgeBackground = screen.getByTestId('badge-vip-level');
    const username = screen.getByText('Test User');

    // Check if styles for Platinum level and Medium size are applied
    expect(badgeBackground).toHaveStyle(`background-image: url('/images/badges/platinum-1.svg')`);
    expect(username).toHaveStyle('font-size:18px');
  });
});
