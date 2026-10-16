import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { LogoBox } from './LogoBox';

describe('LogoBox', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <LogoBox>
          <div data-testid="child">Test Child</div>
        </LogoBox>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
