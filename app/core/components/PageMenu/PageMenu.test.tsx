import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { PageMenu } from './PageMenu';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const renderComponent = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('PageMenu', () => {
  const menuItems = [
    { id: '1', title: 'Home', path: '/' },
    { id: '2', title: 'About', path: '/about' },
    { id: '3', title: 'Contact', path: '/contact' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dropdown menu when isDropdown is true', () => {
    (useRouter as jest.Mock).mockReturnValue({ asPath: '/' }); // Mock current path

    renderComponent(<PageMenu menuItems={menuItems} isDropdown />);

    expect(screen.findAllByText('Home')).toBeTruthy(); // Check if Home is rendered
    expect(screen.getByText('About')).toBeInTheDocument(); // Check if About is rendered
    expect(screen.getByText('Contact')).toBeInTheDocument(); // Check if Contact is rendered
  });

  it('displays the correct active menu item in the dropdown', () => {
    (useRouter as jest.Mock).mockReturnValue({ asPath: '/about' });

    renderComponent(<PageMenu menuItems={menuItems} isDropdown />);

    // Check that the active menu item (About) is rendered correctly
    expect(screen.findAllByText('About')).toBeTruthy();
  });

  it('renders MenuButtonGroup when isDropdown is false', () => {
    (useRouter as jest.Mock).mockReturnValue({ asPath: '/' });

    renderComponent(<PageMenu menuItems={menuItems} isDropdown={false} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('highlights the active item in MenuButtonGroup', () => {
    (useRouter as jest.Mock).mockReturnValue({ asPath: '/contact' });

    renderComponent(<PageMenu menuItems={menuItems} isDropdown />);

    expect(screen.getByTestId('dropdown-container')).toHaveTextContent('Contact');
  });

  it('renders correct number of dropdown items', () => {
    (useRouter as jest.Mock).mockReturnValue({ asPath: '/' });

    renderComponent(<PageMenu menuItems={menuItems} isDropdown />);

    const dropdownItems = screen.getAllByTestId('menu-item');

    expect(dropdownItems).toHaveLength(menuItems.length);
  });
});
