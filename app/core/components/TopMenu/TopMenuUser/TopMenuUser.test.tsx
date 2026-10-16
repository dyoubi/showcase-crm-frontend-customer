import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { trimEnd } from '@/utils/string';

import { theme } from '@/themes/main';

import { TopMenuUser } from './TopMenuUser';

jest.mock('@/utils/string', () => ({
  trimEnd: jest.fn((str, length) => str.slice(0, length)),
}));

const renderComponent = (component: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('TopMenuUser', () => {
  it('renders the component with the username', () => {
    renderComponent(<TopMenuUser username="TestUser" />);

    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  it('trims long usernames', () => {
    renderComponent(<TopMenuUser username="LongUsernameExceedsLimit" />);

    expect(screen.getByText(trimEnd('LongUsernameExceedsLimit', 10))).toBeInTheDocument();
  });

  it('renders the user icon', () => {
    renderComponent(<TopMenuUser username="TestUser" />);

    expect(screen.getByTestId('icon-user')).toBeInTheDocument();
  });
});
