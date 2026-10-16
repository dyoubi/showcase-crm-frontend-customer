import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Card } from './Card';

describe('Card Component', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('renders children correctly', () => {
    renderWithTheme(
      <Card>
        <div>Child Content</div>
      </Card>,
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies backgroundColor and minHeight styles', () => {
    const { container } = renderWithTheme(
      <Card backgroundColor="lightblue" minHeight="200px">
        <div>Content with styles</div>
      </Card>,
    );

    const card = container.firstChild;

    expect(card).toHaveStyle('background-color: lightblue');
    expect(card).toHaveStyle('min-height: 200px');
  });
});
