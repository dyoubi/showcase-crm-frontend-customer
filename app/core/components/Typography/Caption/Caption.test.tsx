import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Caption } from './Caption';

describe('Caption component', () => {
  it('renders the children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Caption>Test Caption</Caption>
      </ThemeProvider>,
    );

    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });
});
