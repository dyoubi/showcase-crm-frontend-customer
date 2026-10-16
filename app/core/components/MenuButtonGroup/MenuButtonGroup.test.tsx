import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { MenuButtonGroup } from './MenuButtonGroup';

jest.mock('@/core/shared/Button', () => ({
  __esModule: true,
  LinkButton: jest.fn(({ href, children, isSelected, ref }) => (
    <a href={href} data-selected={isSelected} ref={ref} data-testid="link-button">
      {children}
    </a>
  )),
  Button: jest.fn(({ children, isSelected, ref, onClick }) => (
    <button type="button" data-selected={isSelected} ref={ref} data-testid="select-button" onClick={onClick}>
      {children}
    </button>
  )),
}));

const renderComponent = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('MenuButtonGroup', () => {
  const menuList = [
    { id: '1', path: '/home', title: 'Home' },
    { id: '2', path: '/about', title: 'About' },
    { id: '3', path: '/contact', title: 'Contact' },
  ];

  const selectList = [
    { label: 'select1', value: 'select1-value' },
    { label: 'select2', value: 'select2-value' },
  ];

  it('renders menu buttons correctly', () => {
    renderComponent(<MenuButtonGroup currentPath="/home" menuList={menuList} hideMobile={false} />);
    expect(screen.getAllByTestId('link-button')).toHaveLength(menuList.length);
  });

  it('renders select buttons correctly', () => {
    renderComponent(<MenuButtonGroup selectList={selectList} hideMobile={false} isLink={false} />);
    expect(screen.getAllByTestId('select-button')).toHaveLength(selectList.length);
  });

  it('when there is selected prop, it highlights the select button correctly', () => {
    renderComponent(
      <MenuButtonGroup selectList={selectList} hideMobile={false} selected="select2-value" isLink={false} />,
    );
    expect(screen.getAllByTestId('select-button')[1]).toHaveAttribute('data-selected', 'true');
  });

  it('highlights the selected button', () => {
    renderComponent(<MenuButtonGroup currentPath="/about" menuList={menuList} hideMobile={false} />);
    expect(screen.getAllByTestId('link-button')[1]).toHaveAttribute('data-selected', 'true');
  });

  it('renders button title as JSX.Element', () => {
    const menuListWithJSX = [
      { id: '1', path: '/home', title: <strong>Home</strong> },
      { id: '2', path: '/about', title: <em>About</em> },
    ];

    renderComponent(<MenuButtonGroup currentPath="/home" menuList={menuListWithJSX} hideMobile={false} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
