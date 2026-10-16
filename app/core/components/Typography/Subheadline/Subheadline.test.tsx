import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Subheadline } from './Subheadline';

describe('Subheadline component', () => {
  it('renders the children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Subheadline>Test Subheadline</Subheadline>
      </ThemeProvider>,
    );

    // Check if the rendered text matches the children
    expect(screen.getByText('Test Subheadline')).toBeInTheDocument();
  });
});
