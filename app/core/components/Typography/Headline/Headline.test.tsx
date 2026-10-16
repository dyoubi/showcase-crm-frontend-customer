import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Headline } from './Headline';

describe('Headline component', () => {
  it('renders the children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Headline>Test Headline</Headline>
      </ThemeProvider>,
    );

    // Check if the rendered text matches the children
    expect(screen.getByText('Test Headline')).toBeInTheDocument();
  });
  it('renders with no children without errors', () => {
    render(
      <ThemeProvider theme={theme}>
        <Headline />
      </ThemeProvider>,
    );

    // Ensure that no errors are thrown when there are no children
    expect(screen.queryByText('Test Headline')).toBeNull();
  });
});
