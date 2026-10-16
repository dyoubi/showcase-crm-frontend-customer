import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Divider } from './Divider';

describe('Divider Component', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('renders correctly with default props', () => {
    const { container } = renderWithTheme(<Divider />);
    const divider = container.querySelector('hr');

    expect(divider).toHaveStyle('width: 100%');

    expect(divider).toHaveStyle('height: 1px');
    expect(divider).toHaveStyle('border-width: 1px 0 0');
    expect(divider).toHaveStyle('border-color: #ffffff'); // Adjust according to your theme color
  });

  it('renders with custom width', () => {
    const { container } = renderWithTheme(<Divider width="50%" />);
    const divider = container.querySelector('hr');

    expect(divider).toHaveStyle('width: 50%');
  });

  it('centers the divider when center prop is true', () => {
    const { container } = renderWithTheme(<Divider center />);
    const divider = container.querySelector('hr');

    expect(divider).toHaveStyle('margin-left: auto');
    expect(divider).toHaveStyle('margin-right: auto');
  });

  it('applies margin styles correctly', () => {
    const { container } = renderWithTheme(<Divider mt="s" mb="m" />);
    const divider = container.querySelector('hr');

    expect(divider).toHaveStyle('margin-top: 16px');
    expect(divider).toHaveStyle('margin-bottom: 24px');
  });
});
