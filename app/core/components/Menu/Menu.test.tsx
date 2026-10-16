import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';

import { theme } from '@/themes/main';

import { Menu, MenuItem } from './Menu';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

const renderComponent = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('Menu Component', () => {
  it('renders the menu with items', () => {
    renderComponent(
      <Menu>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  it('renders a link when wrapped in Link', () => {
    renderComponent(
      <MenuItem>
        <Link href="/test">Test Link</Link>
      </MenuItem>,
    );

    expect(screen.getByText('Test Link').closest('a')).toHaveAttribute('href', '/test');
  });

  it('wraps non-link content in a span', () => {
    renderComponent(<MenuItem>Simple Text</MenuItem>);

    expect(screen.getByText('Simple Text').tagName).toBe('SPAN');
  });
});
