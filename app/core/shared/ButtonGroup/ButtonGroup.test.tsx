import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';

import { theme } from '@/themes/main';

import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

jest.mock('./ButtonGroup.styles', () => ({
  StyledButtonGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ButtonGroup Component', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>,
    );

    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('renders an empty ButtonGroup without crashing', () => {
    const { container } = renderWithTheme(<ButtonGroup />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
